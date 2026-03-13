import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ─── Problem Definitions ───────────────────────────────────────────────────
const problems = [
    {
        id: 'sort-colors',
        title: 'Sort Colors',
        desc: 'Sort an array containing 0s, 1s, and 2s using the Dutch National Flag algorithm in O(n) with a single pass.',
        difficulty: 'Easy',
        tag: '🎨',
    },
    {
        id: 'merge-sorted',
        title: 'Merge Two Sorted Arrays',
        desc: 'Merge two sorted arrays into a single sorted array using a two-pointer technique.',
        difficulty: 'Easy',
        tag: '🔗',
    },
    {
        id: 'kth-largest',
        title: 'Kth Largest Element',
        desc: 'Find the kth largest element in an unsorted array using a min-heap of size k.',
        difficulty: 'Medium',
        tag: '🏆',
    },
    {
        id: 'top-k-frequent',
        title: 'Top K Frequent Elements',
        desc: 'Return the k most frequent elements using a frequency map and heap sorting.',
        difficulty: 'Medium',
        tag: '📊',
    },
    {
        id: 'merge-intervals',
        title: 'Merge Intervals',
        desc: 'Sort intervals by start time, then merge all overlapping intervals into one.',
        difficulty: 'Medium',
        tag: '📐',
    },
    {
        id: 'quickselect',
        title: 'QuickSelect Kth Element',
        desc: 'Use QuickSelect partitioning to find the kth smallest element in O(n) average time.',
        difficulty: 'Medium',
        tag: '⚡',
    },
    {
        id: 'sort-linked-list',
        title: 'Sort a Linked List',
        desc: 'Sort a singly linked list using Merge Sort — split into halves, sort each, then merge.',
        difficulty: 'Hard',
        tag: '🔗',
    },
    {
        id: 'count-inversions',
        title: 'Count Inversions',
        desc: 'Count pairs (i,j) where i<j but arr[i]>arr[j] — solved efficiently with Merge Sort.',
        difficulty: 'Hard',
        tag: '🔢',
    },
];

const diffStyle = d => ({
    padding: '3px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '700',
    backgroundColor: d === 'Easy' ? '#dcfce7' : d === 'Medium' ? '#fff7ed' : '#fee2e2',
    color: d === 'Easy' ? '#15803d' : d === 'Medium' ? '#c2410c' : '#b91c1c',
    display: 'inline-block',
});

// ─── Individual Animated Solutions ────────────────────────────────────────
const SortColorsViz = () => {
    const INIT = [2, 0, 1, 2, 1, 0, 2, 1, 0, 1];
    const [arr, setArr] = useState([...INIT]);
    const [lo, setLo] = useState(null); const [mid, setMid] = useState(null); const [hi, setHi] = useState(null);
    const [msg, setMsg] = useState(''); const [done, setDone] = useState(false); const [running, setRunning] = useState(false);
    const stop = useRef(false);
    const colors = { 0: '#3b82f6', 1: '#f8fafc', 2: '#ef4444' };
    const border = { 0: '#1d4ed8', 1: '#94a3b8', 2: '#991b1b' };

    const reset = () => { stop.current = true; setTimeout(() => { stop.current = false; }, 100); setArr([...INIT]); setLo(null); setMid(null); setHi(null); setMsg(''); setDone(false); setRunning(false); };

    const run = async () => {
        stop.current = false; setRunning(true); setDone(false);
        let a = [...INIT]; let l = 0, m = 0, h = a.length - 1;
        while (m <= h) {
            if (stop.current) return;
            setLo(l); setMid(m); setHi(h);
            if (a[m] === 0) {
                setMsg(`arr[${m}]=0 → swap with lo(${l})`);
                [a[l], a[m]] = [a[m], a[l]]; l++; m++;
            } else if (a[m] === 1) {
                setMsg(`arr[${m}]=1 → already correct, mid++`); m++;
            } else {
                setMsg(`arr[${m}]=2 → swap with hi(${h})`);
                [a[m], a[h]] = [a[h], a[m]]; h--;
            }
            setArr([...a]); await sleep(700);
        }
        setLo(null); setMid(null); setHi(null);
        setMsg('✓ Sorted: all 0s → 1s → 2s'); setDone(true); setRunning(false);
        if (window.AppProgress) window.AppProgress.markProblemSolved();
    };

    return (
        <div style={v.wrap}>
            <div style={v.desc}>Dutch National Flag: three pointers <strong>lo</strong>, <strong>mid</strong>, <strong>hi</strong> partition 0s left, 1s middle, 2s right in one pass.</div>
            <div style={v.vizArea}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {arr.map((val, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <div style={{ ...v.cell, backgroundColor: colors[val], border: `2px solid ${border[val]}`, outline: i === mid ? '3px solid #f59e0b' : i === lo ? '3px solid #6366f1' : i === hi ? '3px solid #ec4899' : 'none', outlineOffset: '2px' }}>{val}</div>
                            <span style={{ fontSize: '0.65rem', fontWeight: '700', color: i === lo ? '#6366f1' : i === mid ? '#f59e0b' : i === hi ? '#ec4899' : '#94a3b8' }}>
                                {i === lo ? 'lo' : i === mid ? 'mid' : i === hi ? 'hi' : ''}
                            </span>
                        </div>
                    ))}
                </div>
                {msg && <div style={v.msg}>{msg}</div>}
            </div>
            <div style={v.legend}><span style={{ color: '#3b82f6', fontWeight: '700' }}>■ 0 (Blue)</span><span style={{ color: '#64748b', fontWeight: '700' }}>■ 1 (White)</span><span style={{ color: '#ef4444', fontWeight: '700' }}>■ 2 (Red)</span></div>
        </div>
    );
};

