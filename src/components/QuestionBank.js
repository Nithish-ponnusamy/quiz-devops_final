// QuestionBank.js

const questionBank = {
    C: [
        {
            question: 'What does "printf" stand for in C?',
            options: ['Print formatted', 'Print file', 'Print function', 'Print fast'],
            answer: 'Print formatted',
            id: 1
        },
        {
            question: 'Which of the following is a valid declaration of a pointer in C?',
            options: ['int *ptr;', 'ptr int*;', 'int &ptr;', 'int ptr*;'],
            answer: 'int *ptr;',
            id: 2
        },
        {
            question: 'What is the correct syntax for including a header file in C?',
            options: ['#include <header.h>', '#include "header.h"', '#include <header>', '#include header.h'],
            answer: '#include <header.h>',
            id: 3
        },
        {
            question: 'What is the size of int in C?',
            options: ['2 bytes', '4 bytes', '8 bytes', 'depends on the system'],
            answer: 'depends on the system',
            id: 4
        },
        // Add 6 more questions for C...
    ],
    Cpp: [
        {
            question: 'What is the main feature of C++?',
            options: ['Encapsulation', 'Inheritance', 'Polymorphism', 'All of the above'],
            answer: 'All of the above',
            id: 1
        },
        {
            question: 'Which of the following is not a valid C++ data type?',
            options: ['int', 'float', 'double', 'real'],
            answer: 'real',
            id: 2
        },
        {
            question: 'Which operator is used for dynamic memory allocation in C++?',
            options: ['new', 'malloc', 'alloc', 'create'],
            answer: 'new',
            id: 3
        },
        {
            question: 'Which of the following is not a part of the object-oriented programming paradigm?',
            options: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Compilation'],
            answer: 'Compilation',
            id: 4
        },
        // Add 6 more questions for C++...
    ],
    Java: [
        {
            question: 'What is the default value of a boolean variable in Java?',
            options: ['true', 'false', 'null', '0'],
            answer: 'false',
            id: 1
        },
        {
            question: 'Which of the following is used to create an object in Java?',
            options: ['new', 'create', 'object', 'init'],
            answer: 'new',
            id: 2
        },
        {
            question: 'What is the correct way to declare a constant in Java?',
            options: ['const int a = 10;', 'final int a = 10;', 'static int a = 10;', 'int a = 10;'],
            answer: 'final int a = 10;',
            id: 3
        },
        {
            question: 'Which of the following is not a primitive data type in Java?',
            options: ['int', 'char', 'String', 'boolean'],
            answer: 'String',
            id: 4
        },
        // Add 6 more questions for Java...
    ],
    Python: [
        {
            question: 'What is the keyword used to define a function in Python?',
            options: ['function', 'def', 'method', 'func'],
            answer: 'def',
            id: 1
        },
        {
            question: 'Which of the following is a valid way to create a list in Python?',
            options: ['list = []', 'list = ()', 'list = {}', 'list = <>'],
            answer: 'list = []',
            id: 2
        },
        {
            question: 'Which built-in function is used to read a line from input in Python?',
            options: ['input()', 'read()', 'scan()', 'getline()'],
            answer: 'input()',
            id: 3
        },
        {
            question: 'Which operator is used to concatenate strings in Python?',
            options: ['+', '-', '*', '&'],
            answer: '+',
            id: 4
        },
        // Add 6 more questions for Python...
    ]
};

export default questionBank;
