import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router"
import {Class} from "../class"
import {ClassService} from "../class.service";
import {SchollService} from "../scholl.service";
import { School } from '../school';
import { FormGroup, FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { UsernameValidator } from "../validate";
@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css']
})
export class ClassFormComponent implements OnInit {
  submitted = false;
  totalStudentMessage = null;
   school= new School();
   exsistIDClass = false;
   isFlase= false;
   
   newclass = new FormGroup({
     id: new FormControl(null),
     schoolId: new FormControl(this.school.id),
     name: new FormControl(''),
     roomNumber: new FormControl(''),
     totalStudent: new FormControl(''),
     mainTeacher: new FormControl(''),
    

   })
  image:String =null;
  idClass = null;
  idSchool = 0;
  constructor( 
    private classService:ClassService,
    private schoolService : SchollService,
    private route: Router,
    private activate: ActivatedRoute,
    private formBuider: FormBuilder

  ) { }
  ngOnInit() {
    
   
this.activate.paramMap.subscribe(data =>{
      this.idClass = parseInt(data.get('idclass'));
      this.idSchool = parseInt(data.get('idschool'));
      this.classService.getClassByID(this.idSchool,this.idClass).subscribe(data=>{
        this.newclass.setValue({
          id:data.id,
          schoolId:this.idSchool,
          name:data.name,
          roomNumber: data.roomNumber,
          totalStudent:data.totalStudent,
          mainTeacher:data.mainTeacher,

        });
      
      });
      if(!isNaN(this.idClass)){
        this.exsistIDClass = true;
        console.log(isNaN(this.idClass));
      }
 
     
    });
 
        this.schoolService.getListSchools().subscribe(data=>{
           this.school = data;
          //  console.log(data);
           console.log(this.idSchool);
      });
    
   
    this.newclass = this.formBuider.group({
      id: [null],
        name: ['', Validators.required],
        roomNumber: ['', Validators.required],
        totalStudent: ['', Validators.required],
        mainTeacher:['',Validators.required],
        schoolId:['',Validators.required],
        // acceptTerms:[ true, Validators.requiredTrue]
    });
  }
   get f() { return this.newclass.controls; }
  SaveClass(){
    this.submitted = true;
   if(this.newclass.invalid){
     return;
   }else if(parseInt(this.newclass.value.totalStudent) <=0){
        this.isFlase= true;
        console.log(this.isFlase);
        return;
   }
   else{
   if(this.newclass.value.id != null){
        this.classService.updateClass(this.newclass.value,this.idClass).subscribe (data=>{
            this.route.navigate(['home/class/'+this.newclass.value.schoolId]);
        });
    }else{
    this.classService.addClass(this.newclass.value).subscribe(data =>{
       this.route.navigate(['home/class/'+this.newclass.value.schoolId]);
    });
 
    }
   }


 

  }
  DeleteClass(){
    if(this.idClass != 0 ){
      this.classService.Delete(this.idSchool,this.idClass).subscribe(data=>{
          this.route.navigate(['home/class/'+this.idSchool]);
      });
    }
  }
}