const MergeSortedViz = () => {
    const A = [1, 3, 5, 7]; const B = [2, 4, 6, 8];
    const [merged, setMerged] = useState([]);
    const [pi, setPi] = useState(null); const [pj, setPj] = useState(null);
    const [msg, setMsg] = useState(''); const [done, setDone] = useState(false); const [running, setRunning] = useState(false);
    const stop = useRef(false);
    const reset = () => { stop.current = true; setTimeout(() => { stop.current = false; }, 100); setMerged([]); setPi(null); setPj(null); setMsg(''); setDone(false); setRunning(false); };
    const run = async () => {
        stop.current = false; setRunning(true); setDone(false);
        let i = 0, j = 0, res = [];
        while (i < A.length && j < B.length) {
            if (stop.current) return;
            setPi(i); setPj(j);
            setMsg(`Compare A[${i}]=${A[i]} vs B[${j}]=${B[j]}`);
            await sleep(700);
            if (A[i] <= B[j]) { res.push(A[i++]); } else { res.push(B[j++]); }
            setMerged([...res]); await sleep(300);
        }
        while (i < A.length) { if (stop.current) return; res.push(A[i++]); setMerged([...res]); await sleep(300); }
        while (j < B.length) { if (stop.current) return; res.push(B[j++]); setMerged([...res]); await sleep(300); }
        setPi(null); setPj(null); setMsg('✓ Arrays merged into sorted result'); setDone(true); setRunning(false);
        if (window.AppProgress) window.AppProgress.markProblemSolved();
    };
    return (
        <div style={v.wrap}>
            <div style={v.desc}>Two-pointer merge: compare front elements from each sorted array, always picking the smaller one.</div>
            <div style={v.vizArea}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        <span style={{ fontWeight: '700', color: '#4f46e5', marginRight: '8px', width: '24px' }}>A:</span>
                        {A.map((val, i) => <div key={i} style={{ ...v.cell, backgroundColor: i === pi ? '#fbbf24' : '#dbeafe', border: '2px solid #93c5fd' }}>{val}</div>)}
                    </div>
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        <span style={{ fontWeight: '700', color: '#0891b2', marginRight: '8px', width: '24px' }}>B:</span>
                        {B.map((val, i) => <div key={i} style={{ ...v.cell, backgroundColor: i === pj ? '#fbbf24' : '#dcfce7', border: '2px solid #86efac' }}>{val}</div>)}
                    </div>
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        <span style={{ fontWeight: '700', color: '#15803d', marginRight: '8px', width: '24px' }}>→</span>
                        {merged.map((val, i) => <div key={i} style={{ ...v.cell, backgroundColor: '#4ade80', border: '2px solid #16a34a' }}>{val}</div>)}
                        {merged.length === 0 && <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>merged result appears here</span>}
                    </div>
                </div>
                {msg && <div style={v.msg}>{msg}</div>}
            </div>
        </div>
    );
};

