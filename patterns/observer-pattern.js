/*------------------
 OBSERVER PATTERN
 The main components of an observer patter are: Subject, Observer
 Implements a way for  to sub

 some details:
 - 
 - 
------------------*/

class ObserverList {

  constructor () {
    this.list = [];
  }

  add (obj) {
    return this.list.push(obj);
  }

  count () {
    return this.list.length;
  }

  get (index) {
    if (index >= 0 && index < this.list.length) {
      return this.list[index];
    }
  }

  indexOf (obj, startIndex = 0) {
    let i = startIndex;

    while (i < this.list.length) {
      if (this.list[i] === obj) {
        return i;
      }
      i++;
    }
    return -1;
  }

  removeAt (index) {
    this.list.splice(index, 1);
  }

}

class Subject {

  constructor () {
    this.observers = new ObserverList();
  }

  addObserver (observer) {
    this.observers.add(observer);
  }

  removeObserver (observer) {
    this.observers.removeAt(
      this.observers.indexOf(observer)
    );
  }

  notify (context) {
    let count = this.observers.count();

    for (let i = 0; i < count; i++) {
      this.observers.get(i).update(context);
    }
  }

}

class Observer {

  constructor (subject) {
    this.subject = subject;
  }

}


class TimersList extends Subject {
  
  constructor () {
    super();

    this.elem = document.getElementById('add-timer');
    this.elem.addEventListener('click', this.addTimer.bind(this));
    window.setInterval(super.notify.bind(this), 1000);
  }

  addTimer () {
    const timer = new Timer(this);
    super.addObserver(timer);
    document.getElementById('timers').appendChild(timer.elem);
  }

  toggleObserver (observer) {
    this.observers.indexOf(observer) > -1 ?
      super.removeObserver(observer) :
      super.addObserver(observer);
  }

}


class Timer extends Observer {

  constructor (subject) {
    super(subject);

    this.time = Math.random() * 180 | 0;
    this.elem = document.createElement('li');
    this.elem.innerHTML = this.getTimeString();

    const brElem = document.createElement('br');
    this.elem.appendChild(brElem);

    const toggleBtn = document.createElement('button');
    toggleBtn.innerHTML = 'toggle';
    toggleBtn.onclick = this.toggleTimer.bind(this);
    this.elem.appendChild(toggleBtn);
  }

  getTimeString () {
    let minutes = String(this.time / 60 | 0);
    let seconds = String(this.time % 60);
    return this.zeroPad(minutes) + ':' + this.zeroPad(seconds);
  }

  toggleTimer () {
    this.subject.toggleObserver(this);
  }

  update () {
    if (this.time > 0) {
      this.time -= 1;
      this.elem.childNodes[0].nodeValue = this.getTimeString();
    }
  }

  zeroPad (num) {
    while(num.length < 2)
      num = '0' + num;
    return num;
  }

}

// const myTimer = new Timer();

const myTimers = new TimersList();