#! /usr/bin/env node

import inquirer from 'inquirer';
import figlet from 'figlet';
import chalk from 'chalk';

figlet('Todo List!!', function (err, data) {
  if (err) {
    console.log('Something went wrong');
    console.log(err);
    return;
  }
  console.log(chalk.blue(data));
});

let todoList: string[] = [];

async function Repeatflow() {
  const answer = await inquirer.prompt([
    {
      name: 'repeat',
      type: 'list',
      choices: ['Yes', 'No'],
      message: 'do you want another operation',
    },
  ]);
  return answer.repeat === 'Yes' ? true : false;
}

async function TodoList() {
  let startAgain = true;
  do {
    const answer: { option: string } = await inquirer.prompt([
      {
        name: 'option',
        type: 'list',
        choices: ['Add Item', 'Display', 'Remove Items'],
        message: 'what you want to do ?',
      },
    ]);
    if (answer.option === 'Add Item') {
      const item: { newItem: string } = await inquirer.prompt([
        {
          name: 'newItem',
          type: 'input',
          message: 'Enter new Item',
        },
      ]);
      todoList.push(item.newItem);
      startAgain = await Repeatflow();
    } else if (answer.option === 'Display') {
      if (todoList.length == 0) {
        console.log(chalk.red('Your list empty'));
      }
      todoList.forEach((element) => console.log(element));
      startAgain = await Repeatflow();
    } else if (answer.option === 'Remove Items') {
      if (todoList.length == 0) {
        console.log(chalk.red('Your list empty'));
      }

      const removeItem: { item: string } = await inquirer.prompt([
        {
          name: 'item',
          type: 'input',
          message: 'which item you want to remove',
        },
      ]);

      let index = todoList.indexOf(removeItem.item);
      console.log(index);
      if (index !== -1) {
        todoList.splice(index, 1);
      }
      startAgain = await Repeatflow();
    }
  } while (startAgain !== false);
}

setTimeout(() => {
  TodoList();
}, 1000);
