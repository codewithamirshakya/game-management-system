import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'dateFormat', async: false })
export class DateFormat implements ValidatorConstraintInterface {
    validate(text: string, args: ValidationArguments) {
        return this.isValidDate(text); // for async validations you must return a Promise<boolean> here
    }

    defaultMessage(args: ValidationArguments) {
        return 'Date format ($value) invalid!';
    }

    isValidDate(date: string) {
        // Date format: YYYY-MM-DD
        const datePattern = /^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

        // Check if the date string format is a match
        let matchArray = date.match(datePattern);
        if (matchArray == null) {
            return false;
        }

        // Remove any non digit characters
        let dateString = date.replace(/\D/g, '');

        // Parse integer values from the date string
        let year = parseInt(dateString.substr(0, 4));
        let month = parseInt(dateString.substr(4, 2));
        let day = parseInt(dateString.substr(6, 2));

        // Define the number of days per month
        let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        // Leap years
        if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
            daysInMonth[1] = 29;
        }

        if (month < 1 || month > 12 || day < 1 || day > daysInMonth[month - 1]) {
            return false;
        }
        return true;
    }
}