//ime nasega app-a je 'starter'-to lahko pogledam v app.js
//zadevo moramo povezati se v index.html
//MainCtrl moramo imeti pripeti na nek html, ta UI - user interface mora imeti pripeti controller, da lahko Ctrl
//ujame, ko mi kliknemo na UI. Sedaj mora Ctrl povedat Service, da mora nekaj narediti

angular.module('starter').controller('MainCtrl', function ($scope, $ionicModal, todoService) {

  $scope.todoModel = {
    dueDate : new Date(Date.now() + 1000*60*60*24)  // nastavili smo jutrisnji datum
  };
  $scope.todos = todoService.model.list;

  function init() {

    todoService.getTodos();
  }

  init();

  $scope.languages = {

    slovenian:{
      submit:'Dodaj',
      delete: 'Zbrisi',
      selectLanguage: 'Izberi jezik'
    },
    english:{
      submit:'Submit',
      delete:'Delete',
      selectLanguage: 'Select language'
    },
    german:{
      submit:'Schubmit',
      delete:'Löschen',
      selectLanguage: 'Sprache auswählen'
    }
  };

  $scope.locales = {
    ui : $scope.languages.english
  };

  $scope.addTodoClick = function () {

    if(!$scope.todoModel.dueDateToggle){
       delete $scope.todoModel.dueDate;
    }

    // { title:'My to do '}
    todoService.addTodo($scope.todoModel);

    $scope.todoModel = {
      dueDate : new Date(Date.now() + 1000*60*60*24)  // nastavili smo jutrisnji datum
    };

  };

  $scope.removeTodoClick = function (id) {

    todoService.removeTodo(id);

  };

  $scope.setLanguage = function (translations) {

    //na ta $scope prejmemo transilations, ki ga prejmemo
    $scope.locales.ui = translations;
    $scope.modal.hide();

  };


  $scope.onLanguageClick = function () {

    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });

  };

});
