import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './GreedyPracticeProblems.css';

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ─── Problem Definitions ───────────────────────────────────────────────────
const GREEDY_PROBLEMS = [
    {
        id: 'activity-selection',
        title: 'Activity Selection Problem',
        difficulty: 'Easy',
        tag: '📅',
        description: 'Given N activities with start and finish times, select the maximum number of non-overlapping activities.',
        example: 'start=[1,3,0,5,8,5] finish=[2,4,6,7,9,9] => 4 activities',
        algorithm: 'Sort activities by finish time. Pick the first activity, then always pick the next activity whose start time ≥ the last selected finish time.',
        python: `def activitySelection(start, finish):
    n = len(start)
    activities = sorted(zip(start, finish),
                        key=lambda x: x[1])
    selected = [activities[0]]
    last_end = activities[0][1]
    
    for i in range(1, n):
        if activities[i][0] >= last_end:
            selected.append(activities[i])
            last_end = activities[i][1]
    
    return selected`,
        javascript: `function activitySelection(start, finish) {
    const acts = start.map((s, i) => ({s, f: finish[i]}));
    acts.sort((a, b) => a.f - b.f);
    
    const selected = [acts[0]];
    let lastEnd = acts[0].f;
    
    for (let i = 1; i < acts.length; i++) {
        if (acts[i].s >= lastEnd) {
            selected.push(acts[i]);
            lastEnd = acts[i].f;
        }
    }
    return selected;
}`,
        cpp: `struct Activity { int start, end; };

vector<Activity> activitySelection(
    vector<Activity>& acts) {
    sort(acts.begin(), acts.end(),
        [](auto& a, auto& b){ return a.end < b.end; });
    
    vector<Activity> res = {acts[0]};
    int lastEnd = acts[0].end;
    
    for (int i = 1; i < acts.size(); i++) {
        if (acts[i].start >= lastEnd) {
            res.push_back(acts[i]);
            lastEnd = acts[i].end;
        }
    }
    return res;
}`
    },
    {
        id: 'min-platforms',
        title: 'Minimum Platforms for Trains',
        difficulty: 'Medium',
        tag: '🚂',
        description: 'Given arrival and departure times of trains, find the minimum number of platforms needed so no train waits.',
        example: 'arr=[9:00,9:40,9:50,11:00] dep=[9:10,12:00,11:20,11:30] => 3',
        algorithm: 'Sort arrivals and departures separately. Use two pointers — when a train arrives before the earliest departure, add a platform; otherwise, free one.',
        python: `def minPlatforms(arr, dep):
    arr.sort()
    dep.sort()
    platforms = 0
    max_plat = 0
    i = j = 0
    
    while i < len(arr) and j < len(dep):
        if arr[i] <= dep[j]:
            platforms += 1
            max_plat = max(max_plat, platforms)
            i += 1
        else:
            platforms -= 1
            j += 1
    
    return max_plat`,
        javascript: `function minPlatforms(arr, dep) {
    arr.sort((a,b) => a-b);
    dep.sort((a,b) => a-b);
    let plat = 0, maxPlat = 0;
    let i = 0, j = 0;
    
    while (i < arr.length && j < dep.length) {
        if (arr[i] <= dep[j]) {
            plat++;
            maxPlat = Math.max(maxPlat, plat);
            i++;
        } else {
            plat--;
            j++;
        }
    }
    return maxPlat;
}`,
        cpp: `int minPlatforms(vector<int>& arr,
    vector<int>& dep) {
    sort(arr.begin(), arr.end());
    sort(dep.begin(), dep.end());
    int plat = 0, maxPlat = 0;
    int i = 0, j = 0;
    
    while (i < arr.size() && j < dep.size()) {
        if (arr[i] <= dep[j]) {
            plat++;
            maxPlat = max(maxPlat, plat);
            i++;
        } else {
            plat--;
            j++;
        }
    }
    return maxPlat;
}`
    },
    {
        id: 'gas-station',
        title: 'Gas Station Circuit',
        difficulty: 'Medium',
        tag: '⛽',
        description: 'There are N gas stations in a circle. You start with an empty tank. Find the starting station to complete the circuit, or return -1.',
        example: 'gas=[1,2,3,4,5] cost=[3,4,5,1,2] => start at station 3',
        algorithm: 'Track total surplus and current surplus. If current goes negative, reset start to next station. If total surplus ≥ 0, a solution exists starting from the reset point.',
        python: `def canCompleteCircuit(gas, cost):
    total = 0
    current = 0
    start = 0
    
    for i in range(len(gas)):
        diff = gas[i] - cost[i]
        total += diff
        current += diff
        if current < 0:
            start = i + 1
            current = 0
    
    return start if total >= 0 else -1`,
        javascript: `function canCompleteCircuit(gas, cost) {
    let total = 0, current = 0, start = 0;
    
    for (let i = 0; i < gas.length; i++) {
        const diff = gas[i] - cost[i];
        total += diff;
        current += diff;
        if (current < 0) {
            start = i + 1;
            current = 0;
        }
    }
    return total >= 0 ? start : -1;
}`,
        cpp: `int canCompleteCircuit(vector<int>& gas,
    vector<int>& cost) {
    int total = 0, current = 0, start = 0;
    
    for (int i = 0; i < gas.size(); i++) {
        int diff = gas[i] - cost[i];
        total += diff;
        current += diff;
        if (current < 0) {
            start = i + 1;
            current = 0;
        }
    }
    return total >= 0 ? start : -1;
}`
    },
    {
        id: 'jump-game',
        title: 'Jump Game',
        difficulty: 'Medium',
        tag: '🦘',
        description: 'Given an array where each element is the max jump length from that position, determine if you can reach the last index.',
        example: 'nums=[2,3,1,1,4] => true; nums=[3,2,1,0,4] => false',
        algorithm: 'Track the farthest reachable index. For each position, if it is reachable, update the farthest reach. If farthest ≥ last index, return true.',
        python: `def canJump(nums):
    farthest = 0
    
    for i in range(len(nums)):
        if i > farthest:
            return False
        farthest = max(farthest, i + nums[i])
    
    return True`,
        javascript: `function canJump(nums) {
    let farthest = 0;
    
    for (let i = 0; i < nums.length; i++) {
        if (i > farthest) return false;
        farthest = Math.max(farthest, i + nums[i]);
    }
    return true;
}`,
        cpp: `bool canJump(vector<int>& nums) {
    int farthest = 0;
    
    for (int i = 0; i < nums.size(); i++) {
        if (i > farthest) return false;
        farthest = max(farthest, i + nums[i]);
    }
    return true;
}`
    },
    {
        id: 'jump-game-ii',
        title: 'Jump Game II',
        difficulty: 'Medium',
        tag: '🏃',
        description: 'Given an array where each element is the max jump length, return the minimum number of jumps to reach the last index.',
        example: 'nums=[2,3,1,1,4] => 2 jumps (0→1→4)',
        algorithm: 'Use a BFS-like greedy approach. Track the current jump range end and the farthest reachable. When you pass the current end, increment jumps.',
        python: `def jump(nums):
    jumps = 0
    current_end = 0
    farthest = 0
    
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == current_end:
            jumps += 1
            current_end = farthest
    
    return jumps`,
        javascript: `function jump(nums) {
    let jumps = 0, curEnd = 0, farthest = 0;
    
    for (let i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        if (i === curEnd) {
            jumps++;
            curEnd = farthest;
        }
    }
    return jumps;
}`,
        cpp: `int jump(vector<int>& nums) {
    int jumps = 0, curEnd = 0, farthest = 0;
    
    for (int i = 0; i < nums.size() - 1; i++) {
        farthest = max(farthest, i + nums[i]);
        if (i == curEnd) {
            jumps++;
            curEnd = farthest;
        }
    }
    return jumps;
}`
    },
    {
        id: 'partition-labels',
        title: 'Partition Labels',
        difficulty: 'Medium',
        tag: '🏷️',
        description: 'Partition a string into as many parts as possible so that each letter appears in at most one part. Return the sizes of the parts.',
        example: '"ababcbacadefegdehijhklij" => [9,7,8]',
        algorithm: 'Record the last occurrence of each character. Iterate and expand the current partition end to the max last-occurrence. When index equals end, cut a partition.',
        python: `def partitionLabels(s):
    last = {c: i for i, c in enumerate(s)}
    result = []
    start = end = 0
    
    for i, c in enumerate(s):
        end = max(end, last[c])
        if i == end:
            result.append(end - start + 1)
            start = i + 1
    
    return result`,
        javascript: `function partitionLabels(s) {
    const last = {};
    for (let i = 0; i < s.length; i++)
        last[s[i]] = i;
    
    const result = [];
    let start = 0, end = 0;
    
    for (let i = 0; i < s.length; i++) {
        end = Math.max(end, last[s[i]]);
        if (i === end) {
            result.push(end - start + 1);
            start = i + 1;
        }
    }
    return result;
}`,
        cpp: `vector<int> partitionLabels(string s) {
    int last[128] = {};
    for (int i = 0; i < s.size(); i++)
        last[s[i]] = i;
    
    vector<int> res;
    int start = 0, end = 0;
    for (int i = 0; i < s.size(); i++) {
        end = max(end, last[s[i]]);
        if (i == end) {
            res.push_back(end - start + 1);
            start = i + 1;
        }
    }
    return res;
}`
    },
    {
        id: 'min-arrows',
        title: 'Minimum Arrows to Burst Balloons',
        difficulty: 'Medium',
        tag: '🎯',
        description: 'Given balloon intervals [start, end], find the minimum number of arrows shot vertically to burst all balloons.',
        example: 'points=[[10,16],[2,8],[1,6],[7,12]] => 2 arrows',
        algorithm: 'Sort by end coordinate. Shoot at the end of the first balloon. Skip all balloons that this arrow bursts. Repeat for remaining.',
        python: `def findMinArrowShots(points):
    points.sort(key=lambda x: x[1])
    arrows = 1
    end = points[0][1]
    
    for i in range(1, len(points)):
        if points[i][0] > end:
            arrows += 1
            end = points[i][1]
    
    return arrows`,
        javascript: `function findMinArrowShots(points) {
    points.sort((a,b) => a[1] - b[1]);
    let arrows = 1;
    let end = points[0][1];
    
    for (let i = 1; i < points.length; i++) {
        if (points[i][0] > end) {
            arrows++;
            end = points[i][1];
        }
    }
    return arrows;
}`,
        cpp: `int findMinArrowShots(
    vector<vector<int>>& points) {
    sort(points.begin(), points.end(),
        [](auto& a, auto& b){ return a[1] < b[1]; });
    
    int arrows = 1;
    int end = points[0][1];
    
    for (int i = 1; i < points.size(); i++) {
        if (points[i][0] > end) {
            arrows++;
            end = points[i][1];
        }
    }
    return arrows;
}`
    },
    {
        id: 'huffman-encoding',
        title: 'Huffman Encoding',
        difficulty: 'Hard',
        tag: '🌳',
        description: 'Given character frequencies, build a Huffman tree and generate optimal prefix-free binary codes for each character.',
        example: 'freq={a:5,b:9,c:12,d:13,e:16,f:45} => variable-length codes',
        algorithm: 'Use a min-heap. Repeatedly extract the two smallest nodes, merge them into a new node with combined frequency, and insert back. Repeat until one node remains.',
        python: `import heapq

def huffmanEncoding(freq):
    heap = [[f, [c, '']] for c, f in freq.items()]
    heapq.heapify(heap)
    
    while len(heap) > 1:
        lo = heapq.heappop(heap)
        hi = heapq.heappop(heap)
        
        for pair in lo[1:]:
            pair[1] = '0' + pair[1]
        for pair in hi[1:]:
            pair[1] = '1' + pair[1]
        
        heapq.heappush(heap,
            [lo[0] + hi[0]] + lo[1:] + hi[1:])
    
    return sorted(heap[0][1:], key=lambda p: p[1])`,
        javascript: `function huffmanEncoding(freq) {
    let heap = Object.entries(freq)
        .map(([c, f]) => ({f, chars: [{c, code: ''}]}));
    heap.sort((a,b) => a.f - b.f);
    
    while (heap.length > 1) {
        const lo = heap.shift();
        const hi = heap.shift();
        
        lo.chars.forEach(p => p.code = '0' + p.code);
        hi.chars.forEach(p => p.code = '1' + p.code);
        
        const merged = {
            f: lo.f + hi.f,
            chars: [...lo.chars, ...hi.chars]
        };
        heap.push(merged);
        heap.sort((a,b) => a.f - b.f);
    }
    return heap[0].chars;
}`,
        cpp: `struct Node {
    int freq; char ch;
    Node *left, *right;
};

struct Compare {
    bool operator()(Node* a, Node* b) {
        return a->freq > b->freq;
    }
};

Node* buildHuffman(map<char,int>& freq) {
    priority_queue<Node*, vector<Node*>,
        Compare> pq;
    for (auto& [c, f] : freq) {
        pq.push(new Node{f, c, nullptr, nullptr});
    }
    while (pq.size() > 1) {
        Node* l = pq.top(); pq.pop();
        Node* r = pq.top(); pq.pop();
        Node* merged = new Node{
            l->freq + r->freq, '\\0', l, r};
        pq.push(merged);
    }
    return pq.top();
}`
    }
];

