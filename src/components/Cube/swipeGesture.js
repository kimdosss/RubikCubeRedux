function swipeGesture(element,handle){
	['mousedown','touchstart'].forEach(event => element.addEventListener(event, onDragRotateStart));
	let that = this;
	function onDragRotateStart(e) {            	
	    e.preventDefault();
	    let startX,startY;
	    if (e.type == 'touchstart') {
	    	startX = e.changedTouches[0].pageX,
            startY = e.changedTouches[0].pageY;	    	
	    } else if (e.type == 'mousedown') {
			startX = e.pageX;
			startY = e.pageY; 
	    } else {
	    	throw('Drag event error.')
	    }

	    
		['mousemove', 'touchmove'].forEach(event => element.addEventListener(event, onDragRotateMove));

		['mouseup','touchend','touchcancel','mouseout'].forEach(event => element.addEventListener(event, onDragRotateEnd));
	   

		function onDragRotateMove(e) {	 	
			let direction,coordsX,coordsY,x,y;
				//e = event.nativeEvent;
		        e.preventDefault();
	        if (e.type == 'touchmove') {
	        	coordsX = e.changedTouches[0].pageX;
	        	coordsY = e.changedTouches[0].pageY;
	        }else if (e.type == 'mousemove') {
			    coordsX = e.pageX;
		        coordsY = e.pageY;               	
	        } else {
	        	throw('drag event error')
	        }  

		    y = (coordsY - startY);
	        x = (coordsX - startX);

	        if (Math.abs(x) > 20 || Math.abs(y) > 20) {
	        	if (Math.abs(x) > Math.abs(y)) {
	        		if (x > 0) {
	        			direction = 'right'
	        		} else {
	        			direction = 'left'
	        		}
	        	} else {
					if (y < 0) {
	        			direction = 'up'
	        		} else {
	        			direction = 'down'
	        		}
	        	}

	
	        	
	        	handle(direction);
	        	onDragRotateEnd(e);
	        }

		}

		function onDragRotateEnd(e){
			['mousemove', 'touchmove'].forEach(event => element.removeEventListener(event, onDragRotateMove));

			['mouseup','touchend','touchcancel','mouseout'].forEach(event => element.removeEventListener(event, onDragRotateEnd));
		}

	}

}

export default swipeGesture;