import { Pipe, PipeTransform } from "@angular/core";
import { Employee } from "./_models/employee";

@Pipe({ name: "country" })
export class CountryPipe implements PipeTransform {
  transform(values: Employee[], filter: string): Employee[] {
    if (!filter || filter.length === 0) {
      return values;
    }

    if (values.length === 0) {
      return values;
    }

    return values.filter((value: Employee) => {
      const nameFound =
        value.firstName.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const capitalFound =
        value.status.toLowerCase().indexOf(filter.toLowerCase()) !== -1;

      if (nameFound && capitalFound) {
        return value;
      }
    });
  }
}