// ─── Generic Step Visualizer ───────────────────────────────────────────────
const GenericStepViz = ({ title, steps, initState }) => {
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
                            <div style={{ ...v.cell, backgroundColor: item.color || '#F1F5F9', border: `2px solid ${item.border || '#cbd5e1'}`, minWidth: item.label ? '50px' : '40px', fontSize: item.label ? '0.7rem' : '0.9rem' }}>
                                {item.label || item.val}
                            </div>
                        </div>
                    ))}
                </div>
                {curr && <div style={v.msg}>{curr.msg}</div>}
            </div>
            <div style={v.controls}>
                <button onClick={runAnim} disabled={running} style={v.btn('#4F46E5')}>▶ Start Animation</button>
                <button onClick={nextStep} disabled={running || done} style={v.btn('#0891b2')}>⏭ Next Step</button>
                <button onClick={reset} style={v.btn('#ef4444')}>↺ Reset</button>
            </div>
        </div>
    );
};

// ─── Step Data for Visualizations ──────────────────────────────────────────
const activitySteps = [
    { msg: 'Meetings: A(1-2) B(3-4) C(0-6) D(5-7) E(8-9). Sort by finish time.', state: [{ label: 'A 1-2' }, { label: 'B 3-4' }, { label: 'C 0-6' }, { label: 'D 5-7' }, { label: 'E 8-9' }] },
    { msg: 'Select A (finishes first at 2). ✅', state: [{ label: 'A 1-2', color: '#DCFCE7', border: '#22C55E' }, { label: 'B 3-4' }, { label: 'C 0-6' }, { label: 'D 5-7' }, { label: 'E 8-9' }] },
    { msg: 'B starts at 3 ≥ 2. Select B. ✅', state: [{ label: 'A 1-2', color: '#DCFCE7', border: '#22C55E' }, { label: 'B 3-4', color: '#DCFCE7', border: '#22C55E' }, { label: 'C 0-6' }, { label: 'D 5-7' }, { label: 'E 8-9' }] },
    { msg: 'C starts at 0 < 4. Skip C. ❌', state: [{ label: 'A 1-2', color: '#DCFCE7', border: '#22C55E' }, { label: 'B 3-4', color: '#DCFCE7', border: '#22C55E' }, { label: 'C 0-6', color: '#FEE2E2', border: '#EF4444' }, { label: 'D 5-7' }, { label: 'E 8-9' }] },
    { msg: 'D starts at 5 ≥ 4. Select D. ✅ E starts at 8 ≥ 7. Select E. ✅', state: [{ label: 'A', color: '#DCFCE7', border: '#22C55E' }, { label: 'B', color: '#DCFCE7', border: '#22C55E' }, { label: 'C', color: '#FEE2E2', border: '#EF4444' }, { label: 'D', color: '#DCFCE7', border: '#22C55E' }, { label: 'E', color: '#DCFCE7', border: '#22C55E' }] },
];

