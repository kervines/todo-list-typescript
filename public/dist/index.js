"use strict";
(() => {
    let NotificationPlatform;
    (function (NotificationPlatform) {
        NotificationPlatform["SMS"] = "SMS";
        NotificationPlatform["EMAIL"] = "EMAIL";
        NotificationPlatform["PUSH_NOTIFICATION"] = "PUSH_NOTIFICATION";
    })(NotificationPlatform || (NotificationPlatform = {}));
    const UUID = () => {
        return Math.random().toString(32).substr(2, 9);
    };
    const DateUtils = {
        tomorrow() {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        },
        today() {
            return new Date();
        },
        formatDate(date) {
            return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
        },
    };
    class Reminder {
        constructor(description, date, notification) {
            this.id = UUID();
            this.dateCreated = DateUtils.today();
            this.dateUpdated = DateUtils.today();
            this.description = '';
            this.date = DateUtils.tomorrow();
            this.notification = [NotificationPlatform.EMAIL];
            this.description = description;
            this.date = date;
            this.notification = notification;
        }
        render() {
            return `
      ---> Reminder <---
      description: ${this.description}
      date: ${DateUtils.formatDate(this.date)}
      platform: ${this.notification.join(',')}
      `;
        }
    }
    class Todo {
        constructor(description) {
            this.id = UUID();
            this.dateCreated = DateUtils.today();
            this.dateUpdated = DateUtils.today();
            this.description = '';
            this.done = false;
            this.description = description;
        }
        render() {
            return `
      ---> TODO <---
      description: ${this.description}
      done: ${this.done}
      `;
        }
    }
    const todo = new Todo('Todo criado com a classe');
    const reminder = new Reminder('Reminder criado com a classe', new Date(), [
        NotificationPlatform.EMAIL,
    ]);
    const taskView = {
        render(tasks) {
            const tasksList = document.getElementById('tasksList');
            while (tasksList === null || tasksList === void 0 ? void 0 : tasksList.firstChild) {
                tasksList.removeChild(tasksList.firstChild);
            }
            tasks.forEach((task) => {
                const li = document.createElement('li');
                const textNode = document.createTextNode(task.render());
                li.appendChild(textNode);
                tasksList === null || tasksList === void 0 ? void 0 : tasksList.appendChild(li);
            });
        },
    };
    const TaskController = (view) => {
        var _a;
        const tasks = [todo, reminder];
        const handleEvent = (event) => {
            event.preventDefault();
            view.render(tasks);
        };
        (_a = document
            .getElementById('taskForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', handleEvent);
    };
    TaskController(taskView);
})();
