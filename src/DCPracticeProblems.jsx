import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './DCPracticeProblems.css';

const sleep = ms => new Promise(r => setTimeout(r, ms));

const DC_PROBLEMS = [
    {
        id: 'max-subarray',
        title: 'Maximum Subarray',
        difficulty: 'Medium',
        tag: '📊',
        description: 'Find the contiguous subarray within an array that has the largest sum. Use D&C: divide, find max in left/right halves, and max crossing subarray.',
        example: '[-2,1,-3,4,-1,2,1,-5,4] => 6 (subarray [4,-1,2,1])',
        algorithm: 'Divide the array at the midpoint. Recursively find the max subarray in the left and right halves. Also compute the max crossing subarray spanning the midpoint. Return the max of all three.',
        python: `def maxSubArray(nums):
    def helper(lo, hi):
        if lo == hi: return nums[lo]
        mid = (lo + hi) // 2
        left = helper(lo, mid)
        right = helper(mid + 1, hi)
        
        left_sum = float('-inf')
        s = 0
        for i in range(mid, lo - 1, -1):
            s += nums[i]
            left_sum = max(left_sum, s)
        right_sum = float('-inf')
        s = 0
        for i in range(mid + 1, hi + 1):
            s += nums[i]
            right_sum = max(right_sum, s)
        
        return max(left, right, left_sum + right_sum)
    return helper(0, len(nums) - 1)`,
        javascript: `function maxSubArray(nums) {
    function helper(lo, hi) {
        if (lo === hi) return nums[lo];
        const mid = Math.floor((lo + hi) / 2);
        const left = helper(lo, mid);
        const right = helper(mid + 1, hi);
        
        let leftSum = -Infinity, s = 0;
        for (let i = mid; i >= lo; i--) {
            s += nums[i];
            leftSum = Math.max(leftSum, s);
        }
        let rightSum = -Infinity;
        s = 0;
        for (let i = mid+1; i <= hi; i++) {
            s += nums[i];
            rightSum = Math.max(rightSum, s);
        }
        return Math.max(left, right,
            leftSum + rightSum);
    }
    return helper(0, nums.length - 1);
}`,
        cpp: `int maxSubArray(vector<int>& a, int lo, int hi) {
    if (lo == hi) return a[lo];
    int mid = (lo + hi) / 2;
    int left = maxSubArray(a, lo, mid);
    int right = maxSubArray(a, mid+1, hi);
    int lSum = INT_MIN, rSum = INT_MIN, s = 0;
    for (int i = mid; i >= lo; i--) {
        s += a[i]; lSum = max(lSum, s);
    }
    s = 0;
    for (int i = mid+1; i <= hi; i++) {
        s += a[i]; rSum = max(rSum, s);
    }
    return max({left, right, lSum + rSum});
}`
    },
    {
        id: 'merge-k-sorted',
        title: 'Merge K Sorted Lists',
        difficulty: 'Hard',
        tag: '🔗',
        description: 'Merge k sorted linked lists into one sorted list. Use divide-and-conquer to repeatedly merge pairs of lists.',
        example: 'lists = [[1,4,5],[1,3,4],[2,6]] => [1,1,2,3,4,4,5,6]',
        algorithm: 'Pair up k lists and merge each pair. Repeat until one list remains. Each merge is O(n), and we do O(log k) rounds, giving O(n log k) total.',
        python: `def mergeKLists(lists):
    if not lists: return None
    
    def merge(l1, l2):
        dummy = ListNode(0)
        curr = dummy
        while l1 and l2:
            if l1.val <= l2.val:
                curr.next = l1; l1 = l1.next
            else:
                curr.next = l2; l2 = l2.next
            curr = curr.next
        curr.next = l1 or l2
        return dummy.next
    
    while len(lists) > 1:
        merged = []
        for i in range(0, len(lists), 2):
            l1 = lists[i]
            l2 = lists[i+1] if i+1 < len(lists) else None
            merged.append(merge(l1, l2))
        lists = merged
    return lists[0]`,
        javascript: `function mergeKLists(lists) {
    if (!lists.length) return null;
    
    function merge(l1, l2) {
        const dummy = { val: 0, next: null };
        let curr = dummy;
        while (l1 && l2) {
            if (l1.val <= l2.val) {
                curr.next = l1; l1 = l1.next;
            } else {
                curr.next = l2; l2 = l2.next;
            }
            curr = curr.next;
        }
        curr.next = l1 || l2;
        return dummy.next;
    }
    
    while (lists.length > 1) {
        const merged = [];
        for (let i = 0; i < lists.length; i += 2) {
            const l2 = i+1 < lists.length
                ? lists[i+1] : null;
            merged.push(merge(lists[i], l2));
        }
        lists = merged;
    }
    return lists[0];
}`,
        cpp: `ListNode* mergeKLists(vector<ListNode*>& lists) {
    if (lists.empty()) return nullptr;
    
    auto merge = [](ListNode* l1, ListNode* l2) {
        ListNode dummy(0), *curr = &dummy;
        while (l1 && l2) {
            if (l1->val <= l2->val) {
                curr->next = l1; l1 = l1->next;
            } else {
                curr->next = l2; l2 = l2->next;
            }
            curr = curr->next;
        }
        curr->next = l1 ? l1 : l2;
        return dummy.next;
    };
    
    while (lists.size() > 1) {
        vector<ListNode*> merged;
        for (int i=0; i<lists.size(); i+=2) {
            auto l2 = i+1<lists.size()
                ? lists[i+1] : nullptr;
            merged.push_back(merge(lists[i], l2));
        }
        lists = merged;
    }
    return lists[0];
}`
    },
    {
        id: 'kth-smallest',
        title: 'Kth Smallest Element',
        difficulty: 'Medium',
        tag: '🎯',
        description: 'Find the kth smallest element in an unsorted array using the QuickSelect algorithm (D&C variant of Quick Sort).',
        example: 'nums=[3,2,1,5,6,4], k=2 => 2',
        algorithm: 'Partition around a pivot. If pivot is at position k-1, return it. If k-1 is less, recurse left. Otherwise recurse right. Average O(n).',
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
    
    def select(lo, hi, k):
        if lo == hi: return nums[lo]
        p = partition(lo, hi)
        if p == k: return nums[p]
        elif k < p: return select(lo, p - 1, k)
        else: return select(p + 1, hi, k)
    
    return select(0, len(nums) - 1, k - 1)`,
        javascript: `function findKthSmallest(nums, k) {
    function partition(lo, hi) {
        const pivot = nums[hi];
        let i = lo;
        for (let j = lo; j < hi; j++) {
            if (nums[j] <= pivot) {
                [nums[i], nums[j]] = [nums[j], nums[i]];
                i++;
            }
        }
        [nums[i], nums[hi]] = [nums[hi], nums[i]];
        return i;
    }
    
    function select(lo, hi, k) {
        if (lo === hi) return nums[lo];
        const p = partition(lo, hi);
        if (p === k) return nums[p];
        else if (k < p) return select(lo, p-1, k);
        else return select(p+1, hi, k);
    }
    return select(0, nums.length - 1, k - 1);
}`,
        cpp: `int findKthSmallest(vector<int>& nums, int k) {
    function<int(int,int,int)> select =
        [&](int lo, int hi, int k) -> int {
        if (lo == hi) return nums[lo];
        int pivot = nums[hi], i = lo;
        for (int j = lo; j < hi; j++)
            if (nums[j] <= pivot)
                swap(nums[i++], nums[j]);
        swap(nums[i], nums[hi]);
        if (i == k) return nums[i];
        return k < i ? select(lo, i-1, k)
                     : select(i+1, hi, k);
    };
    return select(0, nums.size()-1, k-1);
}`
    },
    {
        id: 'closest-pair',
        title: 'Closest Pair of Points',
        difficulty: 'Hard',
        tag: '📍',
        description: 'Given n points in 2D, find the pair with the smallest Euclidean distance using divide-and-conquer.',
        example: 'points = [(2,3),(12,30),(40,50),(5,1),(12,10),(3,4)] => 1.41',
        algorithm: 'Sort points by x. Divide at midpoint. Recursively find closest pair in each half. Then check the strip within min distance of the dividing line.',
        python: `def closest_pair(points):
    points.sort()
    return _closest(points)

def _closest(pts):
    n = len(pts)
    if n <= 3:
        return brute_force(pts)
    mid = n // 2
    mid_x = pts[mid][0]
    dl = _closest(pts[:mid])
    dr = _closest(pts[mid:])
    d = min(dl, dr)
    strip = [p for p in pts
             if abs(p[0] - mid_x) < d]
    strip.sort(key=lambda p: p[1])
    for i in range(len(strip)):
        j = i + 1
        while j < len(strip) and \\
              strip[j][1] - strip[i][1] < d:
            d = min(d, dist(strip[i], strip[j]))
            j += 1
    return d`,
        javascript: `function closestPair(points) {
    points.sort((a, b) => a[0] - b[0]);
    return closest(points);
}

function closest(pts) {
    if (pts.length <= 3) return bruteForce(pts);
    const mid = Math.floor(pts.length / 2);
    const midX = pts[mid][0];
    const dl = closest(pts.slice(0, mid));
    const dr = closest(pts.slice(mid));
    let d = Math.min(dl, dr);
    const strip = pts
        .filter(p => Math.abs(p[0] - midX) < d)
        .sort((a, b) => a[1] - b[1]);
    for (let i = 0; i < strip.length; i++)
        for (let j = i+1; j < strip.length &&
             strip[j][1]-strip[i][1] < d; j++)
            d = Math.min(d, dist(strip[i],strip[j]));
    return d;
}`,
        cpp: `double closestPair(vector<pair<int,int>>& pts,
    int l, int r) {
    if (r - l < 3) return bruteForce(pts, l, r);
    int mid = (l + r) / 2;
    int midX = pts[mid].first;
    double dl = closestPair(pts, l, mid);
    double dr = closestPair(pts, mid+1, r);
    double d = min(dl, dr);
    vector<pair<int,int>> strip;
    for (int i = l; i <= r; i++)
        if (abs(pts[i].first - midX) < d)
            strip.push_back(pts[i]);
    sort(strip.begin(), strip.end(),
        [](auto& a, auto& b) {
            return a.second < b.second; });
    for (int i = 0; i < strip.size(); i++)
        for (int j = i+1; j < strip.size() &&
             strip[j].second-strip[i].second < d; j++)
            d = min(d, dist(strip[i], strip[j]));
    return d;
}`
    },
    {
        id: 'count-inversions',
        title: 'Count Inversions',
        difficulty: 'Hard',
        tag: '🔄',
        description: 'Count the number of inversions in an array (pairs where i < j but arr[i] > arr[j]). Use modified merge sort.',
        example: 'arr=[2,4,1,3,5] => 3 inversions: (2,1),(4,1),(4,3)',
        algorithm: 'Modified merge sort: while merging, when a right element is placed before remaining left elements, add the count of remaining left elements to inversions.',
        python: `def countInversions(arr):
    if len(arr) <= 1: return arr, 0
    mid = len(arr) // 2
    left, left_inv = countInversions(arr[:mid])
    right, right_inv = countInversions(arr[mid:])
    merged, split_inv = mergeCount(left, right)
    return merged, left_inv + right_inv + split_inv

def mergeCount(left, right):
    result, inv = [], 0
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j])
            inv += len(left) - i
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result, inv`,
        javascript: `function countInversions(arr) {
    if (arr.length <= 1) return { arr, inv: 0 };
    const mid = Math.floor(arr.length / 2);
    const left = countInversions(arr.slice(0, mid));
    const right = countInversions(arr.slice(mid));
    
    const merged = [], result = { inv:
        left.inv + right.inv };
    let i = 0, j = 0;
    while (i < left.arr.length &&
           j < right.arr.length) {
        if (left.arr[i] <= right.arr[j]) {
            merged.push(left.arr[i++]);
        } else {
            merged.push(right.arr[j++]);
            result.inv += left.arr.length - i;
        }
    }
    result.arr = merged
        .concat(left.arr.slice(i))
        .concat(right.arr.slice(j));
    return result;
}`,
        cpp: `long long mergeCount(vector<int>& arr,
    int l, int mid, int r) {
    vector<int> left(arr.begin()+l,
        arr.begin()+mid+1);
    vector<int> right(arr.begin()+mid+1,
        arr.begin()+r+1);
    long long inv = 0;
    int i=0, j=0, k=l;
    while (i<left.size() && j<right.size()) {
        if (left[i] <= right[j])
            arr[k++] = left[i++];
        else {
            arr[k++] = right[j++];
            inv += left.size() - i;
        }
    }
    while (i<left.size()) arr[k++] = left[i++];
    while (j<right.size()) arr[k++] = right[j++];
    return inv;
}`
    },
    {
        id: 'skyline',
        title: 'Skyline Problem',
        difficulty: 'Hard',
        tag: '🏙️',
        description: 'Given building dimensions [left, right, height], compute the city skyline contour using divide-and-conquer.',
        example: 'buildings=[[2,9,10],[3,7,15],[5,12,12]] => contour points',
        algorithm: 'Divide buildings into two halves. Recursively compute each skyline. Merge two skylines by sweeping left-to-right, tracking the max height at each x.',
        python: `def getSkyline(buildings):
    if not buildings: return []
    if len(buildings) == 1:
        l, r, h = buildings[0]
        return [[l, h], [r, 0]]
    
    mid = len(buildings) // 2
    left = getSkyline(buildings[:mid])
    right = getSkyline(buildings[mid:])
    return mergeSkylines(left, right)

