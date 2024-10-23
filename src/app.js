import '@fortawesome/fontawesome-free/js/all'
import {Modal,Collapse} from 'bootstrap';
import CalorieTracker from './Tracker';
import {Meal,Workout} from './Item'
import './css/bootstrap.css';
import './css/style.css';


  
  
  
  class App {
    constructor() {
      this._tracker = new CalorieTracker();
      this._loadEventListeners();
     this._tracker.loadItems();
    }
    _loadEventListeners(){
      document
      .getElementById("meal-form")
      .addEventListener("submit", this._newItem.bind(this, "meal"));
  
    document
      .getElementById("workout-form")
      .addEventListener("submit", this._newItem.bind(this, "workout"));
  
    document.getElementById('meal-items').addEventListener('click',this._removeItem.bind(this,'meal'));
  
    document.getElementById('workout-items').addEventListener('click',this._removeItem.bind(this,'workout'));
  
   document.getElementById('filter-meals').addEventListener('keyup',this._filterItems.bind(this,'meal')) ;
  
   document.getElementById('filter-workouts').addEventListener('keyup',this._filterItems.bind(this,'workout'));
  
   document.getElementById('reset').addEventListener('click',this._reset.bind(this));
  
   document.getElementById('limit-form').addEventListener('submit',this._setLimit.bind(this));
  
    }
  
    // Now instead of seperate meal and workout we combine them as item
    _newItem(type, e) {
      e.preventDefault();
      const name = document.getElementById(`${type}-name`);
      const calories = document.getElementById(`${type}-calories`);
      console.log(`${type}`);
      //Validate input
      if (name.value === "" || calories.value === "") {
        alert("Please enter");
        return;
      }
  
      if (type === "meal") {
        const meal = new Meal(name.value, +calories.value);
        this._tracker.addMeal(meal);
      } else {
        const workout = new Workout(name.value, +calories.value);
        this._tracker.addWorkout(workout);
      }
      name.value = "";
      calories.value = "";
  
      //Used bootstrap
      const collapseItem = document.getElementById(`collapse-${type}`);
      const bsCollapse = new Collapse(collapseItem, {
        toggle: true,
      });
    }
  
    _removeItem(type, e) {
      if (
        e.target.classList.contains('delete') ||
        e.target.classList.contains('fa-xmark')
      ) {
        if (confirm('Are you sure?')) {
          const id = e.target.closest('.card').getAttribute('data-id');
          type === 'meal'
            ? this._tracker.removeMeal(id)
            : this._tracker.removeWorkout(id);
          const item = e.target.closest('.card');
          item.remove();
        }
      }
    }
  
    _filterItems(type,e){
      const text=e.target.value.toLowerCase();
     
     document.querySelectorAll(`#${type}-items .card`).forEach((item)=>{
          const name=item.firstElementChild.firstElementChild.textContent;
          if(name.toLowerCase().indexOf(text)!=-1){
              item.style.display='block';
          }
          else{
             item.style.display='none';
          }
      });
      
    
    }
  
    _reset(){
      this._tracker.reset();
      document.getElementById('meal-items').innerHTML='';
      document.getElementById('workout-items').innerHTML='';
      document.getElementById('filter-meals').value='';
      document.getElementById('filter-workouts').value='';
  
    }
    _setLimit(e){
      e.preventDefault();
      const limit=document.getElementById('limit');
      if(limit.value ===''){
          alert('Please Enter');
          return;
  
      }
      this._tracker.setLimit(+limit.value);
      limit.value='';
  
      const modalEl=document.getElementById('limit-modal');
      const modal=Modal.getInstance(modalEl);
      modal.hide();
    }
    // This is diferent method to implement while above is we combine both as item
    //     _newmeal(e){
    //      e.preventDefault();
    //      const name=document.getElementById('meal-name');
    //      const calories=document.getElementById('meal-calories');
    //    //Validate input
    //    if(name.value===''|| calories.value===''){
    //     alert('Please enter');
    //     return;
    //    }
    //    const meal=new Meal(name.value,+calories.value);
    //    this._tracker.addMeal(meal);
    //    name.value='';
    //    calories.value=''
  
    //    const collapseMeal=document.getElementById('collapse-meal');
    //    const bsCollapse=new bootstrap.Collapse(collapseMeal,{
    //     toggle:true
    //    });
    //     }
    //     _newWorkout(e){
    //      e.preventDefault();
    //      const name=document.getElementById('workout-name');
    //      const calories=document.getElementById('workout-calories');
    //    //Validate input
    //    if(name.value===''|| calories.value===''){
    //     alert('Please enter');
    //     return;
    //    }
    //    const workout=new Workout(name.value,+calories.value);
    //    this._tracker.addWorkout(workout);
    //    name.value='';
    //    calories.value=''
  
    //    const collapseWorkout=document.getElementById('collapse-workout');
    //    const bsCollapse=new bootstrap.Collapse(collapseWorkout,{
    //     toggle:true
    //    });
    //     }
    // }
  }
  const app = new App();
  