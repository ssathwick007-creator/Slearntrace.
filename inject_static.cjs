const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, 'backend', 'controllers', 'problemController.js');
let content = fs.readFileSync(targetFile, 'utf8');

const NEW_PROBLEMS = [
    // ----------------- FOUNDATION -----------------
    { title: "Sum of Array Elements", tier: "Foundation", desc: "Return the sum of all elements in an array." },
    { title: "Find Maximum Element", tier: "Foundation", desc: "Find the maximum integer in a given array." },
    { title: "Count Even Numbers", tier: "Foundation", desc: "Count the number of even integers in an array." },
    { title: "Check Palindrome String", tier: "Foundation", desc: "Return true if the given string is a palindrome." },
    { title: "Count Vowels", tier: "Foundation", desc: "Count the number of vowels (a, e, i, o, u) in a string." },
    { title: "Find Second Largest", tier: "Foundation", desc: "Find the second largest distinct element in an array." },
    { title: "Linear Search", tier: "Foundation", desc: "Find the index of a target element in an array using linear search." },
    { title: "Frequency Counter", tier: "Foundation", desc: "Count the frequency of each character in a string." },
    { title: "Remove Duplicates", tier: "Foundation", desc: "Remove duplicates from a sorted array." },
    { title: "Reverse Array In Place", tier: "Foundation", desc: "Reverse the elements of an array in place." },
    { title: "Sum of Digits", tier: "Foundation", desc: "Calculate the sum of the digits of a given integer." },
    { title: "Calculate Factorial", tier: "Foundation", desc: "Calculate the factorial of a given positive integer." },
    { title: "Find Missing Number", tier: "Foundation", desc: "Find the missing number in an array containing numbers from 1 to N." },
    { title: "Check Leap Year", tier: "Foundation", desc: "Determine if a given year is a leap year." },
    { title: "Average of Array", tier: "Foundation", desc: "Calculate the average value of elements in an array." },

    // ----------------- MOMENTUM -----------------
    { title: "Valid Anagram", tier: "Momentum", desc: "Determine if two strings are anagrams of each other." },
    { title: "Maximum Subarray Sum", tier: "Momentum", desc: "Find the contiguous subarray with the largest sum (Kadane's Algorithm)." },
    { title: "Merge Two Sorted Arrays", tier: "Momentum", desc: "Merge two sorted arrays into a single sorted array." },
    { title: "Buy and Sell Stock", tier: "Momentum", desc: "Find the maximum profit you can achieve from buying and selling a stock once." },
    { title: "Valid Palindrome II", tier: "Momentum", desc: "Check if a string is a palindrome after removing non-alphanumeric characters." },
    { title: "Move Zeroes", tier: "Momentum", desc: "Move all 0s to the end of the array while maintaining relative order of non-zeroes." },
    { title: "Find Peak Element", tier: "Momentum", desc: "Find a peak element in an array where an element is strictly greater than its neighbors." },
    { title: "Contains Duplicate", tier: "Momentum", desc: "Return true if any value appears at least twice in the array." },
    { title: "Product of Array Except Self", tier: "Momentum", desc: "Return an array where answer[i] is the product of all elements except nums[i]." },
    { title: "First and Last Position", tier: "Momentum", desc: "Find the first and last position of a target element in a sorted array." },
    { title: "Search Insert Position", tier: "Momentum", desc: "Return the index where a target should be inserted in a sorted array." },
    { title: "Rotate Array", tier: "Momentum", desc: "Rotate an array to the right by k steps." },
    { title: "Group Anagrams", tier: "Momentum", desc: "Group an array of strings into anagrams." },
    { title: "Valid Sudoku", tier: "Momentum", desc: "Determine if a 9x9 Sudoku board is valid based on filled cells." },
    { title: "Longest Substring Without Repeating", tier: "Momentum", desc: "Find the length of the longest substring without repeating characters." },

    // ----------------- MASTERY -----------------
    { title: "Climbing Stairs", tier: "Mastery", desc: "Find how many distinct ways you can climb n stairs (Dynamic Programming)." },
    { title: "Coin Change", tier: "Mastery", desc: "Find the fewest number of coins to make up a given amount." },
    { title: "Longest Common Subsequence", tier: "Mastery", desc: "Find the length of the longest common subsequence between two strings." },
    { title: "Word Break", tier: "Mastery", desc: "Determine if a string can be segmented into a space-separated sequence of dictionary words." },
    { title: "Edit Distance", tier: "Mastery", desc: "Find the minimum number of operations to convert string word1 to word2." },
    { title: "Minimum Path Sum", tier: "Mastery", desc: "Find a path from top-left to bottom-right of a grid that minimizes the sum of numbers." },
    { title: "Longest Increasing Subsequence", tier: "Mastery", desc: "Find the length of the longest strictly increasing subsequence in an array." },
    { title: "Maximum Product Subarray", tier: "Mastery", desc: "Find a contiguous non-empty subarray that has the largest product." },
    { title: "Number of Islands", tier: "Mastery", desc: "Count the number of islands (connected 1s) in a 2D grid." },
    { title: "Container With Most Water", tier: "Mastery", desc: "Find two lines that together with the x-axis form a container holding the most water." },
    { title: "Trapping Rain Water", tier: "Mastery", desc: "Compute how much water can be trapped after raining given an elevation map." },
    { title: "Word Search", tier: "Mastery", desc: "Check if a word exists in a 2D grid of characters." },
    { title: "Merge Intervals", tier: "Mastery", desc: "Merge all overlapping intervals in a given array." },
    { title: "Find Median from Data Stream", tier: "Mastery", desc: "Design a data structure that supports adding numbers and finding the median." },
    { title: "Longest Palindromic Substring", tier: "Mastery", desc: "Find the longest palindromic substring in a given string." }
];

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');
}