const GenericHashViz = ({ title, steps, initState }) => {
    const [step, setStep] = useState(0);
    const [done, setDone] = useState(false);
    const [running, setRunning] = useState(false);
    const [displayState, setDisplayState] = useState(initState);
    const stop = useRef(false);

    const reset = () => { stop.current = true; setTimeout(() => { stop.current = false; }, 100); setStep(0); setDone(false); setRunning(false); setDisplayState(initState); };

    const runAnim = async () => {
        stop.current = false; setRunning(true); setDone(false);
        for (let i = 0; i < steps.length; i++) {
            if (stop.current) return;
            setStep(i); setDisplayState(steps[i].state);
            await sleep(900);
        }
        setDone(true); setRunning(false); setStep(steps.length - 1);
        if (window.AppProgress) window.AppProgress.markProblemSolved();
    };

    const nextStep = () => {
        if (done || running) return;
        const next = Math.min(step + 1, steps.length - 1);
        setStep(next); setDisplayState(steps[next].state);
        if (next === steps.length - 1) setDone(true);
    };

    const curr = steps[step];

    return (
        <div style={v.wrap}>
            <div style={v.desc}>{title}</div>
            <div style={v.vizArea}>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '12px' }}>
                    {displayState.map((item, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <div style={{ ...v.cell, backgroundColor: item.color || '#e2e8f0', border: `2px solid ${item.border || '#94a3b8'}`, minWidth: item.label ? '50px' : '40px', fontSize: item.label ? '0.7rem' : '0.9rem' }}>
                                {item.label || item.val}
                            </div>
                        </div>
                    ))}
                </div>
                {curr && <div style={v.msg}>{curr.msg}</div>}
            </div>
            <div style={v.controls}>
                <button onClick={runAnim} disabled={running} style={v.btn('#4f46e5')}>▶ Start</button>
                <button onClick={nextStep} disabled={running || done} style={v.btn('#0891b2')}>⏭ Step</button>
                <button onClick={reset} style={v.btn('#ef4444')}>↺ Reset</button>
            </div>
        </div>
    );
};

// Generate steps for Kth Largest
const kthLargestSteps = (() => {
    const arr = [3, 2, 1, 5, 6, 4]; const k = 2;
    const heap = [];
    const steps = [];
    steps.push({ msg: `Find ${k}nd largest in [${arr.join(', ')}]. Build min-heap of size ${k}.`, state: arr.map(v => ({ val: v, color: '#e2e8f0', border: '#94a3b8' })) });
    for (let i = 0; i < arr.length; i++) {
        heap.push(arr[i]); heap.sort((a, b) => a - b);
        if (heap.length > k) heap.shift();
        steps.push({ msg: `Add ${arr[i]} to heap. Heap: [${heap.join(', ')}]`, state: arr.map((v, j) => ({ val: v, color: j <= i ? '#dbeafe' : '#e2e8f0', border: j <= i ? '#93c5fd' : '#94a3b8' })) });
    }
    steps.push({ msg: `✓ Heap root = ${heap[0]} is the ${k}nd largest element!`, state: arr.map(v => ({ val: v, color: v === heap[0] ? '#4ade80' : '#dbeafe', border: v === heap[0] ? '#16a34a' : '#93c5fd' })) });
    return steps;
})();

const mergeIntervalsSteps = [
    { msg: 'Input intervals: [[1,3],[2,6],[8,10],[15,18]]. Sort by start time.', state: [{ label: '[1,3]', color: '#dbeafe', border: '#93c5fd' }, { label: '[2,6]', color: '#dbeafe', border: '#93c5fd' }, { label: '[8,10]', color: '#dbeafe', border: '#93c5fd' }, { label: '[15,18]', color: '#dbeafe', border: '#93c5fd' }] },
    { msg: 'Compare [1,3] and [2,6]: 2 ≤ 3, they overlap! Merge → [1,6]', state: [{ label: '[1,6]', color: '#fbbf24', border: '#d97706' }, { label: '[8,10]', color: '#dbeafe', border: '#93c5fd' }, { label: '[15,18]', color: '#dbeafe', border: '#93c5fd' }] },
    { msg: 'Compare [1,6] and [8,10]: 8 > 6, no overlap. Keep both.', state: [{ label: '[1,6]', color: '#4ade80', border: '#16a34a' }, { label: '[8,10]', color: '#fbbf24', border: '#d97706' }, { label: '[15,18]', color: '#dbeafe', border: '#93c5fd' }] },
    { msg: 'Compare [8,10] and [15,18]: 15 > 10, no overlap. Keep both.', state: [{ label: '[1,6]', color: '#4ade80', border: '#16a34a' }, { label: '[8,10]', color: '#4ade80', border: '#16a34a' }, { label: '[15,18]', color: '#fbbf24', border: '#d97706' }] },
    { msg: '✓ Merged: [[1,6],[8,10],[15,18]]', state: [{ label: '[1,6]', color: '#4ade80', border: '#16a34a' }, { label: '[8,10]', color: '#4ade80', border: '#16a34a' }, { label: '[15,18]', color: '#4ade80', border: '#16a34a' }] },
];

