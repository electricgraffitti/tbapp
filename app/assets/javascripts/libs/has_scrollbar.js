jQuery.fn.hasScrollBar = function(direction) {
	if (this.get(0)) {
		if (direction == 'vertical') {
	  	return this.get(0).scrollHeight > this.innerHeight();
	  }

		if (direction == 'horizontal') {
			return this.get(0).scrollWidth > this.innerWidth();
		}
  }
  return false;
}
