import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xtyqttxulvgxtecgwgbc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0eXF0dHh1bHZneHRlY2d3Z2JjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjY4NDM5NiwiZXhwIjoyMTAyMjYwMzk2fQ.vQ3SmuqaGn961hG14U1lEE6EZqDp-0lMGZmGBHBc4W4';
const supabase = createClient(supabaseUrl, supabaseKey);

const ALGO_LANGS = ['c', 'cpp', 'java', 'python', 'javascript', 'typescript', 'go'];

function getStarterCode(lang, funcName) {
    switch (lang) {
        case 'python': return `def ${funcName}(input_data):\n    # Write your logic here\n    pass`;
        case 'javascript': return `function ${funcName}(inputData) {\n    // Write your logic here\n}`;
        case 'typescript': return `function ${funcName}(inputData: any): any {\n    // Write your logic here\n}`;
        case 'java': return `class Solution {\n    public void ${funcName}() {\n        // Write your logic here\n    }\n}`;
        case 'cpp': return `#include <iostream>\n#include <vector>\nusing namespace std;\n\nclass Solution {\npublic:\n    void ${funcName}() {\n        // Write your logic here\n    }\n};`;
        case 'c': return `#include <stdio.h>\n\nvoid ${funcName}() {\n    // Write your logic here\n}`;
        case 'go': return `package main\n\nimport "fmt"\n\nfunc ${funcName}() {\n    // Write your logic here\n}`;
        case 'sql': return `-- Write your SQL query here\n`;
        default: return `// Write your logic here`;
    }
}

function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/[^a-zA-Z0-9]/g, '');
}

const ALGO_PROBLEMS = [
    // Foundation
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
    
    // Momentum
    { title: "Valid Anagram", tier: "Momentum", desc: "Determine if two strings are anagrams of each other." },
    { title: "Maximum Subarray Sum", tier: "Momentum", desc: "Find the contiguous subarray with the largest sum." },
    { title: "Merge Two Sorted Arrays", tier: "Momentum", desc: "Merge two sorted arrays into a single sorted array." },
    { title: "Buy and Sell Stock", tier: "Momentum", desc: "Find the maximum profit you can achieve from buying and selling a stock once." },
    { title: "Valid Palindrome II", tier: "Momentum", desc: "Check if a string is a palindrome after removing non-alphanumeric characters." },
    { title: "Move Zeroes", tier: "Momentum", desc: "Move all 0s to the end of the array while maintaining relative order of non-zeroes." },
    { title: "Find Peak Element", tier: "Momentum", desc: "Find a peak element in an array where an element is strictly greater than its neighbors." },
    { title: "Contains Duplicate", tier: "Momentum", desc: "Return true if any value appears at least twice in the array." },
    { title: "Product of Array Except Self", tier: "Momentum", desc: "Return an array where answer[i] is the product of all elements except nums[i]." },
    { title: "First and Last Position", tier: "Momentum", desc: "Find the first and last position of a target element in a sorted array." },

    // Mastery
    { title: "Climbing Stairs", tier: "Mastery", desc: "Find how many distinct ways you can climb n stairs." },
    { title: "Coin Change", tier: "Mastery", desc: "Find the fewest number of coins to make up a given amount." },
    { title: "Longest Common Subsequence", tier: "Mastery", desc: "Find the length of the longest common subsequence between two strings." },
    { title: "Word Break", tier: "Mastery", desc: "Determine if a string can be segmented into a space-separated sequence of dictionary words." },
    { title: "Edit Distance", tier: "Mastery", desc: "Find the minimum number of operations to convert string word1 to word2." },
    { title: "Minimum Path Sum", tier: "Mastery", desc: "Find a path from top-left to bottom-right of a grid that minimizes the sum of numbers." },
    { title: "Longest Increasing Subsequence", tier: "Mastery", desc: "Find the length of the longest strictly increasing subsequence in an array." },
    { title: "Maximum Product Subarray", tier: "Mastery", desc: "Find a contiguous non-empty subarray that has the largest product." },
    { title: "Number of Islands", tier: "Mastery", desc: "Count the number of islands (connected 1s) in a 2D grid." },
    { title: "Container With Most Water", tier: "Mastery", desc: "Find two lines that together with the x-axis form a container holding the most water." }
];