const quickselectSteps = (() => {
    const arr = [7, 2, 5, 1, 8]; const k = 2;
    return [
        { msg: `Find ${k}nd smallest in [${arr.join(', ')}]. Choose pivot = ${arr[arr.length - 1]}.`, state: arr.map((v, i) => ({ val: v, color: i === arr.length - 1 ? '#a855f7' : '#e2e8f0', border: i === arr.length - 1 ? '#7c3aed' : '#94a3b8' })) },
        { msg: 'Partition: values ≤ 8 go left, values > 8 go right.', state: [{ val: 7 }, { val: 2 }, { val: 5 }, { val: 1 }, { val: 8, color: '#a855f7', border: '#7c3aed' }].map(x => ({ ...x, color: x.color || '#fbbf24', border: x.border || '#d97706' })) },
        { msg: 'Pivot 8 is at index 4. k=2 < 4, search left partition [7,2,5,1].', state: [7, 2, 5, 1].map(v => ({ val: v, color: '#dbeafe', border: '#93c5fd' })) },
        { msg: 'New pivot = 1. Partition [7,2,5] vs 1. Pivot 1 is at index 0. k=2 > 0, search right.', state: [{ val: 1, color: '#a855f7', border: '#7c3aed' }, { val: 7 }, { val: 2 }, { val: 5 }].map(x => ({ ...x, color: x.color || '#fbbf24', border: x.border || '#d97706' })) },
        { msg: '✓ 2nd smallest is 2!', state: [1, 2, 5, 7, 8].map((v, i) => ({ val: v, color: i === 1 ? '#4ade80' : '#dbeafe', border: i === 1 ? '#16a34a' : '#93c5fd' })) },
    ];
})();

const linkedListSteps = [
    { msg: 'Input linked list: 4→2→1→3. Split into halves.', state: [{ val: 4 }, { val: 2 }, { val: 1 }, { val: 3 }].map(x => ({ ...x, color: '#dbeafe', border: '#93c5fd' })) },
    { msg: 'Left half: 4→2, Right half: 1→3. Sort each recursively.', state: [{ val: 4, color: '#fbbf24', border: '#d97706' }, { val: 2, color: '#fbbf24', border: '#d97706' }, { val: 1, color: '#a855f7', border: '#7c3aed' }, { val: 3, color: '#a855f7', border: '#7c3aed' }] },
    { msg: 'Left sorted: 2→4, Right sorted: 1→3. Now merge.', state: [{ val: 2 }, { val: 4 }, { val: 1 }, { val: 3 }].map(x => ({ ...x, color: '#4ade80', border: '#16a34a' })) },
    { msg: 'Merge: compare 2 vs 1. Take 1.', state: [{ val: 1, color: '#4ade80', border: '#16a34a' }, { val: 2 }, { val: 4 }, { val: 3 }].map(x => ({ ...x, color: x.color || '#fbbf24', border: x.border || '#d97706' })) },
    { msg: '✓ Sorted list: 1→2→3→4', state: [1, 2, 3, 4].map(v => ({ val: v, color: '#4ade80', border: '#16a34a' })) },
];

const inversionsSteps = (() => {
    const arr = [3, 1, 2]; const invs = [[3, 1], [3, 2]];
    return [
        { msg: `Count inversions in [${arr.join(', ')}]. (i<j but arr[i]>arr[j])`, state: arr.map(v => ({ val: v, color: '#dbeafe', border: '#93c5fd' })) },
        { msg: 'Split: [3] and [1,2]. Merge sort counts inversions during merge.', state: [{ val: 3, color: '#fbbf24', border: '#d97706' }, { val: 1, color: '#a855f7', border: '#7c3aed' }, { val: 2, color: '#a855f7', border: '#7c3aed' }] },
        { msg: 'Merging [3] and [1,2]: 3 > 1 → +1 inversion (3,1). Merge 1 first.', state: [{ val: 1, color: '#4ade80', border: '#16a34a' }, { val: 3, color: '#fbbf24', border: '#d97706' }, { val: 2, color: '#fbbf24', border: '#d97706' }] },
        { msg: '3 > 2 → +1 inversion (3,2). Merge 2. Total: 2 inversions.', state: [{ val: 1, color: '#4ade80', border: '#16a34a' }, { val: 2, color: '#4ade80', border: '#16a34a' }, { val: 3, color: '#4ade80', border: '#16a34a' }] },
        { msg: '✓ Total inversions = 2: pairs (3,1) and (3,2)', state: [1, 2, 3].map(v => ({ val: v, color: '#4ade80', border: '#16a34a' })) },
    ];
})();