const platformSteps = [
    { msg: 'Trains arrive: 9:00, 9:40, 9:50. Depart: 9:10, 12:00, 11:20', state: [{ label: 'T1 9:00' }, { label: 'T2 9:40' }, { label: 'T3 9:50' }] },
    { msg: 'T1 arrives. Platforms = 1.', state: [{ label: 'T1', color: '#FEF9C3', border: '#FACC15' }, { label: 'T2' }, { label: 'T3' }] },
    { msg: 'T1 departs at 9:10. T2 arrives at 9:40. Platforms = 1.', state: [{ label: 'T1', color: '#DBEAFE', border: '#3B82F6' }, { label: 'T2', color: '#FEF9C3', border: '#FACC15' }, { label: 'T3' }] },
    { msg: 'T3 arrives at 9:50. T2 still here. Platforms = 2. Max = 2.', state: [{ label: 'T1', color: '#DBEAFE', border: '#3B82F6' }, { label: 'T2', color: '#DCFCE7', border: '#22C55E' }, { label: 'T3', color: '#DCFCE7', border: '#22C55E' }] },
];

const gasSteps = [
    { msg: 'Gas=[1,2,3,4,5] Cost=[3,4,5,1,2]. Try station 0.', state: [{ label: 'S0', color: '#FEF9C3', border: '#FACC15' }, { label: 'S1' }, { label: 'S2' }, { label: 'S3' }, { label: 'S4' }] },
    { msg: 'S0: 1-3=-2 < 0. Reset. Try station 1.', state: [{ label: 'S0', color: '#FEE2E2', border: '#EF4444' }, { label: 'S1', color: '#FEF9C3', border: '#FACC15' }, { label: 'S2' }, { label: 'S3' }, { label: 'S4' }] },
    { msg: 'S1: -2, S2: -2. Reset. Try station 3.', state: [{ label: 'S0', color: '#FEE2E2', border: '#EF4444' }, { label: 'S1', color: '#FEE2E2', border: '#EF4444' }, { label: 'S2', color: '#FEE2E2', border: '#EF4444' }, { label: 'S3', color: '#FEF9C3', border: '#FACC15' }, { label: 'S4' }] },
    { msg: '✅ Starting at S3: surplus stays positive! Total ≥ 0.', state: [{ label: 'S0' }, { label: 'S1' }, { label: 'S2' }, { label: 'S3', color: '#DCFCE7', border: '#22C55E' }, { label: 'S4', color: '#DCFCE7', border: '#22C55E' }] },
];

