import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HashTablePracticeProblems = () => {
    const [selectedProblem, setSelectedProblem] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const problems = [
        {
            id: 1,
            title: "Two Sum",
            difficulty: "Easy",
            description: "Given an array of numbers and a target value, find two indices whose values add up to the target. Use a hash map to store visited numbers."
        },
        {
            id: 2,
            title: "Contains Duplicate",
            difficulty: "Easy",
            description: "Determine whether the array contains duplicate elements. Use a hash set to track visited values."
        },
        {
            id: 3,
            title: "First Non-Repeating Character",
            difficulty: "Easy",
            description: "Find the first character that appears only once in a string. Use a hash table to count frequencies."
        },
        {
            id: 4,
            title: "Group Anagrams",
            difficulty: "Medium",
            description: "Group words that are anagrams of each other. Use a hash table with sorted strings as keys."
        },
        {
            id: 5,
            title: "Longest Consecutive Sequence",
            difficulty: "Medium",
            description: "Find the length of the longest consecutive elements sequence. Use a hash set for O(n) lookup."
        },
        {
            id: 6,
            title: "Subarray Sum Equals K",
            difficulty: "Medium",
            description: "Find the number of continuous subarrays whose sum equals k. Use prefix sums and a hash map."
        },
        {
            id: 7,
            title: "Top K Frequent Elements",
            difficulty: "Medium",
            description: "Return the k most frequent elements in an array. Use a hash map to count frequencies."
        },
        {
            id: 8,
            title: "Design HashMap",
            difficulty: "Hard",
            description: "Implement a hash map data structure without using built-in libraries."
        }
    ];

    const getBadgeStyle = (difficulty) => {
        const base = { padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '600' };
        if (difficulty === 'Easy') return { ...base, backgroundColor: '#dcfce7', color: '#166534' };
        if (difficulty === 'Medium') return { ...base, backgroundColor: '#ffedd5', color: '#9a3412' };
        if (difficulty === 'Hard') return { ...base, backgroundColor: '#fee2e2', color: '#991b1b' };
        return base;
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Hash Table Practice Problems</h2>
                <p style={styles.subtitle}>Practice common hash table problems and watch animated solutions.</p>
            </div>

            <div style={{ ...styles.splitLayout, flexDirection: isMobile ? 'column' : 'row' }}>
                <div style={{ ...styles.leftPanel, width: isMobile ? '100%' : '38%' }}>
                    {problems.map((prob, index) => (
                        <div
                            key={prob.id}
                            style={{
                                ...styles.problemCard,
                                border: selectedProblem === index ? '2px solid #4f46e5' : '1px solid #e2e8f0',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 8px 15px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,0,0,0.05)';
                            }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                                <h3 style={styles.cardTitle}>{prob.id}. {prob.title}</h3>
                                <span style={getBadgeStyle(prob.difficulty)}>{prob.difficulty}</span>
                            </div>
                            <p style={styles.cardDesc}>{prob.description}</p>
                            <button
                                onClick={() => setSelectedProblem(index)}
                                style={{
                                    ...styles.viewBtn,
                                    backgroundColor: selectedProblem === index ? '#4f46e5' : '#f1f5f9',
                                    color: selectedProblem === index ? '#fff' : '#475569'
                                }}
                            >
                                View Animated Solution
                            </button>
                        </div>
                    ))}
                </div>

                <div style={{ ...styles.rightPanel, width: isMobile ? '100%' : '62%' }}>
                    <SolutionViewer problem={problems[selectedProblem]} />
                </div>
            </div>
        </div>
    );
};

const formatValue = (v) => {
    if (Array.isArray(v)) return `[${v.join(', ')}]`;
    if (typeof v === 'boolean') return v ? 'true' : 'false';
    return v;
};

