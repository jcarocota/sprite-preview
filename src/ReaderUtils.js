export class ReaderUtils {
    constructor() {

    }

    promiseReadAsText(file) {
        let promise = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.result === null) {
              reject("Something is wrong");
              return;
            } else {
              resolve(`${reader.result}`);
            }
          };
          reader.readAsText(file);
        });

        return promise;
    }

    promiseReadAsURL(file) {
        let promise = new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.result === null) {
              reject("Something is wrong");
              return;
            } else {
              resolve(`${reader.result}`);
            }
          };
          reader.readAsDataURL(file);
        });

        return promise;
    }
}