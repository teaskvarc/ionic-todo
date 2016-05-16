//skozi LocalForage bomo dodajali stvari v naso lokalno bazo
//pripravimo si ogrodje services, ki jih bomo potrebovali

angular.module('starter').factory('todoService', function($localForage) {

  var todoService = {

    model:{
      list: []
    },

    //prejmemo objekt, ki ima parameter title. se pravi text, ki ga je user vnesel noter
    addTodo:function (todo) {

      // to do, ki ga zgoraj prejmemo dodamo guid - unique ID
      todo.id = guid();

      //notification naj se zgodi glede na datum, ki smo ga nastavili
      if(todo.dueDate){

        cordova.plugins.notification.local.schedule({
          id: 10,
          title: todo.title,
          text: todo.dueDate,
          at: todo.dueDate,
          data: { todoId: todo.id }   //kot data lahko posljemo neke podatke, da sprejmemo kot notifikacijo
        });
      }



      //najprej gre v bazo, pogleda a imamo ze kaksne todije, to je seznam vseh todijev
      //ko mi nekaj shranimo v bazo je to pod nekim key imenom: lahko users, cities, tukaj je todos
      //v .then prejme todije. ce smo ze kaj vstavljali noter prejme array, ce nismo je Null in porine noter

       $localForage.getItem('todos')
        .then(function (todos) {

          //ce todijev ni, jih porinemo v prazen array, ce so, ta array vidimo in zraven dodamo novi item
          if (!todos) todos = [];

          // push new to do to array
          todos.push(todo);

          // save the todos array back to localstorage
          return $localForage.setItem('todos', todos);
        })
        .then(function (todos) {

          //instead of upading the reference we need to extend the current list with the new one using angular.extend
          // todoService.model.list = todos; // WRONG!

          angular.extend(todoService.model.list, todos);

        });

    },
    getTodos:function () {

      $localForage.getItem('todos')
        .then(function (todos) {

          angular.extend(todoService.model.list,todos);

        });
    },
    removeTodo:function (id) {

      console.log('Remove todo 123');

      //najprej gremo po vse todije v bazo
      $localForage.getItem('todos')
            //tukaj dobimo todije nazaj
        .then(function (todos) {

          //potem loop-amo cez vse todije, ki jih imamo, primerjamo id z id-jem, ki smo jo prejeli v funkcijo
          angular.forEach(todos, function (todo, i) {

            if(todo.id === id){
              todos.splice(i,1);
            }
          });

          // tukaj odstranimo iz lokalnega seznama
          angular.forEach(todoService.model.list, function (todo, i) {

            if(todo.id === id){
              todoService.model.list.splice(i,1);
            }
          });

          //na koncu spet shranimo
          return $localForage.setItem('todos', todos)
            .then(function (todos) {

            });
        });

    },
    updateTodo:function () {


    }
  };

  return todoService;

});