const topKSteps = [
    { msg: 'Input: [1,1,1,2,2,3], k=2. Build frequency map.', state: [{ label: '1:3', color: '#dbeafe', border: '#93c5fd' }, { label: '2:2', color: '#dbeafe', border: '#93c5fd' }, { label: '3:1', color: '#dbeafe', border: '#93c5fd' }] },
    { msg: 'Sort by frequency: 1(3 times) > 2(2 times) > 3(1 time).', state: [{ label: '1:3', color: '#fbbf24', border: '#d97706' }, { label: '2:2', color: '#fbbf24', border: '#d97706' }, { label: '3:1', color: '#e2e8f0', border: '#94a3b8' }] },
    { msg: '✓ Top 2 frequent: [1, 2]', state: [{ label: '1:3', color: '#4ade80', border: '#16a34a' }, { label: '2:2', color: '#4ade80', border: '#16a34a' }, { label: '3:1', color: '#e2e8f0', border: '#94a3b8' }] },
];

// ─── Code snippets ─────────────────────────────────────────────────────────
const codes = {
    'sort-colors': {
        python: `def sortColors(nums):
    lo, mid, hi = 0, 0, len(nums) - 1
    while mid <= hi:
        if nums[mid] == 0:
            nums[lo], nums[mid] = nums[mid], nums[lo]
            lo += 1; mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[hi] = nums[hi], nums[mid]
            hi -= 1
# Time: O(n)  Space: O(1)`,
        javascript: `function sortColors(nums) {
    let lo = 0, mid = 0, hi = nums.length - 1;
    while (mid <= hi) {
        if (nums[mid] === 0) {
            [nums[lo++], nums[mid++]] = [nums[mid], nums[lo]];
        } else if (nums[mid] === 1) {
            mid++;
        } else {
            [nums[mid], nums[hi--]] = [nums[hi], nums[mid]];
        }
    }
}`,
        cpp: `void sortColors(vector<int>& nums) {
    int lo=0, mid=0, hi=nums.size()-1;
    while (mid<=hi) {
        if (nums[mid]==0) swap(nums[lo++],nums[mid++]);
        else if (nums[mid]==1) mid++;
        else swap(nums[mid],nums[hi--]);
    }
}`,
    },
    'merge-sorted': {
        python: `def merge(A, B):
    result = []
    i = j = 0
    while i < len(A) and j < len(B):
        if A[i] <= B[j]: result.append(A[i]); i += 1
        else: result.append(B[j]); j += 1
    result.extend(A[i:]); result.extend(B[j:])
    return result
# Time: O(n+m)  Space: O(n+m)`,
        javascript: `function merge(A, B) {
    const result = [];
    let i = 0, j = 0;
    while (i < A.length && j < B.length) {
        result.push(A[i] <= B[j] ? A[i++] : B[j++]);
    }
    return result.concat(A.slice(i)).concat(B.slice(j));
}`,
        cpp: `vector<int> merge(vector<int>& A,vector<int>& B){
    vector<int> res; int i=0,j=0;
    while(i<A.size()&&j<B.size())
        res.push_back(A[i]<=B[j]?A[i++]:B[j++]);
    while(i<A.size()) res.push_back(A[i++]);
    while(j<B.size()) res.push_back(B[j++]);
    return res;
}`,
    },
    'kth-largest': {
        python: `import heapq
def findKthLargest(nums, k):
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]
# Time: O(n log k)  Space: O(k)`,
        javascript: `function findKthLargest(nums, k) {
    const minHeap = new MinPriorityQueue();
    for (const num of nums) {
        minHeap.enqueue(num);
        if (minHeap.size() > k) minHeap.dequeue();
    }
    return minHeap.front().element;
}`,
        cpp: `int findKthLargest(vector<int>& nums, int k){
    priority_queue<int,vector<int>,greater<int>> pq;
    for(int n:nums){
        pq.push(n);
        if(pq.size()>k) pq.pop();
    }
    return pq.top();
}`,
    },
    'top-k-frequent': {
        python: `from collections import Counter
def topKFrequent(nums, k):
    count = Counter(nums)
    return sorted(count, key=count.get, reverse=True)[:k]
# Time: O(n log n)  Space: O(n)`,
        javascript: `function topKFrequent(nums, k) {
    const count = {};
    for (const n of nums) count[n] = (count[n] || 0) + 1;
    return Object.keys(count)
        .sort((a,b) => count[b]-count[a])
        .slice(0, k)
        .map(Number);
}`,
        cpp: `vector<int> topKFrequent(vector<int>& nums,int k){
    unordered_map<int,int> cnt;
    for(int n:nums) cnt[n]++;
    vector<pair<int,int>> v(cnt.begin(),cnt.end());
    sort(v.begin(),v.end(),[](auto&a,auto&b){return a.second>b.second;});
    vector<int> res;
    for(int i=0;i<k;i++) res.push_back(v[i].first);
    return res;
}`,
    },
    'merge-intervals': {
        python: `def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged
# Time: O(n log n)  Space: O(n)`,
        javascript: `function merge(intervals) {
    intervals.sort((a,b) => a[0]-b[0]);
    const res = [intervals[0]];
    for (const [s,e] of intervals.slice(1)) {
        if (s <= res[res.length-1][1])
            res[res.length-1][1] = Math.max(res[res.length-1][1], e);
        else res.push([s,e]);
    }
    return res;
}`,
        cpp: `vector<vector<int>> merge(vector<vector<int>>& iv){
    sort(iv.begin(),iv.end());
    vector<vector<int>> res={iv[0]};
    for(auto& v:iv){
        if(v[0]<=res.back()[1])
            res.back()[1]=max(res.back()[1],v[1]);
        else res.push_back(v);
    }
    return res;
}`,
    },
    'quickselect': {
        python: `def findKthSmallest(nums, k):
    def partition(lo, hi):
        pivot = nums[hi]
        i = lo
        for j in range(lo, hi):
            if nums[j] <= pivot:
                nums[i], nums[j] = nums[j], nums[i]
                i += 1
        nums[i], nums[hi] = nums[hi], nums[i]
        return i
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        p = partition(lo, hi)
        if p == k - 1: return nums[p]
        elif p < k - 1: lo = p + 1
        else: hi = p - 1
# Time: O(n) avg  Space: O(1)`,
        javascript: `function kthSmallest(nums, k) {
    function partition(lo, hi) {
        let i = lo, pivot = nums[hi];
        for (let j = lo; j < hi; j++)
            if (nums[j] <= pivot) [nums[i++],nums[j]] = [nums[j],nums[i]];
        [nums[i],nums[hi]] = [nums[hi],nums[i]];
        return i;
    }
    let lo=0, hi=nums.length-1;
    while (lo<=hi) {
        const p = partition(lo, hi);
        if (p===k-1) return nums[p];
        p<k-1 ? (lo=p+1) : (hi=p-1);
    }
}`,
        cpp: `int kthSmallest(vector<int>& nums,int k){
    int lo=0,hi=nums.size()-1;
    while(lo<=hi){
        int pivot=nums[hi],i=lo;
        for(int j=lo;j<hi;j++)
            if(nums[j]<=pivot) swap(nums[i++],nums[j]);
        swap(nums[i],nums[hi]);
        if(i==k-1) return nums[i];
        i<k-1?lo=i+1:hi=i-1;
    }
    return -1;
}`,
    },
    'sort-linked-list': {
        python: `def sortList(head):
    if not head or not head.next: return head
    slow, fast = head, head.next
    while fast and fast.next:
        slow = slow.next; fast = fast.next.next
    mid = slow.next; slow.next = None
    left = sortList(head)
    right = sortList(mid)
    return merge(left, right)

def merge(l1, l2):
    dummy = ListNode(0); cur = dummy
    while l1 and l2:
        if l1.val <= l2.val: cur.next=l1; l1=l1.next
        else: cur.next=l2; l2=l2.next
        cur = cur.next
    cur.next = l1 or l2
    return dummy.next
# Time: O(n log n)  Space: O(log n)`,
        javascript: `function sortList(head) {
    if (!head || !head.next) return head;
    let slow=head, fast=head.next;
    while (fast && fast.next) {
        slow=slow.next; fast=fast.next.next;
    }
    const mid=slow.next; slow.next=null;
    return merge(sortList(head), sortList(mid));
}
function merge(l1,l2){
    const dummy={next:null}; let c=dummy;
    while(l1&&l2){
        if(l1.val<=l2.val){c.next=l1;l1=l1.next;}
        else{c.next=l2;l2=l2.next;}
        c=c.next;
    }
    c.next=l1||l2; return dummy.next;
}`,
        cpp: `ListNode* merge(ListNode* l1,ListNode* l2){
    ListNode dummy(0); auto cur=&dummy;
    while(l1&&l2){
        if(l1->val<=l2->val){cur->next=l1;l1=l1->next;}
        else{cur->next=l2;l2=l2->next;}
        cur=cur->next;
    }
    cur->next=l1?l1:l2; return dummy.next;
}
ListNode* sortList(ListNode* head){
    if(!head||!head->next) return head;
    auto slow=head,fast=head->next;
    while(fast&&fast->next){slow=slow->next;fast=fast->next->next;}
    auto mid=slow->next; slow->next=nullptr;
    return merge(sortList(head),sortList(mid));
}`,
    },
    'count-inversions': {
        python: `def countInversions(arr):
    def mergeCount(arr):
        if len(arr) <= 1: return arr, 0
        mid = len(arr) // 2
        left, lc = mergeCount(arr[:mid])
        right, rc = mergeCount(arr[mid:])
        merged, mc = [], 0
        i = j = 0
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                merged.append(left[i]); i += 1
            else:
                merged.append(right[j]); j += 1
                mc += len(left) - i  # key count
        merged += left[i:] + right[j:]
        return merged, lc + rc + mc
    _, count = mergeCount(arr)
    return count
# Time: O(n log n)  Space: O(n)`,
        javascript: `function countInversions(arr) {
    function mergeCount(arr) {
        if (arr.length <= 1) return [arr, 0];
        const mid = Math.floor(arr.length / 2);
        const [left, lc] = mergeCount(arr.slice(0,mid));
        const [right, rc] = mergeCount(arr.slice(mid));
        let inv=0, i=0, j=0, merged=[];
        while (i<left.length && j<right.length) {
            if (left[i]<=right[j]) merged.push(left[i++]);
            else { merged.push(right[j++]); inv += left.length-i; }
        }
        return [[...merged,...left.slice(i),...right.slice(j)], lc+rc+inv];
    }
    return mergeCount(arr)[1];
}`,
        cpp: `long long mergeCount(vector<int>& arr,int l,int r){
    if(l>=r) return 0;
    int m=(l+r)/2;
    long long inv=mergeCount(arr,l,m)+mergeCount(arr,m+1,r);
    vector<int> tmp; int i=l,j=m+1;
    while(i<=m&&j<=r){
        if(arr[i]<=arr[j]) tmp.push_back(arr[i++]);
        else{ tmp.push_back(arr[j++]); inv+=m-i+1; }
    }
    while(i<=m) tmp.push_back(arr[i++]);
    while(j<=r) tmp.push_back(arr[j++]);
    copy(tmp.begin(),tmp.end(),arr.begin()+l);
    return inv;
}`,
    },
};

