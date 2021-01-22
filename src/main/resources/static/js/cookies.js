function findValueCookie(key){
	var keyCookie = document.cookie
	    .split(';')
	    .find(row => row.trim().startsWith(key+"="));
	if (keyCookie !=null){
	    return keyCookie.split('=')[1];
	    }
	};
	