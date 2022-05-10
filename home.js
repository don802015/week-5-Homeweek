class Crew{
   constructor(employee, role){
      this.employee = employee;
      this.role = role;
   }
   describe(){
      return `${this.employee} plays ${this.role}`
   }
}
class Employer{
   constructor(employee){
      this.employee = employee;
      this.crewMembers = []; 
   }
   addCrew(crew){
      if(crew instanceof Crew){
         this.crewMembers.push(crew);
      } else{
         throw new Error(`you can only add an instance of 
         memberer. Argument is not a memberer: ${crew}`)
      }            
   }
   describe(){
      return `${this.employee} has ${this.crewMembers.length} crewMembers.`
   }
}

class Menu{
   constructor(){
      this.employers = [];
      this.selectedEmployer = null;
      }
      start(){
         let selection = this.showMainMenuOptions();
         while(selection != 0){
            switch(selection){
               case '1':
                  this.createEmployer();
                  break;
               case '2':
                  this.viewEmployer();
                  break;
               case '3':
                  this.deleteEmployer()
                  break;
               case '4':
                  this.displayEmployers();
                  break;
               default:
                  selection = 0;                  
               }
               selection = this.showMainMenuOptions();
         }
         alert('Goodbye!')
      }
      showMainMenuOptions(){
         return prompt(`
         0) exit
         1) create new employer
         2) view employer
         3) delete employer
         4) display all employers
         `)
      }

      showEmployerMenuOptions(employerinfo){
         return prompt(`
         0) back
         1) create crew
         2) delete crew
         ---------------------
         ${employerinfo}
         `);
      }
      displayEmployers(){
         let employerString = ' ';
         for (let i = 0; i < this.employers.length; i++){
            employerString += i + ') ' + this.employers[i].employee + '\n'
         }
         alert(employerString);
      }
      createEmployer(){
         let employee = prompt('Enter the employee for new employer:');
         this.employers.push(new Employer(employee));
      }
      viewEmployer(){
         let index = prompt('Enter the index of the employer you wish to view:');
         if (index > -1 && index < this.employers.length){
            this.selectedEmployer = this.employers[index];
            let description = 'Employer role: ' + this.selectedEmployer.employee + '\n';

            for(let i = 0; i < this.selectedEmployer.crewMembers.length; i++){
               description += i + ') ' + this.selectedEmployer.crewMembers[i].employee +
               ' - ' + this.selectedEmployer.crewMembers[i].role + '\n';
            }
            let selection = this.showEmployerMenuOptions(description);
            switch(selection){
               case '1':
                  this.createCrew();
                  break;
                  case 's':
                     this.deleteCrew();
                     break;
            }
         }
      }
      deleteEmployer(){
         let index = prompt('Enter the index of the employer you wish to delete');
         if (index > -1 && index < this.employers.length){
            this.employers.splice(index, 1);
         }
      }
      createCrew(){
         let employee = prompt('Enter employee for new crew');
         let role = prompt('Enter role for new crew');
         this.selectedEmployer.crewMembers.push(new Crew(employee, role))
      }
      deleteCrew(){
         let index = prompt('Enter the index of the player you wish to delete:');
         if(index > -1 && index < this.selectedEmployer.crewMembers.length){
            this.selectedEmployer.crewMembers.splice(index, 1);
         }
      }
}
let menu = new Menu();
menu.start();