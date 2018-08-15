import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';
  ngOnInit() {
    this.funtion();
    this.filter('all');
  }
  funtion() {
    $(document).ready(function () {
      $(document).on('scroll', onScroll);

      // smoothscroll
      $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off('scroll');

        $('header .menu nav li a').each(function () {
          $(this).removeClass('active');
        })
        $(this).addClass('active');

        var target = this.hash,
          menu = target;
        target = $(target);
        $('html, body').stop().animate({
          'scrollTop': target.offset().top - 85
        }, 800, 'swing', function () {
          window.location.hash = target;
          $(document).on('scroll', onScroll);
        });
      });
    });
    function onScroll(event) {
      var scrollPos = $(document).scrollTop();
      $('header .menu nav li a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr('href'));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
          $('header .menu nav li').removeClass('active');
          currLink.addClass('active');
        } else {
          currLink.removeClass('active');
        }
      });
    }

    var btns = document.getElementById('myButtons');
    var btn = btns.getElementsByClassName('btn');
    for (var i = 0; i < btn.length; i++) {
      btn[i].addEventListener('click', function () {
        var current = document.getElementsByClassName('active-btn');
        current[0].className = current[0].className.replace(' active-btn', '')
        this.className += ' active-btn';
      });
    }
    window.onscroll = function () {
      myHeader();
      hiddenElement('#about .box', 400);
      hiddenElement('#our-services .box', 400);
      hiddenElement('#contact .content', -2351);
    }
    function hiddenElement(element, n) {
      var about = document.querySelector(element)
      var sticky = about.offsetTop - n;
      // console.log(sticky + "-" + window.pageYOffset);

      if (window.pageYOffset > sticky) {
        $(function () {
          setTimeout(function () {
            $(element).removeClass('hidden');
          }, 500)
        })
      }

    }
    var header = document.getElementById('header');
    var sticky = header.offsetTop;
    function myHeader() {
      if (window.pageYOffset > sticky) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    }
  }
  filter(c) {
    var x, i;
    x = document.getElementsByClassName('box-filter');
    if (c == 'all') c = '';
    for (i = 0; i < x.length; i++) {
      this.removeClass(x[i], 'show');
      if (x[i].className.indexOf(c) > -1) this.addClass(x[i], 'show');
    }
  }


  addClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(' ');
    arr2 = name.split(' ');
    for (i = 0; i < arr2.length; i++) {
      if (arr1.indexOf(arr2[i]) == -1) {
        element.className += ' ' + arr2[i];
      }
    }

  }

  removeClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(' ');
    arr2 = name.split(' ');
    for (i = 0; i < arr2.length; i++) {
      while (arr1.indexOf(arr2[i]) > -1) {
        arr1.splice(arr1.indexOf(arr2[i]), 1);
      }
    }
    element.className = arr1.join(' ');
  }
}