// ─── Visualization router ──────────────────────────────────────────────────
const VizRouter = ({ id }) => {
    if (id === 'sort-colors') return <SortColorsViz />;
    if (id === 'merge-sorted') return <MergeSortedViz />;
    if (id === 'kth-largest') return <GenericHashViz title="Min-heap of size k: scan all elements, always keep k largest." steps={kthLargestSteps} initState={[3, 2, 1, 5, 6, 4].map(v => ({ val: v, color: '#e2e8f0', border: '#94a3b8' }))} />;
    if (id === 'top-k-frequent') return <GenericHashViz title="Build frequency map, sort by frequency, take top k." steps={topKSteps} initState={[{ label: '1:?', color: '#e2e8f0', border: '#94a3b8' }, { label: '2:?', color: '#e2e8f0', border: '#94a3b8' }, { label: '3:?', color: '#e2e8f0', border: '#94a3b8' }]} />;
    if (id === 'merge-intervals') return <GenericHashViz title="Sort intervals by start, then greedily merge overlapping ones." steps={mergeIntervalsSteps} initState={[{ label: '[1,3]' }, { label: '[2,6]' }, { label: '[8,10]' }, { label: '[15,18]' }].map(x => ({ ...x, color: '#dbeafe', border: '#93c5fd' }))} />;
    if (id === 'quickselect') return <GenericHashViz title="QuickSelect: partition around pivot, recurse only toward the target index." steps={quickselectSteps} initState={[7, 2, 5, 1, 8].map(v => ({ val: v, color: '#e2e8f0', border: '#94a3b8' }))} />;
    if (id === 'sort-linked-list') return <GenericHashViz title="Split linked list at midpoint, recursively sort each half, then merge." steps={linkedListSteps} initState={[4, 2, 1, 3].map(v => ({ val: v, color: '#dbeafe', border: '#93c5fd' }))} />;
    if (id === 'count-inversions') return <GenericHashViz title="Modified Merge Sort: count inversions when merging — each out-of-order merge adds left.length - i inversions." steps={inversionsSteps} initState={[3, 1, 2].map(v => ({ val: v, color: '#dbeafe', border: '#93c5fd' }))} />;
    return null;
};

