var value = [1, 2];


switch(typeof value){
	case "number":
		console.log('Число');
	break;

	case "string":
		console.log('Строка');
	break;

	case "object":
		console.log('Объект');
	break;

	default:
		console.log('Тип переменной: ' + typeof value);
	break;
}