const jumpSteps = [
    { msg: 'nums=[2,3,1,1,4]. Start at index 0, farthest=0.', state: [{ val: 2, color: '#FEF9C3', border: '#FACC15' }, { val: 3 }, { val: 1 }, { val: 1 }, { val: 4 }] },
    { msg: 'i=0: farthest = max(0, 0+2) = 2.', state: [{ val: 2, color: '#DCFCE7', border: '#22C55E' }, { val: 3, color: '#FEF9C3', border: '#FACC15' }, { val: 1, color: '#FEF9C3', border: '#FACC15' }, { val: 1 }, { val: 4 }] },
    { msg: 'i=1: farthest = max(2, 1+3) = 4. Reached end!', state: [{ val: 2, color: '#DCFCE7', border: '#22C55E' }, { val: 3, color: '#DCFCE7', border: '#22C55E' }, { val: 1, color: '#DCFCE7', border: '#22C55E' }, { val: 1, color: '#DCFCE7', border: '#22C55E' }, { val: 4, color: '#DCFCE7', border: '#22C55E' }] },
];

const jumpIISteps = [
    { msg: 'nums=[2,3,1,1,4]. jumps=0, curEnd=0, farthest=0.', state: [{ val: 2, color: '#FEF9C3', border: '#FACC15' }, { val: 3 }, { val: 1 }, { val: 1 }, { val: 4 }] },
    { msg: 'i=0: farthest=2. i==curEnd → jump! jumps=1, curEnd=2.', state: [{ val: 2, color: '#DCFCE7', border: '#22C55E' }, { val: 3, color: '#FEF9C3', border: '#FACC15' }, { val: 1, color: '#FEF9C3', border: '#FACC15' }, { val: 1 }, { val: 4 }] },
    { msg: 'i=1: farthest=4. i=2: i==curEnd → jump! jumps=2.', state: [{ val: 2, color: '#DBEAFE', border: '#3B82F6' }, { val: 3, color: '#DCFCE7', border: '#22C55E' }, { val: 1, color: '#DCFCE7', border: '#22C55E' }, { val: 1, color: '#FEF9C3', border: '#FACC15' }, { val: 4, color: '#FEF9C3', border: '#FACC15' }] },
    { msg: '✅ Reached end in 2 jumps! (0→1→4)', state: [{ val: 2, color: '#DBEAFE', border: '#3B82F6' }, { val: 3, color: '#DCFCE7', border: '#22C55E' }, { val: 1 }, { val: 1 }, { val: 4, color: '#DCFCE7', border: '#22C55E' }] },
];

