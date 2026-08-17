import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const supabaseUrl = 'https://xtyqttxulvgxtecgwgbc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0eXF0dHh1bHZneHRlY2d3Z2JjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjY4NDM5NiwiZXhwIjoyMTAyMjYwMzk2fQ.vQ3SmuqaGn961hG14U1lEE6EZqDp-0lMGZmGBHBc4W4';
const supabase = createClient(supabaseUrl, supabaseKey);

const ALGO_LANGS = ['python', 'javascript', 'java', 'cpp', 'c', 'go', 'typescript'];

const ALGO_PROBLEMS = [
    {
        title: "Two Sum",
        tier: "Foundation",
        description: "Given an array of integers nums and an integer target, return indices of two numbers that add up to target.",
        sampleInput: "nums = [2,7,11,15], target = 9",
        sampleOutput: "[0,1]",
        starterCodes: {
            python: "def twoSum(nums, target):\n    # Your code here\n    pass",
            javascript: "function twoSum(nums, target) {\n    // Your code here\n}",
            java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[0];\n    }\n}",
            cpp: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Your code here\n    }\n};",
            c: "int* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    // Your code here\n}",
            go: "func twoSum(nums []int, target int) []int {\n    // Your code here\n}",
            typescript: "function twoSum(nums: number[], target: number): number[] {\n    // Your code here\n};"
        }
    },
    {
        title: "Reverse a String",
        tier: "Foundation",
        description: "Write a function that reverses a string.",
        sampleInput: "\"hello\"",
        sampleOutput: "\"olleh\"",
        starterCodes: {
            python: "def reverseString(s):\n    # Your code here\n    pass",
            javascript: "function reverseString(s) {\n    // Your code here\n}",
            java: "class Solution {\n    public void reverseString(char[] s) {\n        // Your code here\n    }\n}",
            cpp: "class Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        // Your code here\n    }\n};",
            c: "void reverseString(char* s, int sSize) {\n    // Your code here\n}",
            go: "func reverseString(s []byte) {\n    // Your code here\n}",
            typescript: "function reverseString(s: string[]): void {\n    // Your code here\n};"
        }
    },
    {
        title: "Fizz Buzz",
        tier: "Foundation",
        description: "Print numbers 1 to n, replace multiples of 3 with \"Fizz\", 5 with \"Buzz\", both with \"FizzBuzz\".",
        sampleInput: "n = 15",
        sampleOutput: "1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz",
        starterCodes: {
            python: "def fizzBuzz(n):\n    # Your code here\n    pass",
            javascript: "function fizzBuzz(n) {\n    // Your code here\n}",
            java: "class Solution {\n    public List<String> fizzBuzz(int n) {\n        // Your code here\n    }\n}",
            cpp: "class Solution {\npublic:\n    vector<string> fizzBuzz(int n) {\n        // Your code here\n    }\n};",
            c: "char** fizzBuzz(int n, int* returnSize) {\n    // Your code here\n}",
            go: "func fizzBuzz(n int) []string {\n    // Your code here\n}",
            typescript: "function fizzBuzz(n: number): string[] {\n    // Your code here\n};"
        }
    },
    {
        title: "Palindrome Number",
        tier: "Momentum",
        description: "Determine whether an integer is a palindrome.",
        sampleInput: "121",
        sampleOutput: "true",
        starterCodes: {
            python: "def isPalindrome(x):\n    # Your code here\n    pass",
            javascript: "function isPalindrome(x) {\n    // Your code here\n}",
            java: "class Solution {\n    public boolean isPalindrome(int x) {\n        // Your code here\n    }\n}",
            cpp: "class Solution {\npublic:\n    bool isPalindrome(int x) {\n        // Your code here\n    }\n};",
            c: "bool isPalindrome(int x) {\n    // Your code here\n}",
            go: "func isPalindrome(x int) bool {\n    // Your code here\n}",
            typescript: "function isPalindrome(x: number): boolean {\n    // Your code here\n};"
        }
    },
    {
        title: "Valid Parentheses",
        tier: "Momentum",
        description: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        sampleInput: "\"()[]{}\"",
        sampleOutput: "true",
        starterCodes: {
            python: "def isValid(s):\n    # Your code here\n    pass",
            javascript: "function isValid(s) {\n    // Your code here\n}",
            java: "class Solution {\n    public boolean isValid(String s) {\n        // Your code here\n    }\n}",
            cpp: "class Solution {\npublic:\n    bool isValid(string s) {\n        // Your code here\n    }\n};",
            c: "bool isValid(char* s) {\n    // Your code here\n}",
            go: "func isValid(s string) bool {\n    // Your code here\n}",
            typescript: "function isValid(s: string): boolean {\n    // Your code here\n};"
        }
    }
];