// ─── Main Component ────────────────────────────────────────────────────────
const SortingPracticeProblems = () => {
    const [selected, setSelected] = useState(problems[0]);
    const [activeLang, setActiveLang] = useState('python');

    return (
        <div style={st.outer}>
            <div style={st.headerWrap}>
                <h2 style={st.heading}>Sorting Practice Problems</h2>
                <p style={st.sub}>Practice common sorting challenges and explore step-by-step animated solutions.</p>
            </div>

            <div style={st.split}>
                {/* ── Left Panel ── */}
                <div style={st.left}>
                    {problems.map(p => (
                        <div
                            key={p.id}
                            onClick={() => { setSelected(p); setActiveLang('python'); }}
                            style={{ ...st.card, boxShadow: selected.id === p.id ? '0 0 0 2px #4f46e5' : '0 4px 10px rgba(0,0,0,0.05)', backgroundColor: selected.id === p.id ? '#f0f1fe' : '#fff' }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                                <span style={{ fontWeight: '800', color: '#1e293b', fontSize: '0.98rem' }}>{p.tag} {p.title}</span>
                                <span style={diffStyle(p.difficulty)}>{p.difficulty}</span>
                            </div>
                            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: 0, lineHeight: '1.5' }}>{p.desc}</p>
                            <button style={{ ...st.viewBtn, marginTop: '10px', backgroundColor: selected.id === p.id ? '#4f46e5' : '#f1f5f9', color: selected.id === p.id ? '#fff' : '#4f46e5' }}>
                                {selected.id === p.id ? '▸ Viewing Solution' : 'View Animated Solution'}
                            </button>
                        </div>
                    ))}
                </div>

                {/* ── Right Panel ── */}
                <div style={st.right}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selected.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25 }}
                        >
                            <div style={st.panel}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                                    <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: '900', color: '#1e293b' }}>{selected.tag} {selected.title}</h3>
                                    <span style={diffStyle(selected.difficulty)}>{selected.difficulty}</span>
                                </div>
                                <p style={{ color: '#64748b', marginBottom: '20px', lineHeight: '1.6', fontSize: '0.95rem' }}>{selected.desc}</p>

                                {/* Visualization */}
                                <VizRouter id={selected.id} />

                                {/* Code */}
                                <div style={{ marginTop: '24px' }}>
                                    <h4 style={{ fontWeight: '800', color: '#1e293b', marginBottom: '12px' }}>Implementation</h4>
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                                        {['python', 'javascript', 'cpp'].map(l => (
                                            <button key={l} onClick={() => setActiveLang(l)} style={{ padding: '5px 14px', borderRadius: '8px', border: activeLang === l ? 'none' : '1px solid #e2e8f0', backgroundColor: activeLang === l ? '#4f46e5' : '#f8fafc', color: activeLang === l ? '#fff' : '#64748b', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>
                                                {l === 'cpp' ? 'C++' : l.toUpperCase()}
                                            </button>
                                        ))}
                                    </div>
                                    <pre style={{ backgroundColor: '#0f172a', color: '#f8fafc', padding: '1.2rem', borderRadius: '14px', overflowX: 'auto', fontSize: '0.85rem', lineHeight: '1.6', fontFamily: 'monospace', margin: 0 }}>
                                        <code>{codes[selected.id]?.[activeLang] || '// Coming soon'}</code>
                                    </pre>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

// ─── Shared vizualizer styles ──────────────────────────────────────────────
const v = {
    wrap: { display: 'flex', flexDirection: 'column', gap: '12px' },
    desc: { fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6', backgroundColor: '#f1f5f9', borderRadius: '10px', padding: '10px 14px' },
    vizArea: { backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', minHeight: '120px' },
    cell: { width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '0.9rem', color: '#1e293b', transition: 'background-color 0.3s, outline 0.2s' },
    msg: { backgroundColor: '#1e293b', color: '#fff', padding: '8px 16px', borderRadius: '10px', fontSize: '0.88rem', fontWeight: '700', textAlign: 'center' },
    legend: { display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', fontSize: '0.85rem' },
    controls: { display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' },
    btn: bg => ({ padding: '8px 16px', borderRadius: '10px', border: 'none', backgroundColor: bg, color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }),
};

// ─── Layout styles ─────────────────────────────────────────────────────────
const st = {
    outer: { fontFamily: 'system-ui, sans-serif', width: '100%' },
    headerWrap: { textAlign: 'center', marginBottom: '28px' },
    heading: { fontSize: '1.8rem', fontWeight: '900', color: '#1e293b', marginBottom: '8px' },
    sub: { fontSize: '1rem', color: '#64748b', margin: 0 },
    split: { display: 'flex', gap: '20px', alignItems: 'flex-start', flexWrap: 'wrap' },
    left: { flex: '0 0 38%', minWidth: '260px', display: 'flex', flexDirection: 'column', gap: '12px' },
    right: { flex: 1, minWidth: '300px' },
    card: { borderRadius: '14px', padding: '16px', cursor: 'pointer', transition: 'box-shadow 0.2s, background-color 0.15s', border: '1px solid #f1f5f9' },
    viewBtn: { padding: '6px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '700', fontSize: '0.82rem', transition: 'all 0.2s' },
    panel: { backgroundColor: '#f8fafc', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0' },
};

export default SortingPracticeProblems;
