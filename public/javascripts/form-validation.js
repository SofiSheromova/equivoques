$(document).ready(function() {
  $('#userBirthday')
      .prop('min', function() {
        const minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 100);
        return minDate.toJSON().split('T')[0];
      })
      .prop('max', function() {
        const maxDate = new Date();
        maxDate.setFullYear(maxDate.getFullYear() - 6);
        return maxDate.toJSON().split('T')[0];
      });
});