const partitionSteps = [
    { msg: '"ababcbacadefegdehijhklij". Record last occurrences.', state: 'ababcbaca'.split('').map(c => ({ label: c })) },
    { msg: 'Scan: "a" last@8. Expand end to 8.', state: [{ label: 'a', color: '#FEF9C3', border: '#FACC15' }, { label: 'b' }, { label: 'a' }, { label: 'b' }, { label: 'c' }, { label: 'b' }, { label: 'a' }, { label: 'c' }, { label: 'a' }] },
    { msg: 'i reaches 8. Cut partition! Size = 9. ✅', state: [{ label: 'a', color: '#DCFCE7', border: '#22C55E' }, { label: 'b', color: '#DCFCE7', border: '#22C55E' }, { label: 'a', color: '#DCFCE7', border: '#22C55E' }, { label: 'b', color: '#DCFCE7', border: '#22C55E' }, { label: 'c', color: '#DCFCE7', border: '#22C55E' }, { label: 'b', color: '#DCFCE7', border: '#22C55E' }, { label: 'a', color: '#DCFCE7', border: '#22C55E' }, { label: 'c', color: '#DCFCE7', border: '#22C55E' }, { label: 'a', color: '#DCFCE7', border: '#22C55E' }] },
    { msg: '✅ Partitions: [9, 7, 8]', state: [{ label: 'Part1=9', color: '#DCFCE7', border: '#22C55E' }, { label: 'Part2=7', color: '#DBEAFE', border: '#3B82F6' }, { label: 'Part3=8', color: '#EDE9FE', border: '#8B5CF6' }] },
];