function getStarterCode(lang, funcName) {
    switch (lang) {
        case 'python': return `def ${funcName}(input_data):\n    # Write your logic here\n    pass`;
        case 'javascript': return `function ${funcName}(inputData) {\n    // Write your logic here\n}`;
        case 'typescript': return `function ${funcName}(inputData: any): any {\n    // Write your logic here\n}`;
        case 'java': return `class Solution {\n    public void ${funcName}() {\n        // Write your logic here\n    }\n}`;
        case 'cpp': return `#include <iostream>\nusing namespace std;\n\nclass Solution {\npublic:\n    void ${funcName}() {\n        // Write your logic here\n    }\n};`;
        case 'c': return `#include <stdio.h>\n\nvoid ${funcName}() {\n    // Write your logic here\n}`;
        case 'go': return `package main\n\nimport "fmt"\n\nfunc ${funcName}() {\n    // Write your logic here\n}`;
        default: return `// Write your logic here`;
    }
}

const ALGO_LANGS = ['python', 'javascript', 'java', 'cpp', 'c', 'go', 'typescript'];

let additionalArrayElements = NEW_PROBLEMS.map(prob => {
    let starters = {};
    for (const lang of ALGO_LANGS) {
        starters[lang] = getStarterCode(lang, camelize(prob.title));
    }
    return `    {
        title: "${prob.title}",
        tier: "${prob.tier}",
        description: "${prob.desc}",
        fullProblemStatement: "${prob.desc}\\n\\nWrite a program to solve this problem efficiently.",
        examples: [
            {
                input: "Sample input",
                output: "Sample output"
            }
        ],
        starterCodes: ${JSON.stringify(starters, null, 12).replace(/\n/g, '\n        ')}
    }`;
}).join(',\\n');

// Inject right after const ALGO_PROBLEMS = [
if (!content.includes('Sum of Array Elements')) {
    content = content.replace('const ALGO_PROBLEMS = [', 'const ALGO_PROBLEMS = [\\n' + additionalArrayElements + ',');
    fs.writeFileSync(targetFile, content);
    console.log("Successfully injected 45 new problems into static fallback array.");
} else {
    console.log("Already injected.");
}
