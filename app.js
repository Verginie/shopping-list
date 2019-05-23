//state section
var state = {
    items :[],
    checked: []
};
//State modification functions
var addItem = function(state , item){
    state.items.push(item);
    state.checked.push(0);
};
var checkUncheckItem = function(state, item){
    let index = state.items.indexOf(item);
    state.checked[index] = !state.checked[index] ;
};
var deleteItem = function(state , item){
    let index = state.items.indexOf(item);
    state.items.splice(index,1);
};
var getExistingItems = function(state){
    state.items = $('.shopping-list').find('span.shopping-item').text().split(" ").filter(Boolean);
    state.checked = Array(state.items.length).fill(0); 
    $('.shopping-list').find('span.shopping-item__checked').text().split(" ").filter(Boolean).filter(function(value){
        let indexChecked = state.items.indexOf(value);
        state.checked[indexChecked] = !state.checked[indexChecked];
    })
};
//Runder functions
var RenderList = function(state , element){
    var itemsHtml = state.items.map(function(item){
        let indexItem = state.items.indexOf(item);
        if(!state.checked[indexItem]){
            return `<li>
            <span class="shopping-item">${item} </span>
                <div class="shopping-item-controls">
                    <button class="shopping-item-toggle">
                        <span class="button-label">check</span>
                    </button>
                    <button class="shopping-item-delete">
                        <span class="button-label">delete</span>
                    </button>
                </div>
            </li>`;
        }else{
            return `<li>
            <span class="shopping-item shopping-item__checked">${item}</span>
                <div class="shopping-item-controls">
                    <button class="shopping-item-toggle">
                        <span class="button-label">check</span>
                    </button>
                    <button class="shopping-item-delete">
                        <span class="button-label">delete</span>
                    </button>
                </div>
            </li>`;
        }
        
    });
    element.html(itemsHtml);
};
var checkUncheck = function(item){
    $(item).toggleClass(".shopping-item__checked");
    
};
var removeItem = function(element){
    element.remove();
};
//EventListeners

    $('#js-shopping-list-form').submit(function(event){
        event.preventDefault();
        event.stopPropagation;
        addItem(state,$('#shopping-list-entry').val());
        RenderList(state,$('.shopping-list'));
    });


    $('.shopping-list').on('click','button.shopping-item-toggle',function(event){
        let item = event.target.closest('button').closest('div').previousElementSibling;
        checkUncheck(item);
        event.stopPropagation;
        let text = $(item).text().split(" ").filter(Boolean)[0];
        checkUncheckItem(state , text );
        RenderList(state,$('.shopping-list'));
    });
    $('.shopping-list').on('click','button.shopping-item-delete', function(event){
        event.stopPropagation;
        let item = $(event.target.closest('button').closest('div').previousElementSibling).text().split(" ").filter(Boolean)[0];
        let itemHtml = event.currentTarget.closest('li');
        deleteItem(state,item);
        removeItem(itemHtml);
        RenderList(state,$('.shopping-list'));
    });
    $(getExistingItems(state));
