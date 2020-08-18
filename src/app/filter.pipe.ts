import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false,
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filteredArray: string[], status: number): any {

    if (status == 0 || value.length == 0) {
      // console.log("if block");
      return value;
    }
    console.log("stage-2");
    let result = [];
    let i = 0;
    for (let item of value) {
            //  console.log(i,item);
            //  i=i+1;
            // if(((filteredArray[4] == 'false') || ( (filteredArray[4] == 'true') && (filteredArray[4] == item.umpire) ) ) )
            // {
            //   console.log("umpire");
            // }
            // if(((filteredArray[3] == 'false') || ( (filteredArray[3] == 'true') && (filteredArray[3] == item.sanitation) ) ))
            // {
            //   console.log("sanitation")
            // }

            // if(((filteredArray[2] == 'false') || ( (filteredArray[2] == 'true') && (filteredArray[2] == item.floodlight) ) ))
            // {
            //   console.log("floodlight");
            // }

            // if(((filteredArray[1] == 'false') || ( (filteredArray[1] == 'true') && (filteredArray[1] == item.dressingroom) ) ))
            // {
            //   console.log("dressingroom");
            // }

            // if(((filteredArray[0] == 'false') || ( (filteredArray[0] == 'true') && (filteredArray[0] == item.canteen) ) ))
            // {
            //   console.log("canteen");
            // }

            if (((filteredArray[0] == 'false') || ( (filteredArray[0] == 'true') && (filteredArray[0] == item.canteen))) && ((filteredArray[1] == 'false') || ( (filteredArray[1] == 'true') && (filteredArray[1] == item.dressingroom))) && ((filteredArray[2] == 'false') || ( (filteredArray[2] == 'true') && (filteredArray[2] == item.floodlight))) && ((filteredArray[3] == 'false') || ( (filteredArray[3] == 'true') && (filteredArray[3] == item.sanitation) ) ) && ((filteredArray[4] == 'false') || ( (filteredArray[4] == 'true') && (filteredArray[4] == item.umpire) ) )) {
              result.push(item);
            }


    }
    return result;
  }

}