const SQL_PROBLEMS = [
    // Foundation
    { title: "Select All Customers", tier: "Foundation", desc: "Write a SQL query to select all records from the Customers table." },
    { title: "Filter Active Users", tier: "Foundation", desc: "Write a query to select users where status is 'active'." },
    { title: "Count Total Orders", tier: "Foundation", desc: "Write a query to count the total number of orders." },
    { title: "Find Latest Order", tier: "Foundation", desc: "Write a query to find the most recent order date." },
    { title: "Select Distinct Cities", tier: "Foundation", desc: "Write a query to select all unique cities from the Customers table." },
    { title: "Order by Price", tier: "Foundation", desc: "Select products ordered by price descending." },
    { title: "Average Salary", tier: "Foundation", desc: "Find the average salary of all employees." },
    { title: "Min and Max Ages", tier: "Foundation", desc: "Find the minimum and maximum age in the Users table." },
    { title: "Basic Join", tier: "Foundation", desc: "Join Users and Orders tables to get user names and order dates." },
    { title: "Find NULL Values", tier: "Foundation", desc: "Select all rows where the email column is NULL." },

    // Momentum
    { title: "Group By Department", tier: "Momentum", desc: "Count the number of employees in each department." },
    { title: "Having Clause", tier: "Momentum", desc: "Find departments with more than 5 employees." },
    { title: "Inner Join Orders", tier: "Momentum", desc: "Join Customers and Orders to find total amount spent by each customer." },
    { title: "Left Join Categories", tier: "Momentum", desc: "Left join Products with Categories to list all products and their categories if they exist." },
    { title: "Subquery in WHERE", tier: "Momentum", desc: "Find employees whose salary is above the average salary." },
    { title: "Date Differences", tier: "Momentum", desc: "Calculate the number of days between order date and ship date." },
    { title: "String Concatenation", tier: "Momentum", desc: "Concatenate first name and last name into a single column." },
    { title: "Case Statement", tier: "Momentum", desc: "Use a CASE statement to categorize prices into 'Low', 'Medium', and 'High'." },
    { title: "Multiple Joins", tier: "Momentum", desc: "Join Customers, Orders, and OrderDetails tables together." },
    { title: "Self Join", tier: "Momentum", desc: "Join the Employee table to itself to find employees and their managers." },

    // Mastery
    { title: "Rank Window Function", tier: "Mastery", desc: "Use the RANK() window function to rank employees by salary within their department." },
    { title: "Dense Rank Over Category", tier: "Mastery", desc: "Use DENSE_RANK() to rank products by price within their category." },
    { title: "CTE for Hierarchical Data", tier: "Mastery", desc: "Use a Common Table Expression to query hierarchical employee-manager data." },
    { title: "Rolling Average", tier: "Mastery", desc: "Calculate a 3-day rolling average for daily sales using window functions." },
    { title: "Cumulative Sum", tier: "Mastery", desc: "Calculate the cumulative sum of sales over time." },
    { title: "Pivot Table", tier: "Mastery", desc: "Pivot row data into columns to summarize sales by month." },
    { title: "Advanced Aggregation", tier: "Mastery", desc: "Calculate the percentage of total sales each product contributes." },
    { title: "Recursive CTE", tier: "Mastery", desc: "Use a recursive CTE to generate a sequence of dates." },
    { title: "Find Nth Highest Salary", tier: "Mastery", desc: "Write a query to find the Nth highest salary." },
    { title: "Delete Duplicates", tier: "Mastery", desc: "Write a DELETE statement to remove duplicate rows, keeping only the one with the lowest ID." }
];

async function seed() {
    let sortOrder = 1;

    for (const lang of ALGO_LANGS) {
        console.log(`Seeding algorithm challenges for ${lang}...`);
        for (const prob of ALGO_PROBLEMS) {
            const slug = `${prob.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${lang}`;
            
            const { data: pData, error: pErr } = await supabase.from('coding_problems').upsert({
                title: prob.title,
                slug: slug,
                language_id: lang,
                difficulty_tier: prob.tier,
                problem_statement: prob.desc,
                status: 'published',
                sort_order: sortOrder++
            }, { onConflict: 'slug' }).select();

            if (pErr) {
                console.error('Error inserting problem:', pErr.message);
                continue;
            }

            const problemId = pData[0].id;

            // Insert Examples
            await supabase.from('coding_problem_examples').delete().eq('problem_id', problemId);
            await supabase.from('coding_problem_examples').insert({
                problem_id: problemId,
                input_data: "Example Input",
                expected_output: "Example Output",
                explanation: "Example Explanation",
                sort_order: 1
            });
            
            // Insert Language Code
            await supabase.from('coding_problem_languages').delete().eq('problem_id', problemId).eq('language', lang);
            await supabase.from('coding_problem_languages').insert({
                problem_id: problemId,
                language: lang,
                starter_code: getStarterCode(lang, camelize(prob.title))
            });
        }
    }

    console.log(`Seeding SQL challenges...`);
    for (const prob of SQL_PROBLEMS) {
        const lang = 'sql';
        const slug = `${prob.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${lang}`;
        
        const { data: pData, error: pErr } = await supabase.from('coding_problems').upsert({
            title: prob.title,
            slug: slug,
            language_id: lang,
            difficulty_tier: prob.tier,
            problem_statement: prob.desc,
            status: 'published',
            sort_order: sortOrder++
        }, { onConflict: 'slug' }).select();

        if (pErr) {
            console.error('Error inserting problem:', pErr.message);
            continue;
        }

        const problemId = pData[0].id;

        // Insert Examples
        await supabase.from('coding_problem_examples').delete().eq('problem_id', problemId);
        await supabase.from('coding_problem_examples').insert({
            problem_id: problemId,
            input_data: "Example Query Context",
            expected_output: "Example Output",
            explanation: "Example Explanation",
            sort_order: 1
        });
        
        // Insert Language Code
        await supabase.from('coding_problem_languages').delete().eq('problem_id', problemId).eq('language', lang);
        await supabase.from('coding_problem_languages').insert({
            problem_id: problemId,
            language: lang,
            starter_code: getStarterCode(lang, camelize(prob.title))
        });
    }

    console.log("Done seeding!");
}

seed();
