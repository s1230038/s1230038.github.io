function exe_filter(){
  var i;
  var display_list = document.getElementsByName("display");
  var words_list   = document.getElementsByName("words");
  var text_area    = document.getElementById("text_area");
  var original_text= document.getElementById("original_text");
  var display = null;
  var words= null;
  
  for( i in display_list ){
    if( display_list[i].checked ){
      display = display_list[i];
    }
  }
  for( i in words_list ){
    if( words_list[i].checked ){
      words = words_list[i];
    }
  }
  
  var disable = false;
  if( display.value == "visible_all" || display.value == "invisible_brackets" ){
    disable = true;
  }
  for( i in words_list ){
    words_list[i].disabled = disable;
  }
  
  
  if( original_text.value == "" ){
    original_text.value = text_area.value;
  }
  
  masked_text = new String(original_text.value);
  var pos1st = get_1st_letter(masked_text);
  
  switch(display.value){
    case "visible_all":
      text_area.value = original_text.value;
      return 0;
      break;
    case "invisible_brackets":
      text_area.value = mask_brackets(masked_text);
      return 0;
      break;
    case "invisible_without_first":
      for( i in pos1st ){
        pos1st[i]++;
      }
      break;
    default:
  }
  
  var start_i=0;
  var inc=1;
  switch(words.value){
    case "multi3":
      start_i = 2;
      inc     = 3;
      break;
    case "odd":
      start_i = 0;
      inc     = 2;
      break;
    case "even":
      start_i = 1;
      inc     = 2;
      break;
    default:
  }
  
  for( i=start_i; i<pos1st.length ; i=i+inc  ){
    masked_text = mask( masked_text, pos1st[i] );
  }
  
  text_area.value = masked_text;
  return 0;
}


function get_1st_letter( sentence ) {
  var i;
  var pos_1st_on_word  = [];
  var letter_1st = false;
  var letter_2nd = false;
  for( i=0 ; i < sentence.length ; i++ ){
    if( is_masked_letter(sentence.charAt(i)) ){
      if( letter_1st == false ){
        letter_1st = true;
      }else{
        letter_2nd = true;
      }
    }else{
      letter_1st = false;
      letter_2nd = false;
    }
    
    if( letter_1st == true && letter_2nd == false ){
      pos_1st_on_word.push(i);
    }
  }
  
  return pos_1st_on_word;
}

function get_1st_bracket( sentence ) {
  
}

function mask( sentence, start_pos ){
  var i;
  var obj = Object.prototype.valueOf.call(sentence);
  var masked_sentence = Array.prototype.slice.call(obj);
  for( i=start_pos ; i < sentence.length ; i++ ){
    if( is_masked_letter(sentence.charAt(i)) ){
      masked_sentence[i]='*';
    }else{
      break;
    }
  }
  return masked_sentence.join('');
}

function is_masked_letter(letter){
  if( letter != ' '  && 
      letter != '\n' && 
      letter != '\"' && 
      letter != '?'  && 
      letter != '!'  && 
      letter != '\(' && 
      letter != '\)' && 
      letter != ','  && 
      letter != '.' ){
    return true;
  }else{
    return false;
  }
}

function mask_brackets(sentence){
  var i;
  var mask_it = false;
  var obj = Object.prototype.valueOf.call(sentence);
  var masked_sentence = Array.prototype.slice.call(obj);
  for( i=0 ; i < sentence.length ; i++ ){
    if( masked_sentence[i]=='[' ) {
      mask_it = true;
      continue;
    }else if( masked_sentence[i]==']' ) {
      mask_it = false;
      continue;
    }
    if( mask_it == true ){
      if( is_masked_letter(sentence.charAt(i)) ){
        masked_sentence[i]='*';
      }
    }
  }
  return masked_sentence.join('');
}