const arrowSteps = [
    { msg: 'Balloons: [1,6],[2,8],[7,12],[10,16]. Sort by end.', state: [{ label: '[1,6]' }, { label: '[2,8]' }, { label: '[7,12]' }, { label: '[10,16]' }] },
    { msg: 'Arrow at x=6. Bursts [1,6] and [2,8]. ✅', state: [{ label: '[1,6]', color: '#DCFCE7', border: '#22C55E' }, { label: '[2,8]', color: '#DCFCE7', border: '#22C55E' }, { label: '[7,12]' }, { label: '[10,16]' }] },
    { msg: '[7,12] starts at 7 > 6. New arrow at x=12. Bursts [7,12] and [10,16].', state: [{ label: '[1,6]', color: '#DCFCE7', border: '#22C55E' }, { label: '[2,8]', color: '#DCFCE7', border: '#22C55E' }, { label: '[7,12]', color: '#DCFCE7', border: '#22C55E' }, { label: '[10,16]', color: '#DCFCE7', border: '#22C55E' }] },
    { msg: '✅ Total arrows = 2!', state: [{ label: '🏹 x=6', color: '#DBEAFE', border: '#3B82F6' }, { label: '🏹 x=12', color: '#DBEAFE', border: '#3B82F6' }] },
];

const huffmanSteps = [
    { msg: 'Frequencies: a:5, b:9, c:12, d:13. Build min-heap.', state: [{ label: 'a:5' }, { label: 'b:9' }, { label: 'c:12' }, { label: 'd:13' }] },
    { msg: 'Merge a(5) + b(9) = 14. Insert back.', state: [{ label: 'c:12', color: '#FEF9C3', border: '#FACC15' }, { label: 'd:13', color: '#FEF9C3', border: '#FACC15' }, { label: 'ab:14', color: '#DCFCE7', border: '#22C55E' }] },
    { msg: 'Merge c(12) + d(13) = 25. Insert back.', state: [{ label: 'ab:14', color: '#DCFCE7', border: '#22C55E' }, { label: 'cd:25', color: '#DCFCE7', border: '#22C55E' }] },
    { msg: '✅ Merge ab(14) + cd(25) = root(39). Tree complete!', state: [{ label: 'root:39', color: '#DBEAFE', border: '#3B82F6' }] },
];