def mergeSkylines(left, right):
    result = []
    h1 = h2 = 0
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i][0] < right[j][0]:
            h1 = left[i][1]; x = left[i][0]; i += 1
        elif left[i][0] > right[j][0]:
            h2 = right[j][1]; x = right[j][0]; j += 1
        else:
            h1 = left[i][1]; h2 = right[j][1]
            x = left[i][0]; i += 1; j += 1
        maxH = max(h1, h2)
        if not result or result[-1][1] != maxH:
            result.append([x, maxH])
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
        javascript: `function getSkyline(buildings) {
    if (!buildings.length) return [];
    if (buildings.length === 1) {
        const [l, r, h] = buildings[0];
        return [[l, h], [r, 0]];
    }
    const mid = Math.floor(buildings.length / 2);
    const left = getSkyline(buildings.slice(0, mid));
    const right = getSkyline(buildings.slice(mid));
    return mergeSkylines(left, right);
}

function mergeSkylines(left, right) {
    const result = [];
    let h1 = 0, h2 = 0, i = 0, j = 0;
    while (i < left.length && j < right.length) {
        let x;
        if (left[i][0] < right[j][0]) {
            h1 = left[i][1]; x = left[i++][0];
        } else if (left[i][0] > right[j][0]) {
            h2 = right[j][1]; x = right[j++][0];
        } else {
            h1 = left[i][1]; h2 = right[j][1];
            x = left[i++][0]; j++;
        }
        const maxH = Math.max(h1, h2);
        if (!result.length ||
            result[result.length-1][1] !== maxH)
            result.push([x, maxH]);
    }
    return result
        .concat(left.slice(i))
        .concat(right.slice(j));
}`,
        cpp: `vector<vector<int>> getSkyline(
    vector<vector<int>>& buildings) {
    if (buildings.empty()) return {};
    if (buildings.size() == 1) {
        return {{buildings[0][0], buildings[0][2]},
                {buildings[0][1], 0}};
    }
    int mid = buildings.size() / 2;
    vector<vector<int>> l(buildings.begin(),
        buildings.begin() + mid);
    vector<vector<int>> r(buildings.begin() + mid,
        buildings.end());
    auto left = getSkyline(l);
    auto right = getSkyline(r);
    return mergeSkylines(left, right);
}`
    },
    {
        id: 'median-sorted',
        title: 'Median of Two Sorted Arrays',
        difficulty: 'Hard',
        tag: '📐',
        description: 'Find the median of two sorted arrays in O(log(min(m,n))) time using binary search (a D&C approach).',
        example: 'nums1=[1,3], nums2=[2] => 2.0',
        algorithm: 'Binary search on the smaller array. Partition both arrays such that left halves combined have the correct number of elements, and max(left) ≤ min(right).',
        python: `def findMedian(nums1, nums2):
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    m, n = len(nums1), len(nums2)
    lo, hi = 0, m
    
    while lo <= hi:
        i = (lo + hi) // 2
        j = (m + n + 1) // 2 - i
        
        left1 = nums1[i-1] if i > 0 else float('-inf')
        right1 = nums1[i] if i < m else float('inf')
        left2 = nums2[j-1] if j > 0 else float('-inf')
        right2 = nums2[j] if j < n else float('inf')
        
        if left1 <= right2 and left2 <= right1:
            if (m + n) % 2 == 0:
                return (max(left1,left2) +
                        min(right1,right2)) / 2
            return max(left1, left2)
        elif left1 > right2: hi = i - 1
        else: lo = i + 1`,
        javascript: `function findMedian(nums1, nums2) {
    if (nums1.length > nums2.length)
        [nums1, nums2] = [nums2, nums1];
    const m = nums1.length, n = nums2.length;
    let lo = 0, hi = m;
    
    while (lo <= hi) {
        const i = Math.floor((lo + hi) / 2);
        const j = Math.floor((m+n+1)/2) - i;
        
        const l1 = i > 0 ? nums1[i-1] : -Infinity;
        const r1 = i < m ? nums1[i] : Infinity;
        const l2 = j > 0 ? nums2[j-1] : -Infinity;
        const r2 = j < n ? nums2[j] : Infinity;
        
        if (l1 <= r2 && l2 <= r1) {
            if ((m+n) % 2 === 0)
                return (Math.max(l1,l2) +
                        Math.min(r1,r2)) / 2;
            return Math.max(l1, l2);
        } else if (l1 > r2) hi = i - 1;
        else lo = i + 1;
    }
}`,
        cpp: `double findMedian(vector<int>& a, vector<int>& b) {
    if (a.size() > b.size()) swap(a, b);
    int m = a.size(), n = b.size();
    int lo = 0, hi = m;
    while (lo <= hi) {
        int i = (lo + hi) / 2;
        int j = (m + n + 1) / 2 - i;
        int l1 = i > 0 ? a[i-1] : INT_MIN;
        int r1 = i < m ? a[i] : INT_MAX;
        int l2 = j > 0 ? b[j-1] : INT_MIN;
        int r2 = j < n ? b[j] : INT_MAX;
        if (l1 <= r2 && l2 <= r1) {
            if ((m+n)%2==0)
                return (max(l1,l2)+min(r1,r2))/2.0;
            return max(l1, l2);
        } else if (l1 > r2) hi = i - 1;
        else lo = i + 1;
    }
    return 0;
}`
    },
    {
        id: 'karatsuba',
        title: 'Karatsuba Multiplication',
        difficulty: 'Hard',
        tag: '✖️',
        description: 'Multiply two large numbers faster than O(n²) using Karatsuba\'s divide-and-conquer method with only 3 recursive multiplications.',
        example: '1234 × 5678 = 7006652',
        algorithm: 'Split each number into two halves. Compute three products: ac, bd, and (a+b)(c+d). Combine: ac×10^n + ((a+b)(c+d) - ac - bd)×10^(n/2) + bd.',
        python: `def karatsuba(x, y):
    if x < 10 or y < 10:
        return x * y
    
    n = max(len(str(x)), len(str(y)))
    m = n // 2
    
    high1 = x // 10**m
    low1 = x % 10**m
    high2 = y // 10**m
    low2 = y % 10**m
    
    z0 = karatsuba(low1, low2)
    z2 = karatsuba(high1, high2)
    z1 = karatsuba(low1 + high1, low2 + high2)
    
    return z2 * 10**(2*m) + \\
           (z1 - z2 - z0) * 10**m + z0`,
        javascript: `function karatsuba(x, y) {
    if (x < 10 || y < 10) return x * y;
    
    const n = Math.max(
        String(x).length, String(y).length);
    const m = Math.floor(n / 2);
    const pow = 10 ** m;
    
    const high1 = Math.floor(x / pow);
    const low1 = x % pow;
    const high2 = Math.floor(y / pow);
    const low2 = y % pow;
    
    const z0 = karatsuba(low1, low2);
    const z2 = karatsuba(high1, high2);
    const z1 = karatsuba(
        low1 + high1, low2 + high2);
    
    return z2 * 10**(2*m)
        + (z1 - z2 - z0) * pow + z0;
}`,
        cpp: `long long karatsuba(long long x, long long y) {
    if (x < 10 || y < 10) return x * y;
    
    int n = max(to_string(x).size(),
                to_string(y).size());
    int m = n / 2;
    long long pw = (long long)pow(10, m);
    
    long long h1 = x / pw, l1 = x % pw;
    long long h2 = y / pw, l2 = y % pw;
    
    long long z0 = karatsuba(l1, l2);
    long long z2 = karatsuba(h1, h2);
    long long z1 = karatsuba(l1+h1, l2+h2);
    
    return z2 * (long long)pow(10, 2*m)
        + (z1 - z2 - z0) * pw + z0;
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

// ─── Step Data ─────────────────────────────────────────────────────────────
const maxSubSteps = [
    { msg: '[-2,1,-3,4,-1,2]. Divide at mid=2.', state: [{ val: -2 }, { val: 1 }, { val: -3, color: '#FEF9C3', border: '#FACC15' }, { val: 4 }, { val: -1 }, { val: 2 }] },
    { msg: 'Left half max = 1. Right half max = 5.', state: [{ val: -2 }, { val: 1, color: '#DBEAFE', border: '#3B82F6' }, { val: -3 }, { val: 4, color: '#DBEAFE', border: '#3B82F6' }, { val: -1, color: '#DBEAFE', border: '#3B82F6' }, { val: 2, color: '#DBEAFE', border: '#3B82F6' }] },
    { msg: 'Crossing: [1,-3,4,-1,2] = 3. Max = 5 ✅', state: [{ val: -2 }, { val: 1 }, { val: -3 }, { val: 4, color: '#DCFCE7', border: '#22C55E' }, { val: -1, color: '#DCFCE7', border: '#22C55E' }, { val: 2, color: '#DCFCE7', border: '#22C55E' }] },
];

const mergeKSteps = [
    { msg: 'Lists: [1,4,5] [1,3,4] [2,6]. Pair up.', state: [{ label: '[1,4,5]' }, { label: '[1,3,4]' }, { label: '[2,6]' }] },
    { msg: 'Merge pair → [1,1,3,4,4,5]. Merge with [2,6].', state: [{ label: '[1,1,3,4,4,5]', color: '#DBEAFE', border: '#3B82F6' }, { label: '[2,6]', color: '#FEF9C3', border: '#FACC15' }] },
    { msg: '✅ [1,1,2,3,4,4,5,6]', state: [{ label: '[1,1,2,3,4,4,5,6]', color: '#DCFCE7', border: '#22C55E' }] },
];

const kthSmallSteps = [
    { msg: '[3,2,1,5,6,4], k=2. Pivot=4. Partition.', state: [{ val: 3 }, { val: 2 }, { val: 1 }, { val: 5 }, { val: 6 }, { val: 4, color: '#EDE9FE', border: '#8B5CF6' }] },
    { msg: 'After partition: [3,2,1,4,6,5]. Pivot at idx 3. k=2 < 3 → go left.', state: [{ val: 3, color: '#FEF9C3', border: '#FACC15' }, { val: 2, color: '#FEF9C3', border: '#FACC15' }, { val: 1, color: '#FEF9C3', border: '#FACC15' }, { val: 4, color: '#DCFCE7', border: '#22C55E' }, { val: 6 }, { val: 5 }] },
    { msg: '✅ Found: 2nd smallest = 2', state: [{ val: 1 }, { val: 2, color: '#DCFCE7', border: '#22C55E' }, { val: 3 }, { val: 4 }, { val: 5 }, { val: 6 }] },
];

const closestSteps = [
    { msg: 'Points sorted by x. Divide at midpoint.', state: [{ label: '(2,3)' }, { label: '(3,4)' }, { label: '|', color: '#FEE2E2', border: '#EF4444' }, { label: '(5,1)' }, { label: '(12,10)' }] },
    { msg: 'Left closest=1.41 Right closest=7.07', state: [{ label: '(2,3)', color: '#DBEAFE', border: '#3B82F6' }, { label: '(3,4)', color: '#DBEAFE', border: '#3B82F6' }, { label: '|' }, { label: '(5,1)', color: '#DBEAFE', border: '#3B82F6' }, { label: '(12,10)' }] },
    { msg: '✅ Closest pair: (2,3)-(3,4), dist=1.41', state: [{ label: '(2,3)', color: '#DCFCE7', border: '#22C55E' }, { label: '(3,4)', color: '#DCFCE7', border: '#22C55E' }, { label: '|' }, { label: '(5,1)' }, { label: '(12,10)' }] },
];

const invSteps = [
    { msg: '[2,4,1,3,5]. Divide → [2,4] [1,3,5].', state: [{ val: 2 }, { val: 4, color: '#FEF9C3', border: '#FACC15' }, { val: 1 }, { val: 3 }, { val: 5 }] },
    { msg: 'Merge [2,4]+[1,3,5]: 1 before 2 → +2 inv.', state: [{ val: 1, color: '#DBEAFE', border: '#3B82F6' }, { val: 2 }, { val: 3, color: '#DBEAFE', border: '#3B82F6' }, { val: 4 }, { val: 5 }] },
    { msg: '✅ Total inversions = 3: (2,1),(4,1),(4,3)', state: [{ val: 1, color: '#DCFCE7', border: '#22C55E' }, { val: 2, color: '#DCFCE7', border: '#22C55E' }, { val: 3, color: '#DCFCE7', border: '#22C55E' }, { val: 4, color: '#DCFCE7', border: '#22C55E' }, { val: 5, color: '#DCFCE7', border: '#22C55E' }] },
];

const skylineSteps = [
    { msg: 'Buildings: [2,9,10],[3,7,15],[5,12,12]. Divide.', state: [{ label: 'B1', color: '#FEF9C3', border: '#FACC15' }, { label: 'B2' }, { label: 'B3' }] },
    { msg: 'Left skyline: [2,10][9,0]. Right: [3,15][7,12][12,0].', state: [{ label: 'L', color: '#DBEAFE', border: '#3B82F6' }, { label: 'R', color: '#DBEAFE', border: '#3B82F6' }] },
    { msg: '✅ Merged: [2,10][3,15][7,12][9,10][12,0]', state: [{ label: '[2,10]', color: '#DCFCE7', border: '#22C55E' }, { label: '[3,15]', color: '#DCFCE7', border: '#22C55E' }, { label: '[7,12]', color: '#DCFCE7', border: '#22C55E' }, { label: '[12,0]', color: '#DCFCE7', border: '#22C55E' }] },
];

const medianSteps = [
    { msg: 'A=[1,3], B=[2]. Binary search on smaller array A.', state: [{ label: 'A:[1,3]' }, { label: 'B:[2]' }] },
    { msg: 'Partition A at i=1, B at j=1. L=[1,2] R=[3].', state: [{ val: 1, color: '#DBEAFE', border: '#3B82F6' }, { val: 2, color: '#DBEAFE', border: '#3B82F6' }, { val: 3, color: '#FEF9C3', border: '#FACC15' }] },
    { msg: '✅ Median = max(left) = 2.0', state: [{ val: 1 }, { val: 2, color: '#DCFCE7', border: '#22C55E' }, { val: 3 }] },
];

const karatsubaSteps = [
    { msg: '1234 × 5678. Split: a=12,b=34,c=56,d=78.', state: [{ label: '12' }, { label: '34', color: '#FEF9C3', border: '#FACC15' }, { label: '×' }, { label: '56' }, { label: '78', color: '#FEF9C3', border: '#FACC15' }] },
    { msg: 'z0=34×78=2652, z2=12×56=672, z1=46×134=6164', state: [{ label: 'z0=2652', color: '#DBEAFE', border: '#3B82F6' }, { label: 'z2=672', color: '#DBEAFE', border: '#3B82F6' }, { label: 'z1=6164', color: '#DBEAFE', border: '#3B82F6' }] },
    { msg: '✅ Result = 672×10⁴ + 2840×10² + 2652 = 7006652', state: [{ label: '7006652', color: '#DCFCE7', border: '#22C55E' }] },
];

const vizData = {
    'max-subarray': { title: 'Maximum Subarray D&C', steps: maxSubSteps },
    'merge-k-sorted': { title: 'Merge K Sorted Lists', steps: mergeKSteps },
    'kth-smallest': { title: 'QuickSelect', steps: kthSmallSteps },
    'closest-pair': { title: 'Closest Pair D&C', steps: closestSteps },
    'count-inversions': { title: 'Count Inversions (Merge Sort)', steps: invSteps },
    'skyline': { title: 'Skyline Merge', steps: skylineSteps },
    'median-sorted': { title: 'Median Binary Search', steps: medianSteps },
    'karatsuba': { title: 'Karatsuba Multiplication', steps: karatsubaSteps },
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
const DCPracticeProblems = () => {
    const [activeProblem, setActiveProblem] = useState(null);
    const [activeLang, setActiveLang] = useState('javascript');

    return (
        <div className="dc-container">
            <div className="dc-split-layout">

                {/* Left Panel: Problem List */}
                <div className="dc-left-panel">
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: '1.5rem', color: '#1E293B', fontWeight: '800' }}>Practice Problems</h3>
                        <p style={{ margin: 0, color: '#64748B', fontSize: '1rem', lineHeight: '1.5' }}>
                            Master Divide and Conquer with these classic coding challenges.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
                        {DC_PROBLEMS.map((prob) => (
                            <motion.div
                                key={prob.id}
                                onClick={() => { setActiveProblem(prob); setActiveLang('javascript'); }}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    background: 'white', borderRadius: '14px', padding: '16px',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.05)', cursor: 'pointer',
                                    border: activeProblem?.id === prob.id ? '2px solid #4F46E5' : '2px solid transparent',
                                    transition: 'border 0.2s ease',
                                    display: 'flex', flexDirection: 'column', gap: '10px'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h4 style={{ margin: 0, color: '#1E293B', fontSize: '1.1rem', fontWeight: 'bold' }}>{prob.tag} {prob.title}</h4>
                                    <span style={{
                                        background: getDifficultyColor(prob.difficulty) + '20',
                                        color: getDifficultyColor(prob.difficulty),
                                        padding: '4px 10px', borderRadius: '999px', fontSize: '0.8rem', fontWeight: '700'
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
                <div className="dc-right-panel">
                    <AnimatePresence mode="wait">
                        {activeProblem ? (
                            <motion.div
                                key={activeProblem.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="dc-solution-viewer"
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
                                                        padding: '6px 14px', borderRadius: '6px', border: 'none',
                                                        fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.85rem',
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
                                        background: '#0F172A', color: '#E2E8F0', padding: '20px', borderRadius: '12px',
                                        overflowX: 'auto', fontSize: '0.95rem', lineHeight: '1.6', margin: 0,
                                        fontFamily: '"Fira Code", monospace', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
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
                                <div style={{ fontSize: '4rem', marginBottom: '16px' }}>⚔️</div>
                                <h3 style={{ margin: 0 }}>Select a problem to view its solution</h3>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const v = {
    wrap: { display: 'flex', flexDirection: 'column', gap: '12px' },
    desc: { fontSize: '0.9rem', color: '#64748B', lineHeight: '1.6', backgroundColor: '#F1F5F9', borderRadius: '10px', padding: '10px 14px' },
    vizArea: { backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', minHeight: '120px' },
    cell: { width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '0.9rem', color: '#1E293B', transition: 'background-color 0.3s' },
    msg: { backgroundColor: '#1E293B', color: '#fff', padding: '8px 16px', borderRadius: '10px', fontSize: '0.88rem', fontWeight: '700', textAlign: 'center' },
    controls: { display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' },
    btn: bg => ({ padding: '8px 16px', borderRadius: '10px', border: 'none', backgroundColor: bg, color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }),
};

export default DCPracticeProblems;