const SolutionViewer = ({ problem }) => {
    const steps = useMemo(() => generateSteps(problem.id), [problem.id]);
    const [stepIdx, setStepIdx] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [activeLang, setActiveLang] = useState('python');

    useEffect(() => {
        let timer;
        if (isPlaying && stepIdx < steps.length - 1) {
            timer = setTimeout(() => {
                setStepIdx(prev => prev + 1);
            }, 2000);
        } else if (stepIdx >= steps.length - 1) {
            setIsPlaying(false);
        }
        return () => clearTimeout(timer);
    }, [isPlaying, stepIdx, steps.length]);

    useEffect(() => {
        setStepIdx(0);
        setIsPlaying(false);
    }, [problem.id]);

    const handleNext = () => {
        if (stepIdx < steps.length - 1) setStepIdx(prev => prev + 1);
    };

    const currentStepData = steps[stepIdx] || steps[0];

    return (
        <div style={styles.viewerContainer}>
            <h3 style={styles.viewerTitle}>{problem.title} Solution</h3>

            <div style={styles.algExplanation}>
                <strong>Problem Context:</strong> {problem.description}
            </div>

            <div style={styles.controlsRow}>
                <button style={styles.animBtn} onClick={() => setIsPlaying(!isPlaying)} disabled={stepIdx >= steps.length - 1}>
                    {isPlaying ? "⏸ Pause" : "▶ Start Animation"}
                </button>
                <button style={styles.animBtnAlt} onClick={handleNext} disabled={stepIdx >= steps.length - 1 || isPlaying}>
                    ⏭ Next Step
                </button>
                <button style={styles.animBtnAlt} onClick={() => { setStepIdx(0); setIsPlaying(false); }}>
                    🔄 Reset
                </button>
            </div>

            <div style={styles.visualizationArea}>
                <p style={styles.stepDesc}>Step {stepIdx + 1}: {currentStepData.desc}</p>

                <div style={styles.visContent}>
                    <div style={{ flex: 1, minWidth: '250px' }}>
                        <h4 style={styles.visSub}>Data State</h4>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                            {currentStepData.array.map((item, idx) => {
                                const isActive = currentStepData.activeIndices?.includes(idx);
                                return (
                                    <div key={idx} style={{
                                        ...styles.arrayCell,
                                        backgroundColor: isActive ? '#fef08a' : '#fff',
                                        borderColor: isActive ? '#eab308' : '#cbd5e1'
                                    }}>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '4px' }}>[{idx}]</div>
                                        <div style={{ fontSize: '1.1rem', fontWeight: '800' }}>{item}</div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div style={styles.hashMapVis}>
                        <h4 style={styles.visSub}>Hash Table State</h4>
                        {Object.keys(currentStepData.map).length === 0 ? (
                            <div style={{ color: '#94a3b8', fontStyle: 'italic', padding: '1rem', textAlign: 'center' }}>Empty</div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div style={{ display: 'flex', borderBottom: '2px solid #e2e8f0', paddingBottom: '4px', fontWeight: '700', color: '#64748b', fontSize: '0.9rem' }}>
                                    <div style={{ flex: 1 }}>Key</div>
                                    <div style={{ flex: 1 }}>Value</div>
                                </div>
                                {Object.entries(currentStepData.map).map(([k, v]) => {
                                    const isAdded = String(k) === String(currentStepData.addedKey);
                                    const isHighlight = String(k) === String(currentStepData.highlightKey);
                                    let bg = '#fff', br = '#e2e8f0', tc = '#1e293b';
                                    if (isAdded) { bg = '#dcfce7'; br = '#22c55e'; tc = '#166534'; }
                                    else if (isHighlight) { bg = '#bfdbfe'; br = '#3b82f6'; tc = '#1e3a8a'; }

                                    return (
                                        <motion.div
                                            key={k}
                                            initial={isAdded ? { opacity: 0, x: -10 } : false}
                                            animate={{ opacity: 1, x: 0 }}
                                            style={{ display: 'flex', backgroundColor: bg, padding: '8px', borderRadius: '6px', border: `1px solid ${br}`, transition: 'all 0.3s' }}
                                        >
                                            <div style={{ flex: 1, fontWeight: '800', color: tc, wordBreak: 'break-all', paddingRight: '8px' }}>{k}</div>
                                            <div style={{ flex: 1, color: '#4f46e5', fontWeight: '600', wordBreak: 'break-all' }}>{formatValue(v)}</div>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>

                {currentStepData.result && (
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={styles.resultBox}>
                        {currentStepData.result}
                    </motion.div>
                )}
            </div>

            <div style={styles.codeSection}>
                <div style={styles.langSelector}>
                    {['python', 'javascript', 'cpp'].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setActiveLang(lang)}
                            style={{
                                ...styles.langBtn,
                                backgroundColor: activeLang === lang ? '#4f46e5' : '#f1f5f9',
                                color: activeLang === lang ? '#fff' : '#64748b',
                                border: activeLang === lang ? 'none' : '1px solid #e2e8f0'
                            }}
                        >
                            {lang === 'cpp' ? 'C++' : lang === 'javascript' ? 'JavaScript' : 'Python'}
                        </button>
                    ))}
                </div>
                <pre style={styles.codeBox}>
                    {getCodeSnippet(problem.id, activeLang)}
                </pre>
            </div>
        </div>
    );
};

const getCodeSnippet = (problemId, lang) => {
    const snippets = {
        1: {
            python: `def twoSum(nums, target):
    hash_map = {}
    for i, num in enumerate(nums):
        comp = target - num
        if comp in hash_map:
            return [hash_map[comp], i]
        hash_map[num] = i
    return []`,
            javascript: `function twoSum(nums, target) {
    const map = new Map();
    for (let i=0; i<nums.length; i++) {
        if (map.has(target - nums[i]))
            return [map.get(target - nums[i]), i];
        map.set(nums[i], i);
    }
    return [];
}`,
            cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map;
    for (int i=0; i<nums.size(); i++) {
        int comp = target - nums[i];
        if (map.count(comp))
            return {map[comp], i};
        map[nums[i]] = i;
    }
    return {};
}`
        },
        2: {
            python: `def containsDuplicate(nums):
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False`,
            javascript: `function containsDuplicate(nums) {
    const set = new Set();
    for (const num of nums) {
        if (set.has(num)) return true;
        set.add(num);
    }
    return false;
}`,
            cpp: `bool containsDuplicate(vector<int>& nums) {
    unordered_set<int> s;
    for (int num : nums) {
        if (s.count(num)) return true;
        s.insert(num);
    }
    return false;
}`
        },
        3: {
            python: `def firstUniqChar(s):
    count = collections.Counter(s)
    for i, c in enumerate(s):
        if count[c] == 1:
            return i
    return -1`,
            javascript: `function firstUniqChar(s) {
    const count = {};
    for (const c of s) count[c] = (count[c] || 0) + 1;
    for (let i=0; i<s.length; i++) 
        if (count[s[i]] === 1) return i;
    return -1;
}`,
            cpp: `int firstUniqChar(string s) {
    unordered_map<char, int> count;
    for (char c : s) count[c]++;
    for (int i=0; i<s.length(); i++)
        if (count[s[i]] == 1) return i;
    return -1;
}`
        },
        4: {
            python: `def groupAnagrams(strs):
    groups = collections.defaultdict(list)
    for s in strs:
        groups[''.join(sorted(s))].append(s)
    return list(groups.values())`,
            javascript: `function groupAnagrams(strs) {
    const groups = {};
    for (const s of strs) {
        const key = s.split('').sort().join('');
        if (!groups[key]) groups[key] = [];
        groups[key].push(s);
    }
    return Object.values(groups);
}`,
            cpp: `vector<vector<string>> groupAnagrams(vector<string>& strs) {
    unordered_map<string, vector<string>> groups;
    for (string s : strs) {
        string key = s;
        sort(key.begin(), key.end());
        groups[key].push_back(s);
    }
    vector<vector<string>> ans;
    for (auto& p : groups) ans.push_back(p.second);
    return ans;
}`
        },
        5: {
            python: `def longestConsecutive(nums):
    num_set = set(nums)
    longest = 0
    for n in num_set:
        if (n - 1) not in num_set:
            length = 1
            while (n + length) in num_set:
                length += 1
            longest = max(longest, length)
    return longest`,
            javascript: `function longestConsecutive(nums) {
    const set = new Set(nums);
    let longest = 0;
    for (const n of set) {
        if (!set.has(n - 1)) {
            let length = 1;
            while (set.has(n + length)) length++;
            longest = Math.max(longest, length);
        }
    }
    return longest;
}`,
            cpp: `int longestConsecutive(vector<int>& nums) {
    unordered_set<int> set(nums.begin(), nums.end());
    int longest = 0;
    for (int n : set) {
        if (!set.count(n - 1)) {
            int length = 1;
            while (set.count(n + length)) length++;
            longest = max(longest, length);
        }
    }
    return longest;
}`
        },
        6: {
            python: `def subarraySum(nums, k):
    count = 0
    sum = 0
    prefix_sums = {0: 1}
    for num in nums:
        sum += num
        count += prefix_sums.get(sum - k, 0)
        prefix_sums[sum] = prefix_sums.get(sum, 0) + 1
    return count`,
            javascript: `function subarraySum(nums, k) {
    let count = 0, sum = 0;
    const map = new Map();
    map.set(0, 1);
    for (const num of nums) {
        sum += num;
        if (map.has(sum - k)) count += map.get(sum - k);
        map.set(sum, (map.get(sum) || 0) + 1);
    }
    return count;
}`,
            cpp: `int subarraySum(vector<int>& nums, int k) {
    int count = 0, sum = 0;
    unordered_map<int, int> map;
    map[0] = 1;
    for (int num : nums) {
        sum += num;
        if (map.count(sum - k)) count += map[sum - k];
        map[sum]++;
    }
    return count;
}`
        },
        7: {
            python: `def topKFrequent(nums, k):
    count = collections.Counter(nums)
    return heapq.nlargest(k, count.keys(), key=count.get)`,
            javascript: `function topKFrequent(nums, k) {
    const map = new Map();
    for (const num of nums)
        map.set(num, (map.get(num) || 0) + 1);
    return [...map.keys()]
        .sort((a,b) => map.get(b) - map.get(a))
        .slice(0, k);
}`,
            cpp: `vector<int> topKFrequent(vector<int>& nums, int k) {
    unordered_map<int, int> count;
    for (int num : nums) count[num]++;
    priority_queue<pair<int, int>> pq;
    for (auto& p : count) pq.push({p.second, p.first});
    vector<int> res;
    for (int i=0; i<k; i++) {
        res.push_back(pq.top().second);
        pq.pop();
    }
    return res;
}`
        },
        8: {
            python: `class MyHashMap:
    def __init__(self):
        self.size = 1000
        self.buckets = [[] for _ in range(self.size)]
        
    def put(self, key, value):
        bucket = self.buckets[key % self.size]
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return
        bucket.append((key, value))
        
    def get(self, key):
        bucket = self.buckets[key % self.size]
        for k, v in bucket:
            if k == key: return v
        return -1
        
    def remove(self, key):
        bucket = self.buckets[key % self.size]
        for i, (k, v) in enumerate(bucket):
            if k == key:
                del bucket[i]
                return`,
            javascript: `class MyHashMap {
    constructor() {
        this.size = 1000;
        this.buckets = Array.from({length: this.size}, () => []);
    }
    put(key, value) {
        const bucket = this.buckets[key % this.size];
        const item = bucket.find(p => p[0] === key);
        if (item) item[1] = value;
        else bucket.push([key, value]);
    }
    get(key) {
        const bucket = this.buckets[key % this.size];
        const item = bucket.find(p => p[0] === key);
        return item ? item[1] : -1;
    }
    remove(key) {
        const bucket = this.buckets[key % this.size];
        const idx = bucket.findIndex(p => p[0] === key);
        if (idx !== -1) bucket.splice(idx, 1);
    }
}`,
            cpp: `class MyHashMap {
    vector<list<pair<int, int>>> buckets;
    int size = 1000;
public:
    MyHashMap() { buckets.resize(size); }
    void put(int key, int value) {
        auto& b = buckets[key % size];
        for (auto& p : b) {
            if (p.first == key) { p.second = value; return; }
        }
        b.push_back({key, value});
    }
    int get(int key) {
        for (auto& p : buckets[key % size])
            if (p.first == key) return p.second;
        return -1;
    }
    void remove(int key) {
        auto& b = buckets[key % size];
        for (auto it = b.begin(); it != b.end(); ++it) {
            if (it->first == key) { b.erase(it); return; }
        }
    }
};`
        }
    };
    return snippets[problemId] ? snippets[problemId][lang] : `// Implementation coming soon.`;
};

const generateSteps = (id) => {
    let steps = [];
    if (id === 1) {
        const nums = [2, 7, 11, 15];
        const target = 9;
        let map = {};
        steps.push({ desc: `Target: ${target}. Initialize empty Hash Map to store value -> index.`, array: nums, activeIndices: [], map: { ...map }, result: null });
        for (let i = 0; i < nums.length; i++) {
            const num = nums[i];
            const comp = target - num;
            steps.push({ desc: `Check index ${i} (value ${num}). Complement is ${target} - ${num} = ${comp}.`, array: nums, activeIndices: [i], map: { ...map }, result: null, highlightKey: comp });
            if (comp in map) {
                steps.push({ desc: `Complement ${comp} found in map at index ${map[comp]}! Pair found: [${map[comp]}, ${i}].`, array: nums, activeIndices: [map[comp], i], map: { ...map }, result: `🎉 Pair Indices: [${map[comp]}, ${i}]`, highlightKey: comp });
                break;
            } else {
                map[num] = i;
                steps.push({ desc: `Complement not found. Add {${num}: ${i}} to map.`, array: nums, activeIndices: [i], map: { ...map }, result: null, addedKey: num });
            }
        }
    } else if (id === 2) {
        const nums = [1, 2, 3, 1];
        let set = {};
        steps.push({ desc: `Initialize empty Hash Set to track visited numbers.`, array: nums, activeIndices: [], map: { ...set }, result: null });
        for (let i = 0; i < nums.length; i++) {
            const num = nums[i];
            steps.push({ desc: `Check index ${i} (value ${num}). Is it in the set?`, array: nums, activeIndices: [i], map: { ...set }, result: null, highlightKey: num });
            if (num in set) {
                steps.push({ desc: `Value ${num} is already in the set! Array contains duplicates.`, array: nums, activeIndices: [set[num], i], map: { ...set }, result: `🎉 Duplicate found: ${num}`, highlightKey: num });
                break;
            } else {
                set[num] = i;
                steps.push({ desc: `Value ${num} not seen. Add to set.`, array: nums, activeIndices: [i], map: { ...set }, result: null, addedKey: num });
            }
        }
    } else if (id === 3) {
        const str = "leetcode";
        const arr = str.split('');
        let map = {};
        steps.push({ desc: `Initialize frequency Hash Map.`, array: arr, activeIndices: [], map: { ...map }, result: null });
        for (let i = 0; i < arr.length; i++) {
            const char = arr[i];
            map[char] = (map[char] || 0) + 1;
            steps.push({ desc: `Count character '${char}'. Frequency is now ${map[char]}.`, array: arr, activeIndices: [i], map: { ...map }, addedKey: char });
        }
        steps.push({ desc: `Finished counting frequencies. Now rescan the array to find the first frequency of 1.`, array: arr, activeIndices: [], map: { ...map } });
        for (let i = 0; i < arr.length; i++) {
            const char = arr[i];
            steps.push({ desc: `Second pass: Check frequency of '${char}'.`, array: arr, activeIndices: [i], map: { ...map }, highlightKey: char });
            if (map[char] === 1) {
                steps.push({ desc: `Character '${char}' has frequency 1! First non-repeating character found at index ${i}.`, array: arr, activeIndices: [i], map: { ...map }, result: `🎉 First Unique Char: '${char}'`, highlightKey: char });
                break;
            }
        }
    } else if (id === 4) {
        const words = ["eat", "tea", "tan", "ate", "nat", "bat"];
        let map = {};
        steps.push({ desc: `Initialize Hash Map. Keys will be sorted strings, values will be lists of anagrams.`, array: words, activeIndices: [], map: { ...map }, result: null });
        for (let i = 0; i < words.length; i++) {
            const word = words[i];
            const sorted = word.split('').sort().join('');
            steps.push({ desc: `Process "${word}". Sorted form is "${sorted}".`, array: words, activeIndices: [i], map: JSON.parse(JSON.stringify(map)), highlightKey: sorted });
            if (!map[sorted]) map[sorted] = [];
            map[sorted].push(word);
            steps.push({ desc: `Add "${word}" to the group for key "${sorted}".`, array: words, activeIndices: [i], map: JSON.parse(JSON.stringify(map)), addedKey: sorted });
        }
        steps.push({ desc: `All words grouped by their sorted character keys.`, array: words, activeIndices: [], map: JSON.parse(JSON.stringify(map)), result: `🎉 Grouped ${Object.keys(map).length} total anagram sets.` });
    } else if (id === 5) {
        const nums = [100, 4, 200, 1, 3, 2];
        let set = {};
        nums.forEach((n, i) => set[n] = i);
        steps.push({ desc: `Step 1: Insert all numbers into a Hash Set for O(1) lookups.`, array: nums, activeIndices: [], map: { ...set }, result: null });
        let longest = 0;
        for (let i = 0; i < nums.length; i++) {
            const num = nums[i];
            steps.push({ desc: `Check ${num}. Is ${num - 1} in set?`, array: nums, activeIndices: [i], map: { ...set }, highlightKey: num - 1 });
            if (!(num - 1 in set)) {
                steps.push({ desc: `${num - 1} is not in set. ${num} represents the start of a sequence!`, array: nums, activeIndices: [i], map: { ...set }, highlightKey: num });
                let currentNum = num;
                let currentStreak = 1;
                let checkingNext = currentNum + 1;
                steps.push({ desc: `Check if ${checkingNext} is in the set...`, array: nums, activeIndices: [i], map: { ...set }, highlightKey: checkingNext });
                while (checkingNext in set) {
                    currentNum += 1;
                    currentStreak += 1;
                    steps.push({ desc: `Found ${currentNum} in set! Sequence length is now ${currentStreak}.`, array: nums, activeIndices: [i, set[currentNum]], map: { ...set }, highlightKey: currentNum });
                    checkingNext = currentNum + 1;
                }
                longest = Math.max(longest, currentStreak);
                steps.push({ desc: `Sequence starting at ${num} ends. Length: ${currentStreak}. Max length so far: ${longest}.`, array: nums, activeIndices: [], map: { ...set }, result: `Longest so far: ${longest}` });
            } else {
                steps.push({ desc: `${num - 1} is in set. ${num} is NOT the start of a sequence. Skip to avoid redundant work.`, array: nums, activeIndices: [i], map: { ...set }, highlightKey: num - 1 });
            }
        }
        steps.push({ desc: `Finished traversing. Longest sequence length is ${longest}.`, array: nums, activeIndices: [], map: { ...set }, result: `🎉 Longest Sequence length: ${longest}` });
    } else if (id === 6) {
        const nums = [1, 1, 1];
        const k = 2;
        let map = { 0: 1 };
        let sum = 0;
        let count = 0;
        steps.push({ desc: `Target k = ${k}. Initialize Prefix Sum Hash Map with {0: 1} to handle exact sub-arrays from the start.`, array: nums, activeIndices: [], map: { ...map }, result: `Count: 0` });
        for (let i = 0; i < nums.length; i++) {
            sum += nums[i];
            const diff = sum - k;
            steps.push({ desc: `Add nums[${i}] = ${nums[i]} to running sum. Current sum: ${sum}. Check if sum - k (${sum} - ${k} = ${diff}) is in map.`, array: nums, activeIndices: [i], map: { ...map }, result: `Count: ${count}`, highlightKey: diff });
            if (diff in map) {
                count += map[diff];
                steps.push({ desc: `Found prefix sum ${diff} in map (${map[diff]} times). Add to count! Count is now ${count}.`, array: nums, activeIndices: [i], map: { ...map }, result: `Count: ${count}`, highlightKey: diff });
            }
            map[sum] = (map[sum] || 0) + 1;
            steps.push({ desc: `Record current sum ${sum} into map. map[${sum}] is now ${map[sum]}.`, array: nums, activeIndices: [i], map: { ...map }, addedKey: sum, result: `Count: ${count}` });
        }
        steps.push({ desc: `Finished array traversal. Total subarrays summing to ${k} is ${count}.`, array: nums, activeIndices: [], map: { ...map }, result: `🎉 Total Subarrays: ${count}` });
    } else if (id === 7) {
        const nums = [1, 1, 1, 2, 2, 3];
        const k = 2;
        let map = {};
        steps.push({ desc: `Find top k = ${k} frequent elements. Initialize frequency map.`, array: nums, activeIndices: [], map: { ...map }, result: null });
        for (let i = 0; i < nums.length; i++) {
            const num = nums[i];
            map[num] = (map[num] || 0) + 1;
            steps.push({ desc: `Count ${num}. Freq of ${num} is ${map[num]}.`, array: nums, activeIndices: [i], map: { ...map }, addedKey: num });
        }
        steps.push({ desc: `Frequencies gathered. Next, sort keys by frequency or use a priority queue.`, array: nums, activeIndices: [], map: { ...map }, result: null });
        const sorted = Object.keys(map).sort((a, b) => map[b] - map[a]);
        const topK = sorted.slice(0, k);
        steps.push({ desc: `Sorting reveals elements by freq desc: [${sorted.join(', ')}].`, array: nums, activeIndices: [], map: { ...map }, result: null, highlightKey: sorted[0] });
        steps.push({ desc: `Take top ${k} elements: [${topK.join(', ')}].`, array: nums, activeIndices: [], map: { ...map }, result: `🎉 Top ${k}: [${topK.join(', ')}]` });
    } else if (id === 8) {
        const operations = ["put(1,1)", "put(2,2)", "get(1)", "put(2,4)", "remove(2)"];
        let map = {};
        steps.push({ desc: `Initialize our mock Hash Map. Executing operations sequentially.`, array: operations, activeIndices: [], map: { ...map }, result: null });
        steps.push({ desc: `Operation: put(1, 1). Hash key 1 and insert key-value pair.`, array: operations, activeIndices: [0], map: { ...map } });
        map[1] = 1;
        steps.push({ desc: `Inserted {1: 1}.`, array: operations, activeIndices: [0], map: { ...map }, addedKey: 1 });
        steps.push({ desc: `Operation: put(2, 2). Hash key 2 and insert.`, array: operations, activeIndices: [1], map: { ...map } });
        map[2] = 2;
        steps.push({ desc: `Inserted {2: 2}.`, array: operations, activeIndices: [1], map: { ...map }, addedKey: 2 });
        steps.push({ desc: `Operation: get(1). Look up key 1.`, array: operations, activeIndices: [2], map: { ...map }, highlightKey: 1 });
        steps.push({ desc: `Found key 1! Return value ${map[1]}.`, array: operations, activeIndices: [2], map: { ...map }, highlightKey: 1, result: `Output: 1` });
        steps.push({ desc: `Operation: put(2, 4). Key 2 already exists. Update its value.`, array: operations, activeIndices: [3], map: { ...map }, highlightKey: 2 });
        map[2] = 4;
        steps.push({ desc: `Updated to {2: 4}.`, array: operations, activeIndices: [3], map: { ...map }, addedKey: 2 });
        steps.push({ desc: `Operation: remove(2). Find key 2 and delete it.`, array: operations, activeIndices: [4], map: { ...map }, highlightKey: 2 });
        delete map[2];
        steps.push({ desc: `Removed key 2. Map contains 1 pair.`, array: operations, activeIndices: [4], map: { ...map }, result: `Output: null` });
    }

    if (steps.length === 0) {
        steps = [{ desc: "Generic Hash Map Initialization", array: [], activeIndices: [], map: {} }];
    }

    return steps;
};


const styles = {
    container: { padding: '2rem', backgroundColor: '#fff', borderRadius: '32px', fontFamily: 'system-ui, sans-serif' },
    header: { textAlign: 'center', marginBottom: '3rem' },
    title: { fontSize: '2.5rem', fontWeight: '900', color: '#1e293b', letterSpacing: '-0.025em', marginBottom: '1rem' },
    subtitle: { color: '#64748b', fontSize: '1.1rem', maxWidth: '800px', margin: '0 auto' },
    splitLayout: { display: 'flex', gap: '2rem', minHeight: '800px' },
    leftPanel: { display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', paddingRight: '1rem', maxHeight: '1000px' },
    problemCard: { background: 'white', borderRadius: '14px', padding: '16px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', flexDirection: 'column' },
    cardTitle: { margin: 0, fontSize: '1.1rem', fontWeight: '800', color: '#1e293b' },
    cardDesc: { color: '#64748b', fontSize: '0.9rem', lineHeight: '1.5', flex: 1, marginBottom: '12px' },
    viewBtn: { padding: '8px 12px', borderRadius: '8px', border: 'none', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer', transition: 'all 0.2s', width: '100%' },
    rightPanel: { display: 'flex', flexDirection: 'column', height: '100%' },
    viewerContainer: { background: '#F8FAFC', borderRadius: '16px', padding: '24px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', flex: 1 },
    viewerTitle: { margin: '0 0 16px 0', fontSize: '1.5rem', fontWeight: '900', color: '#1e293b' },
    algExplanation: { backgroundColor: '#e0e7ff', padding: '16px', borderRadius: '12px', color: '#3730a3', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '24px', borderLeft: '4px solid #4f46e5' },
    controlsRow: { display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' },
    animBtn: { backgroundColor: '#10b981', color: 'white', border: 'none', padding: '10px 16px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.2)' },
    animBtnAlt: { backgroundColor: '#fff', color: '#475569', border: '1px solid #cbd5e1', padding: '10px 16px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' },
    visualizationArea: { display: 'flex', flexDirection: 'column', gap: '20px', backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', marginBottom: '24px', minHeight: '300px' },
    stepDesc: { margin: '0 0 16px 0', fontSize: '1.05rem', fontWeight: '700', color: '#334155', borderBottom: '2px dashed #e2e8f0', paddingBottom: '16px' },
    visContent: { display: 'flex', gap: '2rem', flexWrap: 'wrap' },
    visSub: { margin: '0 0 12px 0', fontSize: '1rem', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' },
    arrayCell: { borderStyle: 'solid', borderWidth: '3px', borderRadius: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', minHeight: '60px' },
    hashMapVis: { backgroundColor: '#f1f5f9', padding: '16px', borderRadius: '12px', minWidth: '250px', border: '1px solid #e2e8f0', flex: 1 },
    resultBox: { alignSelf: 'center', backgroundColor: '#dcfce7', color: '#166534', padding: '12px 24px', borderRadius: '12px', fontWeight: '800', fontSize: '1.1rem', border: '2px solid #22c55e', marginTop: 'auto' },
    codeSection: { marginTop: 'auto' },
    langSelector: { display: 'flex', gap: '8px', marginBottom: '12px' },
    langBtn: { padding: '6px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' },
    codeBox: { backgroundColor: '#0f172a', color: '#f8fafc', padding: '16px', borderRadius: '16px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.6', fontFamily: 'monospace', margin: 0 }
};

export default HashTablePracticeProblems;
