
let selector = Object.keys(data)
let selector_html;

// selectbox
for (option in selector) {
    selector_html += '<option value="' + selector[option] + '"'
    if(option == 0) {
        selector_html += ' selected="selected"'
    }
    selector_html += selector[option] + '>' + selector[option] + '</option>'
}

// selectbox EventListener
let selectbox = document.getElementById('select');
selectbox.innerHTML = selector_html

selectbox.addEventListener('change', ()=> {
    makeProfilelist ()
}, false);

// profiledata
let listtable = document.getElementById('list')
function makeProfilelist () {
    let keys = Object.keys(data[selectbox.value])
    console.log(keys)
    let list_html = '<table id="list" class="table table-striped"><thead><th scope="col">filename</th><th scope="col">url</th></thead><tbody>'
    
    for (obj in keys) {
        list_html += '<tr><th>' + keys[obj] + '</th><td>' + changeColor(data[selectbox.value][keys[obj]]) + '</td><tr>'
    }
    list_html += '</tbody></table>'
    listtable.innerHTML = list_html
}
function changeColor(text){
    let result = text
    let word = [{'text':'-v3','color':"#0000ff"},{'text':'exa','color':"#FF0000"}]
    for (ch in word) {
        if (result.indexOf(word[ch].text) > -1) {
            result = result.replace(word[ch].text, '<font color="' + word[ch].color + '">' + word[ch].text + '</font>')
        }
    }
    return result
}
makeProfilelist ()

let generate = document.getElementById('generate')
generate.addEventListener('click', button1_clicked, false);
// button1.addEventListener('click', button1_clicked);

// https://javascript.keicode.com/newjs/download-files.php#2-1
// ファイル保存
function button1_clicked(evt) {

    for (obj in data[selectbox.value]) {
        console.log('obj',obj, data[selectbox.value][obj])
        evt.preventDefault();
    
        const blob = new Blob([data[selectbox.value][obj]], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.download = obj;
        a.href = url;
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }
}

// const vm = new Vue ({
//     el: '#app',
//     data: {
//       data: data,
//       option: '',
//       selected:'',
//     }
// });