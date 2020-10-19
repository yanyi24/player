import Vue from 'vue';
Vue.filter('formateTime', function(value) {
  const seconds = Math.floor(value);
  let h = Math.floor(seconds / 60 / 60);
  let m = Math.floor((seconds - h * 60 *60) / 60);
  let s = seconds - h * 60 *60 - m * 60;
  function fixNum(num) {  
    return num >= 10 ? num : '0' + num; 
  }
  return `${fixNum(h)}:${fixNum(m)}:${fixNum(s)}`;
});