const SQL_PROBLEMS = [
    {
        title: "Create Users Table",
        tier: "Foundation",
        description: "Write SQL to create a users table with id, name, email, age.",
        sampleInput: "",
        sampleOutput: "CREATE TABLE users (id INT PRIMARY KEY, name VARCHAR(100), email VARCHAR(100), age INT);",
        starterCodes: { sql: "-- Write your SQL query here\n" }
    },
    {
        title: "Select All Users",
        tier: "Foundation",
        description: "Select all records from the users table.",
        sampleInput: "",
        sampleOutput: "SELECT * FROM users;",
        starterCodes: { sql: "-- Write your SQL query here\n" }
    },
    {
        title: "Filter Adults",
        tier: "Momentum",
        description: "Select users who are 18 or older.",
        sampleInput: "",
        sampleOutput: "SELECT * FROM users WHERE age >= 18;",
        starterCodes: { sql: "-- Write your SQL query here\n" }
    },
    {
        title: "Count Orders Per Customer",
        tier: "Momentum",
        description: "Count how many orders each customer has.",
        sampleInput: "",
        sampleOutput: "SELECT customer_id, COUNT(*) FROM orders GROUP BY customer_id;",
        starterCodes: { sql: "-- Write your SQL query here\n" }
    },
    {
        title: "Join Orders and Customers",
        tier: "Mastery",
        description: "Join orders and customers tables to show customer name and order details.",
        sampleInput: "",
        sampleOutput: "SELECT c.name, o.order_date FROM customers c INNER JOIN orders o ON c.id = o.customer_id;",
        starterCodes: { sql: "-- Write your SQL query here\n" }
    }
];

async function migrate() {
    let sortOrder = 1;

    for (const prob of [...ALGO_PROBLEMS, ...SQL_PROBLEMS]) {
        const slug = prob.title.toLowerCase().replace(/ /g, '-');
        
        // Ensure problem exists
        const { data: pData, error: pErr } = await supabase.from('coding_problems').upsert({
            title: prob.title,
            slug: slug,
            language_id: Object.keys(prob.starterCodes)[0] || 'multi',
            difficulty_tier: prob.tier,
            problem_statement: prob.description,
            status: 'published',
            sort_order: sortOrder++
        }, { onConflict: 'slug' }).select();

        if (pErr) {
            console.error('Error inserting problem:', pErr.message);
            continue;
        }

        const problemId = pData[0].id;
        console.log(`Inserted problem: ${prob.title} (${problemId})`);

        // Insert Examples
        const { error: eErr } = await supabase.from('coding_problem_examples').insert({
            problem_id: problemId,
            input_data: prob.sampleInput,
            expected_output: prob.sampleOutput,
            sort_order: 1
        });
        
        // Insert Test Cases (same as examples for now)
        await supabase.from('coding_test_cases').insert({
            problem_id: problemId,
            input_data: prob.sampleInput,
            expected_output: prob.sampleOutput,
            is_sample: true,
            sort_order: 1
        });

        // Insert Languages and Starter Code
        for (const [lang, code] of Object.entries(prob.starterCodes)) {
            // Delete existing first to avoid duplicate issues on re-run
            await supabase.from('coding_problem_languages')
                .delete()
                .eq('problem_id', problemId)
                .eq('language', lang);

            await supabase.from('coding_problem_languages').insert({
                problem_id: problemId,
                language: lang,
                starter_code: code
            });
        }
    }

    console.log('Done migrating backend coding practice problems.');
}

migrate();