const vizData = {
    'activity-selection': { title: 'Activity Selection — Timeline', steps: activitySteps },
    'min-platforms': { title: 'Minimum Platforms — Train Timeline', steps: platformSteps },
    'gas-station': { title: 'Gas Station — Circular Route', steps: gasSteps },
    'jump-game': { title: 'Jump Game — Reachable Positions', steps: jumpSteps },
    'jump-game-ii': { title: 'Jump Game II — Min Jumps', steps: jumpIISteps },
    'partition-labels': { title: 'Partition Labels — String Segments', steps: partitionSteps },
    'min-arrows': { title: 'Minimum Arrows — Balloon Intervals', steps: arrowSteps },
    'huffman-encoding': { title: 'Huffman Encoding — Tree Building', steps: huffmanSteps },
};

const VizRouter = ({ id }) => {
    const d = vizData[id];
    if (!d) return null;
    return <GenericStepViz title={d.title} steps={d.steps} initState={d.steps[0].state} />;
};

const getDifficultyColor = (diff) => {
    switch (diff) {
        case 'Easy': return '#22C55E';
        case 'Medium': return '#F59E0B';
        case 'Hard': return '#EF4444';
        default: return '#64748B';
    }
};

// ─── Main Component ────────────────────────────────────────────────────────
const GreedyPracticeProblems = () => {
    const [activeProblem, setActiveProblem] = useState(null);
    const [activeLang, setActiveLang] = useState('javascript');

    return (
        <div className="greedy-container">
            <div className="greedy-split-layout">

                {/* Left Panel: Problem List */}
                <div className="greedy-left-panel">
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: '1.5rem', color: '#1E293B', fontWeight: '800' }}>Practice Problems</h3>
                        <p style={{ margin: 0, color: '#64748B', fontSize: '1rem', lineHeight: '1.5' }}>
                            Practice classic greedy algorithm challenges with animated solutions.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
                        {GREEDY_PROBLEMS.map((prob) => (
                            <motion.div
                                key={prob.id}
                                onClick={() => { setActiveProblem(prob); setActiveLang('javascript'); }}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    background: 'white',
                                    borderRadius: '14px',
                                    padding: '16px',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                                    cursor: 'pointer',
                                    border: activeProblem?.id === prob.id ? '2px solid #4F46E5' : '2px solid transparent',
                                    transition: 'border 0.2s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h4 style={{ margin: 0, color: '#1E293B', fontSize: '1.1rem', fontWeight: 'bold' }}>{prob.tag} {prob.title}</h4>
                                    <span style={{
                                        background: getDifficultyColor(prob.difficulty) + '20',
                                        color: getDifficultyColor(prob.difficulty),
                                        padding: '4px 10px',
                                        borderRadius: '999px',
                                        fontSize: '0.8rem',
                                        fontWeight: '700'
                                    }}>
                                        {prob.difficulty}
                                    </span>
                                </div>
                                <p style={{ margin: 0, color: '#64748B', fontSize: '0.9rem', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {prob.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Panel: Animated Solution Viewer */}
                <div className="greedy-right-panel">
                    <AnimatePresence mode="wait">
                        {activeProblem ? (
                            <motion.div
                                key={activeProblem.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="greedy-solution-viewer"
                            >
                                <div style={{ borderBottom: '2px solid #F1F5F9', paddingBottom: '20px', marginBottom: '20px' }}>
                                    <h2 style={{ margin: '0 0 10px 0', fontSize: '1.8rem', color: '#1E293B', fontWeight: '800' }}>
                                        {activeProblem.tag} {activeProblem.title}
                                    </h2>
                                    <p style={{ margin: '0 0 16px 0', color: '#475569', fontSize: '1.05rem', lineHeight: '1.6' }}>
                                        {activeProblem.description}
                                    </p>
                                    <div style={{ background: '#F8FAFC', padding: '12px 16px', borderRadius: '8px', borderLeft: '4px solid #4F46E5' }}>
                                        <span style={{ fontWeight: 'bold', color: '#1E293B' }}>Example: </span>
                                        <code style={{ color: '#4F46E5', fontFamily: 'monospace', fontSize: '0.95rem' }}>{activeProblem.example}</code>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '24px' }}>
                                    <h3 style={{ margin: '0 0 16px 0', fontSize: '1.3rem', color: '#1E293B' }}>Visualization & Animation</h3>
                                    <div style={{ background: '#F8FAFC', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' }}>
                                        <VizRouter id={activeProblem.id} />
                                    </div>
                                </div>

                                <div style={{ marginBottom: '24px' }}>
                                    <h3 style={{ margin: '0 0 12px 0', fontSize: '1.3rem', color: '#1E293B' }}>Algorithm Approach</h3>
                                    <div style={{ background: '#EEF2FF', color: '#312E81', padding: '16px', borderRadius: '12px', fontSize: '1rem', lineHeight: '1.6' }}>
                                        💡 {activeProblem.algorithm}
                                    </div>
                                </div>

                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                                        <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#1E293B' }}>Solution Code</h3>
                                        <div style={{ display: 'flex', gap: '8px', background: '#F1F5F9', padding: '4px', borderRadius: '10px' }}>
                                            {['python', 'javascript', 'cpp'].map(l => (
                                                <button
                                                    key={l}
                                                    onClick={() => setActiveLang(l)}
                                                    style={{
                                                        padding: '6px 14px',
                                                        borderRadius: '6px',
                                                        border: 'none',
                                                        fontWeight: '600',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s',
                                                        fontSize: '0.85rem',
                                                        background: activeLang === l ? '#fff' : 'transparent',
                                                        color: activeLang === l ? '#4F46E5' : '#64748B',
                                                        boxShadow: activeLang === l ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
                                                    }}
                                                >
                                                    {l === 'cpp' ? 'C++' : l.charAt(0).toUpperCase() + l.slice(1)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <pre style={{
                                        background: '#0F172A',
                                        color: '#E2E8F0',
                                        padding: '20px',
                                        borderRadius: '12px',
                                        overflowX: 'auto',
                                        fontSize: '0.95rem',
                                        lineHeight: '1.6',
                                        margin: 0,
                                        fontFamily: '"Fira Code", monospace',
                                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                                    }}>
                                        <code>{activeProblem[activeLang]}</code>
                                    </pre>
                                </div>

                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94A3B8' }}
                            >
                                <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🏆</div>
                                <h3 style={{ margin: 0 }}>Select a problem to view its solution</h3>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
};

// ─── Shared Visualizer styles ──────────────────────────────────────────────
const v = {
    wrap: { display: 'flex', flexDirection: 'column', gap: '12px' },
    desc: { fontSize: '0.9rem', color: '#64748B', lineHeight: '1.6', backgroundColor: '#F1F5F9', borderRadius: '10px', padding: '10px 14px' },
    vizArea: { backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', minHeight: '120px' },
    cell: { width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '0.9rem', color: '#1E293B', transition: 'background-color 0.3s, outline 0.2s' },
    msg: { backgroundColor: '#1E293B', color: '#fff', padding: '8px 16px', borderRadius: '10px', fontSize: '0.88rem', fontWeight: '700', textAlign: 'center' },
    controls: { display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' },
    btn: bg => ({ padding: '8px 16px', borderRadius: '10px', border: 'none', backgroundColor: bg, color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }),
};

export default GreedyPracticeProblems;
