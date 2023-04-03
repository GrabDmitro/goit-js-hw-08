import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

console.log(localStorage.getItem('number'));
const player = new Player('vimeo-player');
const STORAGE_TIME_KEY = 'current_time';
if (localStorage.getItem(STORAGE_TIME_KEY)) {
  player.setCurrentTime(localStorage.getItem(STORAGE_TIME_KEY));
}

player.on(
  'timeupdate',
  throttle(e => localStorage.setItem(STORAGE_TIME_KEY, e.seconds)),
  2000
);

player.on('play', function () {
  console.log('played the video!');
});
