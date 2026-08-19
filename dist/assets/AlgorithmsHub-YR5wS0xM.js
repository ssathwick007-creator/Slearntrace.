import{j as e,m as q,A as X}from"./proxy-B1ZhzaRo.js";import{r as i}from"./index-ALvCqmsg.js";import{useFeedback as le}from"./FeedbackManager-CoVm3kJ8.js";import"./index-bvV3Sn6d.js";const ct=t=>new Promise(n=>setTimeout(n,t)),Nt=()=>{const[t,n]=i.useState([5,3,8,2,6,4,7,1]),[a,d]=i.useState([]),[o,x]=i.useState([]),[u,b]=i.useState([]),[C,R]=i.useState(""),[I,j]=i.useState(!1),{showFeedback:A}=le(),[r,c]=i.useState(!0),[p,l]=i.useState(!1),[y,B]=i.useState("python"),H=i.useRef(!1),M=Math.max(...t),T=()=>{H.current=!0,n([5,3,8,2,6,4,7,1]),d([]),x([]),b([]),R(""),j(!1),l(!1),setTimeout(()=>{H.current=!1},100)},$=async()=>{H.current=!1,j(!0),l(!1);let z=[5,3,8,2,6,4,7,1];const E=new Set,h=z.length;for(let s=0;s<h-1;s++){for(let m=0;m<h-s-1;m++){if(H.current)return;d([m,m+1]),R(`Comparing arr[${m}]=${z[m]} and arr[${m+1}]=${z[m+1]}`),await ct(700),z[m]>z[m+1]&&([z[m],z[m+1]]=[z[m+1],z[m]],x([m,m+1]),n([...z]),R(`Swapped! ${z[m]} ↔ ${z[m+1]}`),await ct(700),x([])),d([])}E.add(h-1-s),b(new Set([...E])),window.AppProgress&&window.AppProgress.markMetaphorCompleted("BubbleSort")}E.add(0),b(new Set([...E])),d([]),R("✓ Array is sorted!"),A("Success! Well done 🚀","success"),j(!1),l(!0)},v=i.useRef({arr:[5,3,8,2,6,4,7,1],i:0,j:0}),D=()=>{if(p||I)return;const z=v.current,E=z.arr.length;if(z.i>=E-1){R("✓ Array is sorted!"),l(!0),d([]),b(new Set(Array.from({length:E},(s,m)=>m))),window.AppProgress&&window.AppProgress.markMetaphorCompleted("BubbleSort");return}const h=z.j;if(d([h,h+1]),R(`Comparing arr[${h}]=${z.arr[h]} and arr[${h+1}]=${z.arr[h+1]}`),z.arr[h]>z.arr[h+1]&&([z.arr[h],z.arr[h+1]]=[z.arr[h+1],z.arr[h]],x([h,h+1]),setTimeout(()=>x([]),500)),n([...z.arr]),z.j++,z.j>=E-1-z.i){const s=new Set([...u,E-1-z.i]);b(s),z.i++,z.j=0}};return e.jsxs("div",{style:re.container,children:[e.jsxs("div",{style:re.header,children:[e.jsx("h2",{style:re.title,children:"Bubble Sort — Rising Bubbles 🫧"}),e.jsxs("div",{style:re.desc,children:[e.jsx("p",{children:"Think of it like bubbles in a soda: the lighter (smaller) ones stay down, while the heavy (larger) ones float to the top!"}),e.jsxs("p",{children:["We'll ",e.jsx("strong",{children:"swap neighbors"})," until everything is in its perfect place."]})]})]}),e.jsxs("div",{style:re.visualizer,children:[e.jsx("div",{style:re.barsContainer,children:t.map((z,E)=>{let h="#e2e8f0";return u.has&&u.has(E)&&(h="#4ade80"),o.includes(E)&&(h="#ef4444"),a.includes(E)&&(h="#fbbf24"),e.jsxs(q.div,{style:{...re.barWrap},layout:!0,transition:{type:"spring",stiffness:300,damping:30},className:a.includes(E)?"pulse-glow":"",children:[e.jsx("div",{style:{...re.bar,height:`${z/M*160+20}px`,backgroundColor:h,boxShadow:a.includes(E)?"0 0 15px rgba(251, 191, 36, 0.5)":"none"}}),e.jsx("span",{style:re.barLabel,children:z})]},E)})}),e.jsx(X,{children:C&&e.jsx(q.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0},style:re.messageBox,children:C})}),e.jsx("div",{style:re.legend,children:[["#fbbf24","Comparing"],["#ef4444","Swapping"],["#4ade80","Sorted"]].map(([z,E])=>e.jsxs("div",{style:re.legendItem,children:[e.jsx("div",{style:{...re.dot,backgroundColor:z}}),e.jsx("span",{children:E})]},E))})]}),e.jsxs("div",{style:re.controls,children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx("button",{onClick:()=>{$(),c(!1)},disabled:I,style:{...re.btn,backgroundColor:"#4f46e5"},children:"▶ Let's Sort it! 🫧"}),r&&!I&&e.jsx("div",{className:"tooltip-hint",style:{bottom:"110%",left:"50%"},children:"Try clicking 'Start' to see the magic ✨"})]}),e.jsx("button",{onClick:()=>{D(),c(!1)},disabled:I||p,style:{...re.btn,backgroundColor:"#0891b2"},children:"⏭ Take a Step"}),e.jsx("button",{onClick:T,style:{...re.btn,backgroundColor:"#ef4444"},children:"↺ Reset Everything"})]}),e.jsxs("div",{style:re.codeSection,children:[e.jsx("h3",{style:re.subTitle,children:"Bubble Sort Implementation"}),e.jsx("div",{style:re.langSelector,children:["python","javascript","cpp"].map(z=>e.jsx("button",{onClick:()=>B(z),style:{...re.langBtn,backgroundColor:y===z?"#4f46e5":"#f1f5f9",color:y===z?"#fff":"#64748b",border:y===z?"none":"1px solid #e2e8f0"},children:z==="cpp"?"C++":z.toUpperCase()},z))}),e.jsxs("pre",{style:re.codeBox,children:[y==="python"&&e.jsx("code",{children:`def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        for j in range(n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Time:  O(n²)
# Space: O(1)`}),y==="javascript"&&e.jsx("code",{children:`function bubbleSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// Time:  O(n²)
// Space: O(1)`}),y==="cpp"&&e.jsx("code",{children:`#include <vector>
using namespace std;

void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}

// Time:  O(n²)
// Space: O(1)`})]})]}),e.jsxs("div",{style:re.quizSection,children:[e.jsx("h3",{style:re.subTitle,children:"Knowledge Check"}),e.jsx("div",{style:re.quizGrid,children:[{q:"What is Bubble Sort?",a:"A simple sorting algorithm that repeatedly compares adjacent elements and swaps them if they are in the wrong order."},{q:"What is the time complexity of Bubble Sort?",a:"O(n²) in the worst and average case. O(n) in the best case (already sorted, with early exit optimization)."},{q:"Why is it called Bubble Sort?",a:'Because larger elements "bubble up" to the end of the array with each pass, just like bubbles rising in water.'},{q:"When is Bubble Sort inefficient?",a:"For large datasets. Its O(n²) complexity makes it significantly slower than algorithms like Merge Sort or Quick Sort on real-world data."}].map((z,E)=>e.jsxs("div",{style:re.quizCard,children:[e.jsxs("p",{style:re.question,children:[e.jsxs("strong",{children:["Q",E+1,":"]})," ",z.q]}),e.jsx("p",{style:re.answer,children:z.a})]},E))})]})]})},re={container:{padding:"2rem",backgroundColor:"#fff",borderRadius:"32px",border:"1px solid #e2e8f0",boxShadow:"0 4px 6px -1px rgba(0,0,0,0.05)",fontFamily:"system-ui, sans-serif"},header:{textAlign:"center",marginBottom:"2rem"},title:{fontSize:"2rem",fontWeight:"900",color:"#1e293b",letterSpacing:"-0.025em",marginBottom:"1rem"},desc:{color:"#64748b",fontSize:"1.05rem",lineHeight:"1.7",maxWidth:"750px",margin:"0 auto"},visualizer:{backgroundColor:"#f8fafc",borderRadius:"24px",padding:"2rem",border:"1px solid #f1f5f9",display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem",marginBottom:"1.5rem"},barsContainer:{display:"flex",alignItems:"flex-end",gap:"10px",height:"200px",padding:"0 1rem"},barWrap:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},bar:{width:"40px",borderRadius:"6px 6px 0 0",transition:"background-color 0.3s",minHeight:"20px"},barLabel:{fontSize:"0.8rem",fontWeight:"700",color:"#475569"},messageBox:{backgroundColor:"#1e293b",color:"#fff",padding:"0.7rem 1.5rem",borderRadius:"12px",fontSize:"1rem",fontWeight:"700"},legend:{display:"flex",gap:"1.5rem",flexWrap:"wrap",justifyContent:"center"},legendItem:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.9rem",color:"#64748b",fontWeight:"600"},dot:{width:"12px",height:"12px",borderRadius:"50%"},controls:{display:"flex",justifyContent:"center",gap:"1rem",marginBottom:"2rem",flexWrap:"wrap"},btn:{padding:"0.75rem 1.5rem",borderRadius:"12px",border:"none",color:"#fff",fontWeight:"700",cursor:"pointer",fontSize:"1rem",transition:"opacity 0.2s",opacity:.9},codeSection:{marginBottom:"3rem"},subTitle:{fontSize:"1.5rem",fontWeight:"900",color:"#1e293b",marginBottom:"1.5rem",textAlign:"center"},langSelector:{display:"flex",justifyContent:"center",gap:"0.75rem",marginBottom:"1.25rem"},langBtn:{padding:"0.6rem 1.2rem",borderRadius:"10px",fontSize:"0.9rem",fontWeight:"700",cursor:"pointer",transition:"all 0.2s"},codeBox:{backgroundColor:"#0f172a",color:"#f8fafc",padding:"1.5rem",borderRadius:"20px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",fontFamily:"monospace",boxShadow:"inset 0 2px 4px rgba(0,0,0,0.1)"},quizSection:{marginTop:"2rem"},quizGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"1.5rem"},quizCard:{backgroundColor:"#f8fafc",padding:"1.5rem",borderRadius:"20px",border:"1px solid #f1f5f9"},question:{fontWeight:"700",color:"#1e293b",marginBottom:"0.75rem",fontSize:"1rem"},answer:{color:"#10b981",fontWeight:"600",lineHeight:"1.5",fontSize:"0.95rem"}},Pe=t=>new Promise(n=>setTimeout(n,t)),Ne=[7,3,5,2,8,4,6,1],Lt=()=>{const[t,n]=i.useState([...Ne]),[a,d]=i.useState([]),[o,x]=i.useState(null),[u,b]=i.useState([]),[C,R]=i.useState(new Set),[I,j]=i.useState(""),[A,r]=i.useState(!1),{showFeedback:c}=le(),[p,l]=i.useState(!0),[y,B]=i.useState(!1),[H,M]=i.useState("python"),T=i.useRef(!1),$=Math.max(...t),v=()=>{T.current=!0,setTimeout(()=>{T.current=!1},100),n([...Ne]),d([]),x(null),b([]),R(new Set),j(""),r(!1),B(!1),z.current={arr:[...Ne],i:0,j:1,currentMin:0}},D=async()=>{T.current=!1,r(!0),B(!1);let s=[...Ne];const m=new Set,k=s.length;for(let S=0;S<k-1;S++){if(T.current)return;let g=S;x(g),j(`Pass ${S+1}: Looking for the smallest element from index ${S}`);for(let f=S+1;f<k;f++){if(T.current)return;d([f]),j(`Comparing arr[${f}]=${s[f]} with current min arr[${g}]=${s[g]}`),await Pe(500),s[f]<s[g]&&(g=f,x(g),j(`New minimum found: arr[${g}]=${s[g]}`),await Pe(400))}d([]),g!==S?(b([S,g]),j(`Swapping arr[${S}]=${s[S]} ↔ arr[${g}]=${s[g]}`),await Pe(600),[s[S],s[g]]=[s[g],s[S]],n([...s]),b([])):(j(`arr[${S}]=${s[S]} is already in the correct position`),await Pe(500)),m.add(S),R(new Set([...m])),x(null),await Pe(300)}m.add(k-1),R(new Set([...m])),d([]),x(null),b([]),j("✓ Array is sorted!"),c("Great job! Keep going 🚀","success"),r(!1),B(!0),window.AppProgress&&window.AppProgress.markMetaphorCompleted("SelectionSort")},z=i.useRef({arr:[...Ne],i:0,j:1,currentMin:0}),E=()=>{if(y||A)return;const s=z.current,m=s.arr.length;if(s.i>=m-1){const k=new Set(Array.from({length:m},(S,g)=>g));R(k),d([]),x(null),j("✓ Array is sorted!"),B(!0),window.AppProgress&&window.AppProgress.markMetaphorCompleted("SelectionSort");return}s.j<m?(d([s.j]),x(s.currentMin),j(`Comparing arr[${s.j}]=${s.arr[s.j]} with min arr[${s.currentMin}]=${s.arr[s.currentMin]}`),s.arr[s.j]<s.arr[s.currentMin]&&(s.currentMin=s.j,x(s.currentMin)),s.j++):(s.currentMin!==s.i?(b([s.i,s.currentMin]),[s.arr[s.i],s.arr[s.currentMin]]=[s.arr[s.currentMin],s.arr[s.i]],n([...s.arr]),j(`Swapped! arr[${s.i}]=${s.arr[s.i]} placed in sorted position`),setTimeout(()=>b([]),500)):j(`arr[${s.i}]=${s.arr[s.i]} is already minimum, no swap needed`),R(k=>new Set([...k,s.i])),d([]),x(null),s.i++,s.j=s.i+1,s.currentMin=s.i)},h=s=>u.includes(s)?"#ef4444":s===o?"#3b82f6":a.includes(s)?"#fbbf24":C.has(s)?"#4ade80":"#e2e8f0";return e.jsxs("div",{style:Y.container,children:[e.jsxs("div",{style:Y.header,children:[e.jsx("h2",{style:Y.title,children:"Selection Sort — Choosing the Smallest Card 🃏"}),e.jsxs("div",{style:Y.desc,children:[e.jsx("p",{children:"Selection Sort is like picking the smallest card from a messy pile and moving it to the front, one by one!"}),e.jsxs("p",{children:["We'll ",e.jsx("strong",{children:"find the minimum"})," and place it in its correct spot until the whole row is perfect."]})]})]}),e.jsxs("div",{style:Y.visualizer,children:[e.jsx("div",{style:Y.sortedLabel,children:C.size>0&&e.jsxs("span",{style:Y.sortedPill,children:["✓ Sorted: first ",C.size," element",C.size>1?"s":""]})}),e.jsx("div",{style:Y.barsContainer,children:t.map((s,m)=>e.jsxs(q.div,{style:Y.barWrap,layout:!0,transition:{type:"spring",stiffness:300,damping:30},className:m===o?"pulse-glow":"",children:[e.jsx("div",{style:{...Y.bar,height:`${s/$*160+20}px`,backgroundColor:h(m),boxShadow:m===o?"0 0 15px rgba(59, 130, 246, 0.5)":"none"}}),e.jsx("span",{style:Y.barLabel,children:s})]},m))}),e.jsx(X,{children:I&&e.jsx(q.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0},style:Y.messageBox,children:I})}),e.jsx("div",{style:Y.legend,children:[["#fbbf24","Scanning"],["#3b82f6","Current Min"],["#ef4444","Swapping"],["#4ade80","Sorted"]].map(([s,m])=>e.jsxs("div",{style:Y.legendItem,children:[e.jsx("div",{style:{...Y.dot,backgroundColor:s}}),e.jsx("span",{children:m})]},m))})]}),e.jsxs("div",{style:Y.controls,children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx("button",{onClick:()=>{D(),l(!1)},disabled:A,style:{...Y.btn,backgroundColor:"#4f46e5"},children:"▶ Let's Sort it! 🃏"}),p&&!A&&e.jsx("div",{className:"tooltip-hint",style:{bottom:"110%",left:"50%"},children:"Click 'Start' to find the smallest! ✨"})]}),e.jsx("button",{onClick:()=>{E(),l(!1)},disabled:A||y,style:{...Y.btn,backgroundColor:"#0891b2"},children:"⏭ Take a Step"}),e.jsx("button",{onClick:v,style:{...Y.btn,backgroundColor:"#ef4444"},children:"↺ Reset Everything"})]}),e.jsxs("div",{style:Y.codeSection,children:[e.jsx("h3",{style:Y.subTitle,children:"Selection Sort Implementation"}),e.jsx("div",{style:Y.langSelector,children:["python","javascript","cpp"].map(s=>e.jsx("button",{onClick:()=>M(s),style:{...Y.langBtn,backgroundColor:H===s?"#4f46e5":"#f1f5f9",color:H===s?"#fff":"#64748b",border:H===s?"none":"1px solid #e2e8f0"},children:s==="cpp"?"C++":s.toUpperCase()},s))}),e.jsxs("pre",{style:Y.codeBox,children:[H==="python"&&e.jsx("code",{children:`def selection_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        # Swap the found minimum with arr[i]
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr

# Time:  O(n²) — always
# Space: O(1)  — in-place
# Swaps: O(n)  — at most n-1 swaps`}),H==="javascript"&&e.jsx("code",{children:`function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        // Swap the minimum into position
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
    return arr;
}

// Time:  O(n²)
// Space: O(1)
// Swaps: O(n)`}),H==="cpp"&&e.jsx("code",{children:`#include <vector>
#include <algorithm>
using namespace std;

void selectionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        int minIdx = i;
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx != i) {
            swap(arr[i], arr[minIdx]);
        }
    }
}

// Time:  O(n²)
// Space: O(1)
// Swaps: O(n)`})]})]}),e.jsxs("div",{style:Y.quizSection,children:[e.jsx("h3",{style:Y.subTitle,children:"Knowledge Check"}),e.jsx("div",{style:Y.quizGrid,children:[{q:"What is the main idea of Selection Sort?",a:"Repeatedly find the minimum element from the unsorted portion and place it at the beginning of the sorted portion."},{q:"How many swaps occur in Selection Sort?",a:"At most O(n) swaps — one swap per pass. This makes it more efficient than Bubble Sort in terms of write operations."},{q:"What is the time complexity of Selection Sort?",a:"O(n²) in all cases (best, average, and worst), because it always scans the entire unsorted portion for the minimum element."},{q:"Why is Selection Sort called a selection algorithm?",a:"Because in each pass, it selects (chooses) the smallest element from the remaining unsorted part and moves it to its correct position."}].map((s,m)=>e.jsxs("div",{style:Y.quizCard,children:[e.jsxs("p",{style:Y.question,children:[e.jsxs("strong",{children:["Q",m+1,":"]})," ",s.q]}),e.jsx("p",{style:Y.answer,children:s.a})]},m))})]})]})},Y={container:{padding:"2rem",backgroundColor:"#fff",borderRadius:"32px",border:"1px solid #e2e8f0",boxShadow:"0 4px 6px -1px rgba(0,0,0,0.05)",fontFamily:"system-ui, sans-serif"},header:{textAlign:"center",marginBottom:"2rem"},title:{fontSize:"2rem",fontWeight:"900",color:"#1e293b",letterSpacing:"-0.025em",marginBottom:"1rem"},desc:{color:"#64748b",fontSize:"1.05rem",lineHeight:"1.7",maxWidth:"750px",margin:"0 auto"},visualizer:{backgroundColor:"#f8fafc",borderRadius:"24px",padding:"2rem",border:"1px solid #f1f5f9",display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem",marginBottom:"1.5rem"},sortedLabel:{height:"28px",display:"flex",alignItems:"center"},sortedPill:{backgroundColor:"#dcfce7",color:"#15803d",fontWeight:"700",fontSize:"0.82rem",padding:"3px 12px",borderRadius:"999px",border:"1px solid #86efac"},barsContainer:{display:"flex",alignItems:"flex-end",gap:"10px",height:"200px",padding:"0 1rem"},barWrap:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},bar:{width:"40px",borderRadius:"6px 6px 0 0",transition:"background-color 0.3s",minHeight:"20px"},barLabel:{fontSize:"0.8rem",fontWeight:"700",color:"#475569"},messageBox:{backgroundColor:"#1e293b",color:"#fff",padding:"0.7rem 1.5rem",borderRadius:"12px",fontSize:"1rem",fontWeight:"700"},legend:{display:"flex",gap:"1.5rem",flexWrap:"wrap",justifyContent:"center"},legendItem:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.9rem",color:"#64748b",fontWeight:"600"},dot:{width:"12px",height:"12px",borderRadius:"50%"},controls:{display:"flex",justifyContent:"center",gap:"1rem",marginBottom:"2rem",flexWrap:"wrap"},btn:{padding:"0.75rem 1.5rem",borderRadius:"12px",border:"none",color:"#fff",fontWeight:"700",cursor:"pointer",fontSize:"1rem",opacity:.9},codeSection:{marginBottom:"3rem"},subTitle:{fontSize:"1.5rem",fontWeight:"900",color:"#1e293b",marginBottom:"1.5rem",textAlign:"center"},langSelector:{display:"flex",justifyContent:"center",gap:"0.75rem",marginBottom:"1.25rem"},langBtn:{padding:"0.6rem 1.2rem",borderRadius:"10px",fontSize:"0.9rem",fontWeight:"700",cursor:"pointer",transition:"all 0.2s"},codeBox:{backgroundColor:"#0f172a",color:"#f8fafc",padding:"1.5rem",borderRadius:"20px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",fontFamily:"monospace"},quizSection:{marginTop:"2rem"},quizGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"1.5rem"},quizCard:{backgroundColor:"#f8fafc",padding:"1.5rem",borderRadius:"20px",border:"1px solid #f1f5f9"},question:{fontWeight:"700",color:"#1e293b",marginBottom:"0.75rem",fontSize:"1rem"},answer:{color:"#10b981",fontWeight:"600",lineHeight:"1.5",fontSize:"0.95rem"}},rt=t=>new Promise(n=>setTimeout(n,t)),qe=[8,3,5,2,7,4,6,1],_t=()=>{const[t,n]=i.useState([...qe]),[a,d]=i.useState(null),[o,x]=i.useState(null),[u,b]=i.useState([]),[C,R]=i.useState(new Set([0])),[I,j]=i.useState(""),[A,r]=i.useState(!1),{showFeedback:c}=le(),[p,l]=i.useState(!0),[y,B]=i.useState(!1),[H,M]=i.useState("python"),T=i.useRef(!1),$=Math.max(...qe),v=()=>{T.current=!0,setTimeout(()=>{T.current=!1},100),n([...qe]),d(null),x(null),b([]),R(new Set([0])),j(""),r(!1),B(!1),z.current={arr:[...qe],i:1}},D=async()=>{T.current=!1,r(!0),B(!1);let s=[...qe];const m=new Set([0]);for(let k=1;k<s.length;k++){if(T.current)return;const S=s[k];d(k),j(`Taking element ${S} at index ${k}`),await rt(600);let g=k-1;for(;g>=0&&s[g]>S;){if(T.current)return;x(g),b([g+1]),j(`${s[g]} > ${S}, shift ${s[g]} right`),s[g+1]=s[g],n([...s]),await rt(500),g--}s[g+1]=S,n([...s]),m.add(k),R(new Set([...m])),d(null),x(null),b([]),j(`Inserted ${S} at index ${g+1}`),await rt(400),window.AppProgress&&window.AppProgress.markMetaphorCompleted("InsertionSort")}j("✓ Array is sorted!"),c("Success! You nailed it 🚀","success"),r(!1),B(!0)},z=i.useRef({arr:[...qe],i:1}),E=()=>{if(y||A)return;const s=z.current;if(s.i>=s.arr.length){j("✓ Array is sorted!"),B(!0),window.AppProgress&&window.AppProgress.markMetaphorCompleted("InsertionSort");return}const m=s.arr[s.i];let k=s.i-1;for(d(s.i),j(`Inserting ${m} into sorted portion`);k>=0&&s.arr[k]>m;)s.arr[k+1]=s.arr[k],k--;s.arr[k+1]=m,n([...s.arr]),R(S=>new Set([...S,s.i])),s.i++,d(null),x(null),b([])},h=s=>u.includes(s)?"#ef4444":s===o?"#3b82f6":s===a?"#fbbf24":C.has(s)?"#4ade80":"#e2e8f0";return e.jsxs("div",{style:J.container,children:[e.jsxs("div",{style:J.header,children:[e.jsx("h2",{style:J.title,children:"Insertion Sort — Organizing Your Hand 🃏"}),e.jsx("div",{style:J.desc,children:e.jsx("p",{children:"Insertion Sort is exactly like sorting playing cards. You pick one card and slide it into its perfect spot in your sorted row!"})})]}),e.jsxs("div",{style:J.visualizer,children:[e.jsx("div",{style:J.sortedPillWrap,children:C.size>1&&e.jsxs("span",{style:J.sortedPill,children:["✓ Sorted: first ",C.size," element",C.size>1?"s":""]})}),e.jsx("div",{style:J.barsContainer,children:t.map((s,m)=>e.jsxs(q.div,{style:J.barWrap,layout:!0,transition:{type:"spring",stiffness:300,damping:30},className:m===a?"pulse-glow":"",children:[e.jsx("div",{style:{...J.bar,height:`${s/$*160+20}px`,backgroundColor:h(m),boxShadow:m===a?"0 0 15px rgba(251, 191, 36, 0.5)":"none"}}),e.jsx("span",{style:J.barLabel,children:s})]},m))}),e.jsx(X,{children:I&&e.jsx(q.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0},style:J.messageBox,children:I})}),e.jsx("div",{style:J.legend,children:[["#fbbf24","Current"],["#3b82f6","Comparing"],["#ef4444","Shifting"],["#4ade80","Sorted"]].map(([s,m])=>e.jsxs("div",{style:J.legendItem,children:[e.jsx("div",{style:{...J.dot,backgroundColor:s}}),e.jsx("span",{children:m})]},m))})]}),e.jsxs("div",{style:J.controls,children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx("button",{onClick:()=>{D(),l(!1)},disabled:A,style:{...J.btn,backgroundColor:"#4f46e5"},children:"▶ Let's Sort it! 🃏"}),p&&!A&&e.jsx("div",{className:"tooltip-hint",style:{bottom:"110%",left:"50%"},children:"Pick a card to start sorting ✨"})]}),e.jsx("button",{onClick:()=>{E(),l(!1)},disabled:A||y,style:{...J.btn,backgroundColor:"#0891b2"},children:"⏭ Take a Step"}),e.jsx("button",{onClick:v,style:{...J.btn,backgroundColor:"#ef4444"},children:"↺ Reset Everything"})]}),e.jsxs("div",{style:J.codeSection,children:[e.jsx("h3",{style:J.subTitle,children:"Insertion Sort Implementation"}),e.jsx("div",{style:J.langSelector,children:["python","javascript","cpp"].map(s=>e.jsx("button",{onClick:()=>M(s),style:{...J.langBtn,backgroundColor:H===s?"#4f46e5":"#f1f5f9",color:H===s?"#fff":"#64748b",border:H===s?"none":"1px solid #e2e8f0"},children:s==="cpp"?"C++":s.toUpperCase()},s))}),e.jsxs("pre",{style:J.codeBox,children:[H==="python"&&e.jsx("code",{children:`def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

# Time:  O(n²) worst/avg, O(n) best
# Space: O(1) — in-place`}),H==="javascript"&&e.jsx("code",{children:`function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
    return arr;
}

// Time:  O(n²) worst/avg, O(n) best
// Space: O(1)`}),H==="cpp"&&e.jsx("code",{children:`void insertionSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}

// Time:  O(n²) worst, O(n) best
// Space: O(1)`})]})]}),e.jsxs("div",{style:J.quizSection,children:[e.jsx("h3",{style:J.subTitle,children:"Knowledge Check"}),e.jsx("div",{style:J.quizGrid,children:[{q:"What idea does Insertion Sort follow?",a:"It builds the sorted array one element at a time by inserting each new element into its correct position among already-sorted elements."},{q:"Why is it efficient for nearly sorted arrays?",a:"Because only a few elements need to shift per insertion. In the best case (already sorted), it runs in O(n) with no shifts at all."},{q:"What is its worst-case time complexity?",a:"O(n²) — when the array is in reverse order, every element must be compared with and shifted past all sorted elements."},{q:"When is Insertion Sort preferred?",a:"For small datasets, nearly-sorted data, and online algorithms where elements arrive one at a time (since it sorts incrementally)."}].map((s,m)=>e.jsxs("div",{style:J.quizCard,children:[e.jsxs("p",{style:J.question,children:[e.jsxs("strong",{children:["Q",m+1,":"]})," ",s.q]}),e.jsx("p",{style:J.answer,children:s.a})]},m))})]})]})},J={container:{padding:"2rem",backgroundColor:"#fff",borderRadius:"32px",border:"1px solid #e2e8f0",boxShadow:"0 4px 6px -1px rgba(0,0,0,0.05)",fontFamily:"system-ui, sans-serif"},header:{textAlign:"center",marginBottom:"2rem"},title:{fontSize:"2rem",fontWeight:"900",color:"#1e293b",letterSpacing:"-0.025em",marginBottom:"1rem"},desc:{color:"#64748b",fontSize:"1.05rem",lineHeight:"1.7",maxWidth:"750px",margin:"0 auto"},visualizer:{backgroundColor:"#f8fafc",borderRadius:"24px",padding:"2rem",border:"1px solid #f1f5f9",display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem",marginBottom:"1.5rem"},sortedPillWrap:{height:"28px",display:"flex",alignItems:"center"},sortedPill:{backgroundColor:"#dcfce7",color:"#15803d",fontWeight:"700",fontSize:"0.82rem",padding:"3px 12px",borderRadius:"999px",border:"1px solid #86efac"},barsContainer:{display:"flex",alignItems:"flex-end",gap:"10px",height:"200px",padding:"0 1rem"},barWrap:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},bar:{width:"40px",borderRadius:"6px 6px 0 0",transition:"background-color 0.3s",minHeight:"20px"},barLabel:{fontSize:"0.8rem",fontWeight:"700",color:"#475569"},messageBox:{backgroundColor:"#1e293b",color:"#fff",padding:"0.7rem 1.5rem",borderRadius:"12px",fontSize:"1rem",fontWeight:"700"},legend:{display:"flex",gap:"1.5rem",flexWrap:"wrap",justifyContent:"center"},legendItem:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.9rem",color:"#64748b",fontWeight:"600"},dot:{width:"12px",height:"12px",borderRadius:"50%"},controls:{display:"flex",justifyContent:"center",gap:"1rem",marginBottom:"2rem",flexWrap:"wrap"},btn:{padding:"0.75rem 1.5rem",borderRadius:"12px",border:"none",color:"#fff",fontWeight:"700",cursor:"pointer",fontSize:"1rem",opacity:.9},codeSection:{marginBottom:"3rem"},subTitle:{fontSize:"1.5rem",fontWeight:"900",color:"#1e293b",marginBottom:"1.5rem",textAlign:"center"},langSelector:{display:"flex",justifyContent:"center",gap:"0.75rem",marginBottom:"1.25rem"},langBtn:{padding:"0.6rem 1.2rem",borderRadius:"10px",fontSize:"0.9rem",fontWeight:"700",cursor:"pointer",transition:"all 0.2s"},codeBox:{backgroundColor:"#0f172a",color:"#f8fafc",padding:"1.5rem",borderRadius:"20px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",fontFamily:"monospace"},quizSection:{marginTop:"2rem"},quizGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"1.5rem"},quizCard:{backgroundColor:"#f8fafc",padding:"1.5rem",borderRadius:"20px",border:"1px solid #f1f5f9"},question:{fontWeight:"700",color:"#1e293b",marginBottom:"0.75rem",fontSize:"1rem"},answer:{color:"#10b981",fontWeight:"600",lineHeight:"1.5",fontSize:"0.95rem"}},Le=t=>new Promise(n=>setTimeout(n,t)),Ue=[8,3,5,2,7,4,6,1],Ot=()=>{const[t,n]=i.useState([...Ue]),[a,d]=i.useState([]),[o,x]=i.useState([]),[u,b]=i.useState(new Set),[C,R]=i.useState(""),[I,j]=i.useState(!1),[A,r]=i.useState(!1),[c,p]=i.useState("python"),[l,y]=i.useState(null),{showFeedback:B}=le(),[H,M]=i.useState(!0),T=i.useRef(!1),$=Math.max(...Ue),v=()=>{T.current=!0,setTimeout(()=>{T.current=!1},100),n([...Ue]),d([]),x([]),b(new Set),R(""),j(!1),r(!1),y(null)},D=async(m,k,S,g)=>{const f=m.slice(k,S+1),F=m.slice(S+1,g+1);let w=0,W=0,P=k;for(x(Array.from({length:g-k+1},(U,te)=>k+te)),d([]),R(`Merging [${f.join(",")}] + [${F.join(",")}]`),await Le(700);w<f.length&&W<F.length;){if(T.current)return;f[w]<=F[W]?m[P++]=f[w++]:m[P++]=F[W++],n([...m]),await Le(300)}for(;w<f.length;)m[P++]=f[w++],n([...m]),await Le(200);for(;W<F.length;)m[P++]=F[W++],n([...m]),await Le(200);const N=Array.from({length:g-k+1},(U,te)=>k+te);b(U=>new Set([...U,...N])),x([]),window.AppProgress&&window.AppProgress.markMetaphorCompleted("MergeSort")},z=async(m,k,S)=>{if(k>=S||T.current)return;const g=Math.floor((k+S)/2);d(Array.from({length:S-k+1},(f,F)=>k+F)),R(`Dividing: indices ${k} to ${S}, mid at ${g}`),await Le(600),await z(m,k,g),!T.current&&(await z(m,g+1,S),!T.current&&await D(m,k,g,S))},E=async()=>{T.current=!1,j(!0),r(!1),b(new Set);const m=[...Ue];n([...m]),await z(m,0,m.length-1),T.current||(b(new Set(Array.from({length:m.length},(k,S)=>S))),d([]),x([]),R("✓ Array is sorted!"),B("Merge Sort complete! Divided and Conquered 🏗️","success"),j(!1),r(!0))},h=()=>{A||(R("Use Start Sorting for full animation. Merge Sort is recursive — step mode runs the full sort."),E())},s=m=>u.has(m)?"#4ade80":o.includes(m)?"#3b82f6":a.includes(m)?"#fbbf24":"#e2e8f0";return e.jsxs("div",{style:L.container,children:[e.jsxs("div",{style:L.header,children:[e.jsx("h2",{style:L.title,children:"Merge Sort — Divide and Combine 🏗️"}),e.jsx("div",{style:L.desc,children:e.jsxs("p",{children:["Merge Sort is like a giant puzzle: we ",e.jsx("strong",{children:"divide"})," the pieces until they are tiny, sort them, and then ",e.jsx("strong",{children:"merge"})," them back into a perfect picture!"]})})]}),e.jsxs("div",{style:L.splitDiagram,children:[e.jsx("div",{style:L.splitRow,children:e.jsx("span",{style:L.splitBox,children:"[8, 3, 5, 2, 7, 4, 6, 1]"})}),e.jsx("div",{style:L.splitArrow,children:"↓ divide"}),e.jsxs("div",{style:L.splitRow,children:[e.jsx("span",{style:L.splitBox,children:"[8, 3, 5, 2]"}),e.jsx("span",{style:L.splitBox,children:"[7, 4, 6, 1]"})]}),e.jsx("div",{style:L.splitArrow,children:"↓ divide"}),e.jsxs("div",{style:L.splitRow,children:[e.jsx("span",{style:L.splitBox,children:"[8, 3]"}),e.jsx("span",{style:L.splitBox,children:"[5, 2]"}),e.jsx("span",{style:L.splitBox,children:"[7, 4]"}),e.jsx("span",{style:L.splitBox,children:"[6, 1]"})]}),e.jsx("div",{style:L.splitArrow,children:"↑ merge sorted halves"})]}),e.jsxs("div",{style:L.visualizer,children:[e.jsx("div",{style:L.barsContainer,children:t.map((m,k)=>e.jsxs(q.div,{style:L.barWrap,layout:!0,transition:{type:"spring",stiffness:300,damping:30},className:o.includes(k)?"pulse-glow":"",children:[e.jsx("div",{style:{...L.bar,height:`${m/$*160+20}px`,backgroundColor:s(k),boxShadow:o.includes(k)?"0 0 15px rgba(59, 130, 246, 0.4)":"none"}}),e.jsx("span",{style:L.barLabel,children:m})]},k))}),e.jsx(X,{children:C&&e.jsx(q.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0},style:L.messageBox,children:C})}),e.jsx("div",{style:L.legend,children:[["#fbbf24","Dividing"],["#3b82f6","Merging"],["#4ade80","Sorted"]].map(([m,k])=>e.jsxs("div",{style:L.legendItem,children:[e.jsx("div",{style:{...L.dot,backgroundColor:m}}),e.jsx("span",{children:k})]},k))})]}),e.jsxs("div",{style:L.controls,children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx("button",{onClick:()=>{E(),M(!1)},disabled:I,style:{...L.btn,backgroundColor:"#4f46e5"},children:"▶ Divide & Conquer! 🏗️"}),H&&!I&&e.jsx("div",{className:"tooltip-hint",style:{bottom:"110%",left:"50%"},children:"Let's split this array! ✨"})]}),e.jsx("button",{onClick:()=>{h(),M(!1)},disabled:I||A,style:{...L.btn,backgroundColor:"#0891b2"},children:"⏭ Take a Step"}),e.jsx("button",{onClick:v,style:{...L.btn,backgroundColor:"#ef4444"},children:"↺ Reset All"})]}),e.jsxs("div",{style:L.codeSection,children:[e.jsx("h3",{style:L.subTitle,children:"Merge Sort Implementation"}),e.jsx("div",{style:L.langSelector,children:["python","javascript","cpp"].map(m=>e.jsx("button",{onClick:()=>p(m),style:{...L.langBtn,backgroundColor:c===m?"#4f46e5":"#f1f5f9",color:c===m?"#fff":"#64748b",border:c===m?"none":"1px solid #e2e8f0"},children:m==="cpp"?"C++":m.toUpperCase()},m))}),e.jsxs("pre",{style:L.codeBox,children:[c==="python"&&e.jsx("code",{children:`def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

# Time:  O(n log n) — all cases
# Space: O(n)      — requires extra space`}),c==="javascript"&&e.jsx("code",{children:`function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j]) result.push(left[i++]);
        else result.push(right[j++]);
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}

// Time:  O(n log n)
// Space: O(n)`}),c==="cpp"&&e.jsx("code",{children:`void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> left(arr.begin()+l, arr.begin()+m+1);
    vector<int> right(arr.begin()+m+1, arr.begin()+r+1);
    int i=0, j=0, k=l;
    while (i<left.size() && j<right.size())
        arr[k++] = (left[i]<=right[j]) ? left[i++] : right[j++];
    while (i<left.size()) arr[k++]=left[i++];
    while (j<right.size()) arr[k++]=right[j++];
}
void mergeSort(vector<int>& arr, int l, int r) {
    if (l>=r) return;
    int m = (l+r)/2;
    mergeSort(arr,l,m);
    mergeSort(arr,m+1,r);
    merge(arr,l,m,r);
}

// Time:  O(n log n)
// Space: O(n)`})]})]}),e.jsxs("div",{style:L.quizSection,children:[e.jsx("h3",{style:L.subTitle,children:"Knowledge Check"}),e.jsx("div",{style:L.quizGrid,children:[{q:"What strategy does Merge Sort use?",a:"Divide and Conquer — recursively divide the array into halves, sort each, then merge them back together."},{q:"Why is Merge Sort efficient for large datasets?",a:"Its O(n log n) time complexity even in the worst case makes it much faster than O(n²) algorithms for large inputs."},{q:"What is its time complexity?",a:"O(n log n) in all cases — best, average, and worst. The log n factor comes from the number of divide levels."},{q:"Why does Merge Sort require extra space?",a:"The merge step creates temporary arrays to hold left and right halves during merging, requiring O(n) additional space."}].map((m,k)=>e.jsxs("div",{style:L.quizCard,children:[e.jsxs("p",{style:L.question,children:[e.jsxs("strong",{children:["Q",k+1,":"]})," ",m.q]}),e.jsx("p",{style:L.answer,children:m.a})]},k))})]})]})},L={container:{padding:"2rem",backgroundColor:"#fff",borderRadius:"32px",border:"1px solid #e2e8f0",boxShadow:"0 4px 6px -1px rgba(0,0,0,0.05)",fontFamily:"system-ui, sans-serif"},header:{textAlign:"center",marginBottom:"1.5rem"},title:{fontSize:"2rem",fontWeight:"900",color:"#1e293b",letterSpacing:"-0.025em",marginBottom:"1rem"},desc:{color:"#64748b",fontSize:"1.05rem",lineHeight:"1.7",maxWidth:"750px",margin:"0 auto"},splitDiagram:{backgroundColor:"#f1f5f9",borderRadius:"16px",padding:"1.5rem",marginBottom:"1.5rem",textAlign:"center",fontFamily:"monospace",fontSize:"0.95rem",color:"#334155"},splitRow:{display:"flex",justifyContent:"center",gap:"1rem",marginBottom:"4px",flexWrap:"wrap"},splitBox:{backgroundColor:"#dbeafe",border:"1px solid #93c5fd",borderRadius:"8px",padding:"4px 10px",color:"#1e40af",fontWeight:"700"},splitArrow:{color:"#64748b",fontSize:"0.9rem",margin:"6px 0"},visualizer:{backgroundColor:"#f8fafc",borderRadius:"24px",padding:"2rem",border:"1px solid #f1f5f9",display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem",marginBottom:"1.5rem"},barsContainer:{display:"flex",alignItems:"flex-end",gap:"10px",height:"200px",padding:"0 1rem"},barWrap:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},bar:{width:"40px",borderRadius:"6px 6px 0 0",transition:"background-color 0.3s",minHeight:"20px"},barLabel:{fontSize:"0.8rem",fontWeight:"700",color:"#475569"},messageBox:{backgroundColor:"#1e293b",color:"#fff",padding:"0.7rem 1.5rem",borderRadius:"12px",fontSize:"1rem",fontWeight:"700"},legend:{display:"flex",gap:"1.5rem",flexWrap:"wrap",justifyContent:"center"},legendItem:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.9rem",color:"#64748b",fontWeight:"600"},dot:{width:"12px",height:"12px",borderRadius:"50%"},controls:{display:"flex",justifyContent:"center",gap:"1rem",marginBottom:"2rem",flexWrap:"wrap"},btn:{padding:"0.75rem 1.5rem",borderRadius:"12px",border:"none",color:"#fff",fontWeight:"700",cursor:"pointer",fontSize:"1rem",opacity:.9},codeSection:{marginBottom:"3rem"},subTitle:{fontSize:"1.5rem",fontWeight:"900",color:"#1e293b",marginBottom:"1.5rem",textAlign:"center"},langSelector:{display:"flex",justifyContent:"center",gap:"0.75rem",marginBottom:"1.25rem"},langBtn:{padding:"0.6rem 1.2rem",borderRadius:"10px",fontSize:"0.9rem",fontWeight:"700",cursor:"pointer",transition:"all 0.2s"},codeBox:{backgroundColor:"#0f172a",color:"#f8fafc",padding:"1.5rem",borderRadius:"20px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",fontFamily:"monospace"},quizSection:{marginTop:"2rem"},quizGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"1.5rem"},quizCard:{backgroundColor:"#f8fafc",padding:"1.5rem",borderRadius:"20px",border:"1px solid #f1f5f9"},question:{fontWeight:"700",color:"#1e293b",marginBottom:"0.75rem",fontSize:"1rem"},answer:{color:"#10b981",fontWeight:"600",lineHeight:"1.5",fontSize:"0.95rem"}},Ke=t=>new Promise(n=>setTimeout(n,t)),Xe=[9,4,7,3,8,2,6,5],Vt=()=>{const[t,n]=i.useState([...Xe]),[a,d]=i.useState(null),[o,x]=i.useState([]),[u,b]=i.useState([]),[C,R]=i.useState(new Set),[I,j]=i.useState(""),[A,r]=i.useState(!1),[c,p]=i.useState(!1),[l,y]=i.useState("python"),{showFeedback:B}=le(),[H,M]=i.useState(!0),T=i.useRef(!1),$=Math.max(...Xe),v=()=>{T.current=!0,setTimeout(()=>{T.current=!1},100),n([...Xe]),d(null),x([]),b([]),R(new Set),j(""),r(!1),p(!1)},D=async(s,m,k)=>{const S=s[k];d(k),j(`Pivot: ${S} at index ${k}`),B(`New Pivot selected: ${S}! 🎯`),await Ke(600);let g=m-1;for(let f=m;f<k;f++){if(T.current)return g;x([f,k]),j(`Comparing ${s[f]} with pivot ${S}`),await Ke(400),s[f]<=S&&(g++,g!==f&&(b([g,f]),[s[g],s[f]]=[s[f],s[g]],n([...s]),await Ke(350),b([])))}return g++,[s[g],s[k]]=[s[k],s[g]],n([...s]),d(null),x([]),R(f=>new Set([...f,g])),j(`Pivot ${S} placed at index ${g}`),await Ke(400),window.AppProgress&&window.AppProgress.markMetaphorCompleted("QuickSort"),g},z=async(s,m,k)=>{if(m>=k||T.current)return;const S=await D(s,m,k);await z(s,m,S-1),await z(s,S+1,k)},E=async()=>{T.current=!1,r(!0),p(!1),R(new Set);const s=[...Xe];n([...s]),await z(s,0,s.length-1),T.current||(R(new Set(Array.from({length:s.length},(m,k)=>k))),j("✓ Array is sorted!"),B("Quick Sort complete! That was fast ⚡","success"),r(!1),p(!0))},h=s=>u.includes(s)?"#ef4444":s===a?"#a855f7":o.includes(s)?"#fbbf24":C.has(s)?"#4ade80":"#e2e8f0";return e.jsxs("div",{style:ie.container,children:[e.jsxs("div",{style:ie.header,children:[e.jsx("h2",{style:ie.title,children:"Quick Sort — Pivot Organizer ⚡"}),e.jsx("div",{style:ie.desc,children:e.jsxs("p",{children:["Quick Sort is all about picking a ",e.jsx("strong",{children:"Hero (Pivot)"})," and organizing the crowd — everyone smaller goes left, everyone bigger goes right!"]})})]}),e.jsxs("div",{style:ie.visualizer,children:[e.jsx("div",{style:ie.barsContainer,children:t.map((s,m)=>e.jsxs(q.div,{style:ie.barWrap,layout:!0,transition:{type:"spring",stiffness:300,damping:30},className:u.includes(m)||m===a?"pulse-glow":"",children:[e.jsx("div",{style:{...ie.bar,height:`${s/$*160+20}px`,backgroundColor:h(m),boxShadow:m===a?"0 0 15px rgba(168, 85, 247, 0.4)":u.includes(m)?"0 0 15px rgba(239, 68, 68, 0.4)":"none"}}),e.jsx("span",{style:ie.barLabel,children:s})]},m))}),e.jsx(X,{children:I&&e.jsx(q.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0},style:ie.messageBox,children:I})}),e.jsx("div",{style:ie.legend,children:[["#a855f7","Pivot"],["#fbbf24","Comparing"],["#ef4444","Swapping"],["#4ade80","Sorted"]].map(([s,m])=>e.jsxs("div",{style:ie.legendItem,children:[e.jsx("div",{style:{...ie.dot,backgroundColor:s}}),e.jsx("span",{children:m})]},m))})]}),e.jsxs("div",{style:ie.controls,children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx("button",{onClick:()=>{E(),M(!1)},disabled:A,style:{...ie.btn,backgroundColor:"#4f46e5"},children:"▶ Go Fast! (Quick Sort) ⚡"}),H&&!A&&e.jsx("div",{className:"tooltip-hint",style:{bottom:"110%",left:"50%"},children:"Pick a pivot and go! ✨"})]}),e.jsx("button",{onClick:()=>{c||(E(),M(!1))},disabled:A||c,style:{...ie.btn,backgroundColor:"#0891b2"},children:"⏭ Take a Step"}),e.jsx("button",{onClick:v,style:{...ie.btn,backgroundColor:"#ef4444"},children:"↺ Reset All"})]}),e.jsxs("div",{style:ie.codeSection,children:[e.jsx("h3",{style:ie.subTitle,children:"Quick Sort Implementation"}),e.jsx("div",{style:ie.langSelector,children:["python","javascript","cpp"].map(s=>e.jsx("button",{onClick:()=>y(s),style:{...ie.langBtn,backgroundColor:l===s?"#4f46e5":"#f1f5f9",color:l===s?"#fff":"#64748b",border:l===s?"none":"1px solid #e2e8f0"},children:s==="cpp"?"C++":s.toUpperCase()},s))}),e.jsxs("pre",{style:ie.codeBox,children:[l==="python"&&e.jsx("code",{children:`def quick_sort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quick_sort(arr, low, pi - 1)
        quick_sort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return i + 1

# Time:  O(n log n) avg, O(n²) worst
# Space: O(log n)`}),l==="javascript"&&e.jsx("code",{children:`function quickSort(arr, low=0, high=arr.length-1) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
    return arr;
}
function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i+1], arr[high]] = [arr[high], arr[i+1]];
    return i + 1;
}
// Time: O(n log n) avg  Space: O(log n)`}),l==="cpp"&&e.jsx("code",{children:`int partition(vector<int>& arr, int low, int high){
    int pivot=arr[high], i=low-1;
    for(int j=low;j<high;j++)
        if(arr[j]<=pivot) swap(arr[++i],arr[j]);
    swap(arr[i+1],arr[high]);
    return i+1;
}
void quickSort(vector<int>&arr,int low,int high){
    if(low<high){
        int pi=partition(arr,low,high);
        quickSort(arr,low,pi-1);
        quickSort(arr,pi+1,high);
    }
}
// Time: O(n log n) avg  Space: O(log n)`})]})]}),e.jsxs("div",{style:ie.quizSection,children:[e.jsx("h3",{style:ie.subTitle,children:"Knowledge Check"}),e.jsx("div",{style:ie.quizGrid,children:[{q:"What is a pivot in Quick Sort?",a:"An element chosen from the array that partitions it — all smaller elements go left, all larger go right."},{q:"What is the average time complexity?",a:"O(n log n) — each partition splits the array roughly in half over log n levels, each with O(n) work."},{q:"Why is Quick Sort usually faster in practice?",a:"Excellent cache locality, in-place partitioning, and low constant factors make it the fastest general-purpose sort in real scenarios."},{q:"What happens in the worst case?",a:"O(n²) when the pivot is always the min or max element. Randomized pivot selection prevents this."}].map((s,m)=>e.jsxs("div",{style:ie.quizCard,children:[e.jsxs("p",{style:ie.question,children:[e.jsxs("strong",{children:["Q",m+1,":"]})," ",s.q]}),e.jsx("p",{style:ie.answer,children:s.a})]},m))})]})]})},ie={container:{padding:"2rem",backgroundColor:"#fff",borderRadius:"32px",border:"1px solid #e2e8f0",boxShadow:"0 4px 6px -1px rgba(0,0,0,0.05)",fontFamily:"system-ui, sans-serif"},header:{textAlign:"center",marginBottom:"2rem"},title:{fontSize:"2rem",fontWeight:"900",color:"#1e293b",letterSpacing:"-0.025em",marginBottom:"1rem"},desc:{color:"#64748b",fontSize:"1.05rem",lineHeight:"1.7",maxWidth:"750px",margin:"0 auto"},visualizer:{backgroundColor:"#f8fafc",borderRadius:"24px",padding:"2rem",display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem",marginBottom:"1.5rem",border:"1px solid #f1f5f9"},barsContainer:{display:"flex",alignItems:"flex-end",gap:"10px",height:"200px",padding:"0 1rem"},barWrap:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},bar:{width:"40px",borderRadius:"6px 6px 0 0",transition:"background-color 0.3s",minHeight:"20px"},barLabel:{fontSize:"0.8rem",fontWeight:"700",color:"#475569"},messageBox:{backgroundColor:"#1e293b",color:"#fff",padding:"0.7rem 1.5rem",borderRadius:"12px",fontSize:"1rem",fontWeight:"700"},legend:{display:"flex",gap:"1.5rem",flexWrap:"wrap",justifyContent:"center"},legendItem:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.9rem",color:"#64748b",fontWeight:"600"},dot:{width:"12px",height:"12px",borderRadius:"50%"},controls:{display:"flex",justifyContent:"center",gap:"1rem",marginBottom:"2rem",flexWrap:"wrap"},btn:{padding:"0.75rem 1.5rem",borderRadius:"12px",border:"none",color:"#fff",fontWeight:"700",cursor:"pointer",fontSize:"1rem",opacity:.9},codeSection:{marginBottom:"3rem"},subTitle:{fontSize:"1.5rem",fontWeight:"900",color:"#1e293b",marginBottom:"1.5rem",textAlign:"center"},langSelector:{display:"flex",justifyContent:"center",gap:"0.75rem",marginBottom:"1.25rem"},langBtn:{padding:"0.6rem 1.2rem",borderRadius:"10px",fontSize:"0.9rem",fontWeight:"700",cursor:"pointer",transition:"all 0.2s"},codeBox:{backgroundColor:"#0f172a",color:"#f8fafc",padding:"1.5rem",borderRadius:"20px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",fontFamily:"monospace"},quizSection:{marginTop:"2rem"},quizGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"1.5rem"},quizCard:{backgroundColor:"#f8fafc",padding:"1.5rem",borderRadius:"20px",border:"1px solid #f1f5f9"},question:{fontWeight:"700",color:"#1e293b",marginBottom:"0.75rem",fontSize:"1rem"},answer:{color:"#10b981",fontWeight:"600",lineHeight:"1.5",fontSize:"0.95rem"}},_e=t=>new Promise(n=>setTimeout(n,t)),Ye=[6,3,8,2,7,1,5,4],Qt=()=>{const[t,n]=i.useState([...Ye]),[a,d]=i.useState(null),[o,x]=i.useState([]),[u,b]=i.useState([]),[C,R]=i.useState(new Set),[I,j]=i.useState(""),[A,r]=i.useState(!1),[c,p]=i.useState(!1),[l,y]=i.useState("python"),{showFeedback:B}=le(),[H,M]=i.useState(!0),T=i.useRef(!1),$=Math.max(...Ye),v=()=>{T.current=!0,setTimeout(()=>{T.current=!1},100),n([...Ye]),d(null),x([]),b([]),R(new Set),j(""),r(!1),p(!1)},D=async(h,s,m)=>{if(T.current)return;let k=m;const S=2*m+1,g=2*m+2;d(m),x(Array.from({length:s},(f,F)=>F)),S<s&&h[S]>h[k]&&(k=S),g<s&&h[g]>h[k]&&(k=g),k!==m&&(b([m,k]),j(`Heapify: swap arr[${m}]=${h[m]} ↔ arr[${k}]=${h[k]}`),[h[m],h[k]]=[h[k],h[m]],n([...h]),await _e(500),b([]),await D(h,s,k))},z=async()=>{T.current=!1,r(!0),p(!1),R(new Set);const h=[...Ye];n([...h]);const s=h.length;j("Building max heap...");for(let k=Math.floor(s/2)-1;k>=0;k--){if(T.current)return;await D(h,s,k),await _e(300)}j("Max heap built! Now extracting elements..."),B("Max heap built! High-priority items at the top 🏔️"),await _e(500);const m=new Set;for(let k=s-1;k>0;k--){if(T.current)return;d(0),b([0,k]),j(`Swap root (${h[0]}) with last heap element (${h[k]})`),[h[0],h[k]]=[h[k],h[0]],n([...h]),await _e(500),b([]),m.add(k),R(new Set([...m])),await D(h,k,0),await _e(200),window.AppProgress&&window.AppProgress.markMetaphorCompleted("HeapSort")}m.add(0),R(new Set([...m])),d(null),x([]),b([]),j("✓ Array is sorted!"),B("Heap Sort complete! Efficiency at its peak 🏆","success"),r(!1),p(!0)},E=h=>u.includes(h)?"#ef4444":h===a?"#a855f7":C.has(h)?"#4ade80":o.includes(h)?"#3b82f6":"#e2e8f0";return t.slice(0,7),C.size,e.jsxs("div",{style:_.container,children:[e.jsxs("div",{style:_.header,children:[e.jsx("h2",{style:_.title,children:"Heap Sort — Priority Heap Organizer 🏔"}),e.jsx("div",{style:_.desc,children:e.jsxs("p",{children:["Heap Sort is like organizing a mountain of tasks. We build a ",e.jsx("strong",{children:"Priority Heap"})," where the biggest items float to the top, then move them to their final spot!"]})})]}),e.jsxs("div",{style:_.treeSection,children:[e.jsx("div",{style:_.treeLabel,children:"Binary Heap Tree (first 7 nodes)"}),e.jsxs("div",{style:_.treeWrap,children:[e.jsx("div",{style:_.treeRow,children:e.jsx("div",{style:{..._.treeNode,background:E(0),boxShadow:a===0?"0 0 15px rgba(168, 85, 247, 0.5)":"none"},className:a===0?"pulse-glow":"",children:t[0]})}),e.jsx("div",{style:_.treeRow,children:[1,2].map(h=>e.jsx("div",{style:{..._.treeNode,background:h<t.length?E(h):"#f1f5f9",opacity:h<t.length?1:.3},children:h<t.length?t[h]:""},h))}),e.jsx("div",{style:_.treeRow,children:[3,4,5,6].map(h=>e.jsx("div",{style:{..._.treeNode,background:h<t.length?E(h):"#f1f5f9",opacity:h<t.length?1:.3},children:h<t.length?t[h]:""},h))})]})]}),e.jsxs("div",{style:_.visualizer,children:[e.jsx("div",{style:_.vizLabel,children:"Array Representation"}),e.jsx("div",{style:_.barsContainer,children:t.map((h,s)=>e.jsxs(q.div,{style:_.barWrap,layout:!0,transition:{type:"spring",stiffness:300,damping:30},className:u.includes(s)||s===a?"pulse-glow":"",children:[e.jsx("div",{style:{..._.bar,height:`${h/$*140+20}px`,backgroundColor:E(s),boxShadow:u.includes(s)?"0 0 15px rgba(239, 68, 68, 0.4)":s===a?"0 0 15px rgba(168, 85, 247, 0.4)":"none"}}),e.jsx("span",{style:_.barLabel,children:h})]},s))}),e.jsx(X,{children:I&&e.jsx(q.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0},style:_.messageBox,children:I})}),e.jsx("div",{style:_.legend,children:[["#a855f7","Root"],["#3b82f6","Heap"],["#ef4444","Swapping"],["#4ade80","Sorted"]].map(([h,s])=>e.jsxs("div",{style:_.legendItem,children:[e.jsx("div",{style:{..._.dot,backgroundColor:h}}),e.jsx("span",{children:s})]},s))})]}),e.jsxs("div",{style:_.controls,children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx("button",{onClick:()=>{z(),M(!1)},disabled:A,style:{..._.btn,backgroundColor:"#4f46e5"},children:"▶ Build & Sort Heap! 🏔️"}),H&&!A&&e.jsx("div",{className:"tooltip-hint",style:{bottom:"110%",left:"50%"},children:"Build the mountain to start! ✨"})]}),e.jsx("button",{onClick:()=>{c||(z(),M(!1))},disabled:A||c,style:{..._.btn,backgroundColor:"#0891b2"},children:"⏭ Take a Step"}),e.jsx("button",{onClick:v,style:{..._.btn,backgroundColor:"#ef4444"},children:"↺ Reset Everything"})]}),e.jsxs("div",{style:_.codeSection,children:[e.jsx("h3",{style:_.subTitle,children:"Heap Sort Implementation"}),e.jsx("div",{style:_.langSelector,children:["python","javascript","cpp"].map(h=>e.jsx("button",{onClick:()=>y(h),style:{..._.langBtn,backgroundColor:l===h?"#4f46e5":"#f1f5f9",color:l===h?"#fff":"#64748b",border:l===h?"none":"1px solid #e2e8f0"},children:h==="cpp"?"C++":h.toUpperCase()},h))}),e.jsxs("pre",{style:_.codeBox,children:[l==="python"&&e.jsx("code",{children:`def heap_sort(arr):
    n = len(arr)
    # Build max heap
    for i in range(n // 2 - 1, -1, -1):
        heapify(arr, n, i)
    # Extract elements one by one
    for i in range(n - 1, 0, -1):
        arr[0], arr[i] = arr[i], arr[0]
        heapify(arr, i, 0)

def heapify(arr, n, i):
    largest = i
    l, r = 2*i+1, 2*i+2
    if l < n and arr[l] > arr[largest]: largest = l
    if r < n and arr[r] > arr[largest]: largest = r
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        heapify(arr, n, largest)

# Time:  O(n log n) — all cases
# Space: O(1) — in-place`}),l==="javascript"&&e.jsx("code",{children:`function heapSort(arr) {
    const n = arr.length;
    for (let i = Math.floor(n/2)-1; i >= 0; i--)
        heapify(arr, n, i);
    for (let i = n-1; i > 0; i--) {
        [arr[0], arr[i]] = [arr[i], arr[0]];
        heapify(arr, i, 0);
    }
    return arr;
}
function heapify(arr, n, i) {
    let largest = i, l=2*i+1, r=2*i+2;
    if (l<n && arr[l]>arr[largest]) largest=l;
    if (r<n && arr[r]>arr[largest]) largest=r;
    if (largest!==i) {
        [arr[i],arr[largest]]=[arr[largest],arr[i]];
        heapify(arr,n,largest);
    }
}
// Time: O(n log n)  Space: O(1)`}),l==="cpp"&&e.jsx("code",{children:`void heapify(vector<int>&arr,int n,int i){
    int largest=i,l=2*i+1,r=2*i+2;
    if(l<n&&arr[l]>arr[largest])largest=l;
    if(r<n&&arr[r]>arr[largest])largest=r;
    if(largest!=i){
        swap(arr[i],arr[largest]);
        heapify(arr,n,largest);
    }
}
void heapSort(vector<int>&arr){
    int n=arr.size();
    for(int i=n/2-1;i>=0;i--)
        heapify(arr,n,i);
    for(int i=n-1;i>0;i--){
        swap(arr[0],arr[i]);
        heapify(arr,i,0);
    }
}
// Time: O(n log n)  Space: O(1)`})]})]}),e.jsxs("div",{style:_.quizSection,children:[e.jsx("h3",{style:_.subTitle,children:"Knowledge Check"}),e.jsx("div",{style:_.quizGrid,children:[{q:"What data structure does Heap Sort rely on?",a:"A binary max heap — a complete binary tree where each parent node is greater than or equal to its children."},{q:"What are the two main phases of Heap Sort?",a:"Build max heap (O(n)), then repeatedly extract the maximum element and heapify the remaining heap (O(n log n) total)."},{q:"What is the time complexity of Heap Sort?",a:"O(n log n) in all cases — best, average, and worst. It never degrades unlike Quick Sort."},{q:"Why is Heap Sort not cache-friendly?",a:"It accesses elements far apart in memory (parent/child in a heap array), causing more cache misses than algorithms like Insertion Sort on small data."}].map((h,s)=>e.jsxs("div",{style:_.quizCard,children:[e.jsxs("p",{style:_.question,children:[e.jsxs("strong",{children:["Q",s+1,":"]})," ",h.q]}),e.jsx("p",{style:_.answer,children:h.a})]},s))})]})]})},_={container:{padding:"2rem",backgroundColor:"#fff",borderRadius:"32px",border:"1px solid #e2e8f0",boxShadow:"0 4px 6px -1px rgba(0,0,0,0.05)",fontFamily:"system-ui, sans-serif"},header:{textAlign:"center",marginBottom:"1.5rem"},title:{fontSize:"2rem",fontWeight:"900",color:"#1e293b",letterSpacing:"-0.025em",marginBottom:"1rem"},desc:{color:"#64748b",fontSize:"1.05rem",lineHeight:"1.7",maxWidth:"750px",margin:"0 auto"},treeSection:{backgroundColor:"#f8fafc",borderRadius:"20px",padding:"1.5rem",marginBottom:"1.5rem",border:"1px solid #f1f5f9",display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem"},treeLabel:{fontSize:"0.9rem",fontWeight:"700",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.05em"},treeWrap:{display:"flex",flexDirection:"column",alignItems:"center",gap:"12px"},treeRow:{display:"flex",gap:"16px",justifyContent:"center"},treeNode:{width:"44px",height:"44px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"900",fontSize:"1rem",color:"#1e293b",border:"2px solid rgba(0,0,0,0.08)",transition:"background-color 0.3s"},visualizer:{backgroundColor:"#f8fafc",borderRadius:"24px",padding:"2rem",border:"1px solid #f1f5f9",display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem",marginBottom:"1.5rem"},vizLabel:{fontSize:"0.9rem",fontWeight:"700",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.05em"},barsContainer:{display:"flex",alignItems:"flex-end",gap:"10px",height:"180px",padding:"0 1rem"},barWrap:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},bar:{width:"40px",borderRadius:"6px 6px 0 0",transition:"background-color 0.3s",minHeight:"20px"},barLabel:{fontSize:"0.8rem",fontWeight:"700",color:"#475569"},messageBox:{backgroundColor:"#1e293b",color:"#fff",padding:"0.7rem 1.5rem",borderRadius:"12px",fontSize:"1rem",fontWeight:"700"},legend:{display:"flex",gap:"1.5rem",flexWrap:"wrap",justifyContent:"center"},legendItem:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.9rem",color:"#64748b",fontWeight:"600"},dot:{width:"12px",height:"12px",borderRadius:"50%"},controls:{display:"flex",justifyContent:"center",gap:"1rem",marginBottom:"2rem",flexWrap:"wrap"},btn:{padding:"0.75rem 1.5rem",borderRadius:"12px",border:"none",color:"#fff",fontWeight:"700",cursor:"pointer",fontSize:"1rem",opacity:.9},codeSection:{marginBottom:"3rem"},subTitle:{fontSize:"1.5rem",fontWeight:"900",color:"#1e293b",marginBottom:"1.5rem",textAlign:"center"},langSelector:{display:"flex",justifyContent:"center",gap:"0.75rem",marginBottom:"1.25rem"},langBtn:{padding:"0.6rem 1.2rem",borderRadius:"10px",fontSize:"0.9rem",fontWeight:"700",cursor:"pointer",transition:"all 0.2s"},codeBox:{backgroundColor:"#0f172a",color:"#f8fafc",padding:"1.5rem",borderRadius:"20px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",fontFamily:"monospace"},quizSection:{marginTop:"2rem"},quizGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"1.5rem"},quizCard:{backgroundColor:"#f8fafc",padding:"1.5rem",borderRadius:"20px",border:"1px solid #f1f5f9"},question:{fontWeight:"700",color:"#1e293b",marginBottom:"0.75rem",fontSize:"1rem"},answer:{color:"#10b981",fontWeight:"600",lineHeight:"1.5",fontSize:"0.95rem"}},Gt=t=>new Promise(n=>setTimeout(n,t)),pt=[{id:"sort-colors",title:"Sort Colors",desc:"Sort an array containing 0s, 1s, and 2s using the Dutch National Flag algorithm in O(n) with a single pass.",difficulty:"Easy",tag:"🎨"},{id:"merge-sorted",title:"Merge Two Sorted Arrays",desc:"Merge two sorted arrays into a single sorted array using a two-pointer technique.",difficulty:"Easy",tag:"🔗"},{id:"kth-largest",title:"Kth Largest Element",desc:"Find the kth largest element in an unsorted array using a min-heap of size k.",difficulty:"Medium",tag:"🏆"},{id:"top-k-frequent",title:"Top K Frequent Elements",desc:"Return the k most frequent elements using a frequency map and heap sorting.",difficulty:"Medium",tag:"📊"},{id:"merge-intervals",title:"Merge Intervals",desc:"Sort intervals by start time, then merge all overlapping intervals into one.",difficulty:"Medium",tag:"📐"},{id:"quickselect",title:"QuickSelect Kth Element",desc:"Use QuickSelect partitioning to find the kth smallest element in O(n) average time.",difficulty:"Medium",tag:"⚡"},{id:"sort-linked-list",title:"Sort a Linked List",desc:"Sort a singly linked list using Merge Sort — split into halves, sort each, then merge.",difficulty:"Hard",tag:"🔗"},{id:"count-inversions",title:"Count Inversions",desc:"Count pairs (i,j) where i<j but arr[i]>arr[j] — solved efficiently with Merge Sort.",difficulty:"Hard",tag:"🔢"}],ut=t=>({padding:"3px 10px",borderRadius:"999px",fontSize:"12px",fontWeight:"700",backgroundColor:t==="Easy"?"#dcfce7":t==="Medium"?"#fff7ed":"#fee2e2",color:t==="Easy"?"#15803d":t==="Medium"?"#c2410c":"#b91c1c",display:"inline-block"}),Ut=()=>{const t=[2,0,1,2,1,0,2,1,0,1],[n,a]=i.useState([...t]),[d,o]=i.useState(null),[x,u]=i.useState(null),[b,C]=i.useState(null),[R,I]=i.useState(""),[j,A]=i.useState(!1),[r,c]=i.useState(!1);i.useRef(!1);const p={0:"#3b82f6",1:"#f8fafc",2:"#ef4444"},l={0:"#1d4ed8",1:"#94a3b8",2:"#991b1b"};return e.jsxs("div",{style:ue.wrap,children:[e.jsxs("div",{style:ue.desc,children:["Dutch National Flag: three pointers ",e.jsx("strong",{children:"lo"}),", ",e.jsx("strong",{children:"mid"}),", ",e.jsx("strong",{children:"hi"})," partition 0s left, 1s middle, 2s right in one pass."]}),e.jsxs("div",{style:ue.vizArea,children:[e.jsx("div",{style:{display:"flex",gap:"8px",alignItems:"flex-end",justifyContent:"center",flexWrap:"wrap"},children:n.map((y,B)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},children:[e.jsx("div",{style:{...ue.cell,backgroundColor:p[y],border:`2px solid ${l[y]}`,outline:B===x?"3px solid #f59e0b":B===d?"3px solid #6366f1":B===b?"3px solid #ec4899":"none",outlineOffset:"2px"},children:y}),e.jsx("span",{style:{fontSize:"0.65rem",fontWeight:"700",color:B===d?"#6366f1":B===x?"#f59e0b":B===b?"#ec4899":"#94a3b8"},children:B===d?"lo":B===x?"mid":B===b?"hi":""})]},B))}),R&&e.jsx("div",{style:ue.msg,children:R})]}),e.jsxs("div",{style:ue.legend,children:[e.jsx("span",{style:{color:"#3b82f6",fontWeight:"700"},children:"■ 0 (Blue)"}),e.jsx("span",{style:{color:"#64748b",fontWeight:"700"},children:"■ 1 (White)"}),e.jsx("span",{style:{color:"#ef4444",fontWeight:"700"},children:"■ 2 (Red)"})]})]})},Kt=()=>{const t=[1,3,5,7],n=[2,4,6,8],[a,d]=i.useState([]),[o,x]=i.useState(null),[u,b]=i.useState(null),[C,R]=i.useState(""),[I,j]=i.useState(!1),[A,r]=i.useState(!1);return i.useRef(!1),e.jsxs("div",{style:ue.wrap,children:[e.jsx("div",{style:ue.desc,children:"Two-pointer merge: compare front elements from each sorted array, always picking the smaller one."}),e.jsxs("div",{style:ue.vizArea,children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px",alignItems:"center"},children:[e.jsxs("div",{style:{display:"flex",gap:"4px",alignItems:"center"},children:[e.jsx("span",{style:{fontWeight:"700",color:"#4f46e5",marginRight:"8px",width:"24px"},children:"A:"}),t.map((c,p)=>e.jsx("div",{style:{...ue.cell,backgroundColor:p===o?"#fbbf24":"#dbeafe",border:"2px solid #93c5fd"},children:c},p))]}),e.jsxs("div",{style:{display:"flex",gap:"4px",alignItems:"center"},children:[e.jsx("span",{style:{fontWeight:"700",color:"#0891b2",marginRight:"8px",width:"24px"},children:"B:"}),n.map((c,p)=>e.jsx("div",{style:{...ue.cell,backgroundColor:p===u?"#fbbf24":"#dcfce7",border:"2px solid #86efac"},children:c},p))]}),e.jsxs("div",{style:{display:"flex",gap:"4px",alignItems:"center"},children:[e.jsx("span",{style:{fontWeight:"700",color:"#15803d",marginRight:"8px",width:"24px"},children:"→"}),a.map((c,p)=>e.jsx("div",{style:{...ue.cell,backgroundColor:"#4ade80",border:"2px solid #16a34a"},children:c},p)),a.length===0&&e.jsx("span",{style:{color:"#94a3b8",fontSize:"0.85rem"},children:"merged result appears here"})]})]}),C&&e.jsx("div",{style:ue.msg,children:C})]})]})},He=({title:t,steps:n,initState:a})=>{const[d,o]=i.useState(0),[x,u]=i.useState(!1),[b,C]=i.useState(!1),[R,I]=i.useState(a),j=i.useRef(!1),A=()=>{j.current=!0,setTimeout(()=>{j.current=!1},100),o(0),u(!1),C(!1),I(a)},r=async()=>{j.current=!1,C(!0),u(!1);for(let l=0;l<n.length;l++){if(j.current)return;o(l),I(n[l].state),await Gt(900)}u(!0),C(!1),o(n.length-1),window.AppProgress&&window.AppProgress.markProblemSolved()},c=()=>{if(x||b)return;const l=Math.min(d+1,n.length-1);o(l),I(n[l].state),l===n.length-1&&u(!0)},p=n[d];return e.jsxs("div",{style:ue.wrap,children:[e.jsx("div",{style:ue.desc,children:t}),e.jsxs("div",{style:ue.vizArea,children:[e.jsx("div",{style:{display:"flex",gap:"6px",alignItems:"flex-end",justifyContent:"center",flexWrap:"wrap",marginBottom:"12px"},children:R.map((l,y)=>e.jsx("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},children:e.jsx("div",{style:{...ue.cell,backgroundColor:l.color||"#e2e8f0",border:`2px solid ${l.border||"#94a3b8"}`,minWidth:l.label?"50px":"40px",fontSize:l.label?"0.7rem":"0.9rem"},children:l.label||l.val})},y))}),p&&e.jsx("div",{style:ue.msg,children:p.msg})]}),e.jsxs("div",{style:ue.controls,children:[e.jsx("button",{onClick:r,disabled:b,style:ue.btn("#4f46e5"),children:"▶ Start"}),e.jsx("button",{onClick:c,disabled:b||x,style:ue.btn("#0891b2"),children:"⏭ Step"}),e.jsx("button",{onClick:A,style:ue.btn("#ef4444"),children:"↺ Reset"})]})]})},Xt=(()=>{const t=[3,2,1,5,6,4],n=2,a=[],d=[];d.push({msg:`Find ${n}nd largest in [${t.join(", ")}]. Build min-heap of size ${n}.`,state:t.map(o=>({val:o,color:"#e2e8f0",border:"#94a3b8"}))});for(let o=0;o<t.length;o++)a.push(t[o]),a.sort((x,u)=>x-u),a.length>n&&a.shift(),d.push({msg:`Add ${t[o]} to heap. Heap: [${a.join(", ")}]`,state:t.map((x,u)=>({val:x,color:u<=o?"#dbeafe":"#e2e8f0",border:u<=o?"#93c5fd":"#94a3b8"}))});return d.push({msg:`✓ Heap root = ${a[0]} is the ${n}nd largest element!`,state:t.map(o=>({val:o,color:o===a[0]?"#4ade80":"#dbeafe",border:o===a[0]?"#16a34a":"#93c5fd"}))}),d})(),Yt=[{msg:"Input intervals: [[1,3],[2,6],[8,10],[15,18]]. Sort by start time.",state:[{label:"[1,3]",color:"#dbeafe",border:"#93c5fd"},{label:"[2,6]",color:"#dbeafe",border:"#93c5fd"},{label:"[8,10]",color:"#dbeafe",border:"#93c5fd"},{label:"[15,18]",color:"#dbeafe",border:"#93c5fd"}]},{msg:"Compare [1,3] and [2,6]: 2 ≤ 3, they overlap! Merge → [1,6]",state:[{label:"[1,6]",color:"#fbbf24",border:"#d97706"},{label:"[8,10]",color:"#dbeafe",border:"#93c5fd"},{label:"[15,18]",color:"#dbeafe",border:"#93c5fd"}]},{msg:"Compare [1,6] and [8,10]: 8 > 6, no overlap. Keep both.",state:[{label:"[1,6]",color:"#4ade80",border:"#16a34a"},{label:"[8,10]",color:"#fbbf24",border:"#d97706"},{label:"[15,18]",color:"#dbeafe",border:"#93c5fd"}]},{msg:"Compare [8,10] and [15,18]: 15 > 10, no overlap. Keep both.",state:[{label:"[1,6]",color:"#4ade80",border:"#16a34a"},{label:"[8,10]",color:"#4ade80",border:"#16a34a"},{label:"[15,18]",color:"#fbbf24",border:"#d97706"}]},{msg:"✓ Merged: [[1,6],[8,10],[15,18]]",state:[{label:"[1,6]",color:"#4ade80",border:"#16a34a"},{label:"[8,10]",color:"#4ade80",border:"#16a34a"},{label:"[15,18]",color:"#4ade80",border:"#16a34a"}]}],Jt=(()=>{const t=[7,2,5,1,8];return[{msg:`Find 2nd smallest in [${t.join(", ")}]. Choose pivot = ${t[t.length-1]}.`,state:t.map((a,d)=>({val:a,color:d===t.length-1?"#a855f7":"#e2e8f0",border:d===t.length-1?"#7c3aed":"#94a3b8"}))},{msg:"Partition: values ≤ 8 go left, values > 8 go right.",state:[{val:7},{val:2},{val:5},{val:1},{val:8,color:"#a855f7",border:"#7c3aed"}].map(a=>({...a,color:a.color||"#fbbf24",border:a.border||"#d97706"}))},{msg:"Pivot 8 is at index 4. k=2 < 4, search left partition [7,2,5,1].",state:[7,2,5,1].map(a=>({val:a,color:"#dbeafe",border:"#93c5fd"}))},{msg:"New pivot = 1. Partition [7,2,5] vs 1. Pivot 1 is at index 0. k=2 > 0, search right.",state:[{val:1,color:"#a855f7",border:"#7c3aed"},{val:7},{val:2},{val:5}].map(a=>({...a,color:a.color||"#fbbf24",border:a.border||"#d97706"}))},{msg:"✓ 2nd smallest is 2!",state:[1,2,5,7,8].map((a,d)=>({val:a,color:d===1?"#4ade80":"#dbeafe",border:d===1?"#16a34a":"#93c5fd"}))}]})(),Zt=[{msg:"Input linked list: 4→2→1→3. Split into halves.",state:[{val:4},{val:2},{val:1},{val:3}].map(t=>({...t,color:"#dbeafe",border:"#93c5fd"}))},{msg:"Left half: 4→2, Right half: 1→3. Sort each recursively.",state:[{val:4,color:"#fbbf24",border:"#d97706"},{val:2,color:"#fbbf24",border:"#d97706"},{val:1,color:"#a855f7",border:"#7c3aed"},{val:3,color:"#a855f7",border:"#7c3aed"}]},{msg:"Left sorted: 2→4, Right sorted: 1→3. Now merge.",state:[{val:2},{val:4},{val:1},{val:3}].map(t=>({...t,color:"#4ade80",border:"#16a34a"}))},{msg:"Merge: compare 2 vs 1. Take 1.",state:[{val:1,color:"#4ade80",border:"#16a34a"},{val:2},{val:4},{val:3}].map(t=>({...t,color:t.color||"#fbbf24",border:t.border||"#d97706"}))},{msg:"✓ Sorted list: 1→2→3→4",state:[1,2,3,4].map(t=>({val:t,color:"#4ade80",border:"#16a34a"}))}],er=(()=>{const t=[3,1,2];return[{msg:`Count inversions in [${t.join(", ")}]. (i<j but arr[i]>arr[j])`,state:t.map(n=>({val:n,color:"#dbeafe",border:"#93c5fd"}))},{msg:"Split: [3] and [1,2]. Merge sort counts inversions during merge.",state:[{val:3,color:"#fbbf24",border:"#d97706"},{val:1,color:"#a855f7",border:"#7c3aed"},{val:2,color:"#a855f7",border:"#7c3aed"}]},{msg:"Merging [3] and [1,2]: 3 > 1 → +1 inversion (3,1). Merge 1 first.",state:[{val:1,color:"#4ade80",border:"#16a34a"},{val:3,color:"#fbbf24",border:"#d97706"},{val:2,color:"#fbbf24",border:"#d97706"}]},{msg:"3 > 2 → +1 inversion (3,2). Merge 2. Total: 2 inversions.",state:[{val:1,color:"#4ade80",border:"#16a34a"},{val:2,color:"#4ade80",border:"#16a34a"},{val:3,color:"#4ade80",border:"#16a34a"}]},{msg:"✓ Total inversions = 2: pairs (3,1) and (3,2)",state:[1,2,3].map(n=>({val:n,color:"#4ade80",border:"#16a34a"}))}]})(),tr=[{msg:"Input: [1,1,1,2,2,3], k=2. Build frequency map.",state:[{label:"1:3",color:"#dbeafe",border:"#93c5fd"},{label:"2:2",color:"#dbeafe",border:"#93c5fd"},{label:"3:1",color:"#dbeafe",border:"#93c5fd"}]},{msg:"Sort by frequency: 1(3 times) > 2(2 times) > 3(1 time).",state:[{label:"1:3",color:"#fbbf24",border:"#d97706"},{label:"2:2",color:"#fbbf24",border:"#d97706"},{label:"3:1",color:"#e2e8f0",border:"#94a3b8"}]},{msg:"✓ Top 2 frequent: [1, 2]",state:[{label:"1:3",color:"#4ade80",border:"#16a34a"},{label:"2:2",color:"#4ade80",border:"#16a34a"},{label:"3:1",color:"#e2e8f0",border:"#94a3b8"}]}],rr={"sort-colors":{python:`def sortColors(nums):
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
# Time: O(n)  Space: O(1)`,javascript:`function sortColors(nums) {
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
}`,cpp:`void sortColors(vector<int>& nums) {
    int lo=0, mid=0, hi=nums.size()-1;
    while (mid<=hi) {
        if (nums[mid]==0) swap(nums[lo++],nums[mid++]);
        else if (nums[mid]==1) mid++;
        else swap(nums[mid],nums[hi--]);
    }
}`},"merge-sorted":{python:`def merge(A, B):
    result = []
    i = j = 0
    while i < len(A) and j < len(B):
        if A[i] <= B[j]: result.append(A[i]); i += 1
        else: result.append(B[j]); j += 1
    result.extend(A[i:]); result.extend(B[j:])
    return result
# Time: O(n+m)  Space: O(n+m)`,javascript:`function merge(A, B) {
    const result = [];
    let i = 0, j = 0;
    while (i < A.length && j < B.length) {
        result.push(A[i] <= B[j] ? A[i++] : B[j++]);
    }
    return result.concat(A.slice(i)).concat(B.slice(j));
}`,cpp:`vector<int> merge(vector<int>& A,vector<int>& B){
    vector<int> res; int i=0,j=0;
    while(i<A.size()&&j<B.size())
        res.push_back(A[i]<=B[j]?A[i++]:B[j++]);
    while(i<A.size()) res.push_back(A[i++]);
    while(j<B.size()) res.push_back(B[j++]);
    return res;
}`},"kth-largest":{python:`import heapq
def findKthLargest(nums, k):
    heap = []
    for num in nums:
        heapq.heappush(heap, num)
        if len(heap) > k:
            heapq.heappop(heap)
    return heap[0]
# Time: O(n log k)  Space: O(k)`,javascript:`function findKthLargest(nums, k) {
    const minHeap = new MinPriorityQueue();
    for (const num of nums) {
        minHeap.enqueue(num);
        if (minHeap.size() > k) minHeap.dequeue();
    }
    return minHeap.front().element;
}`,cpp:`int findKthLargest(vector<int>& nums, int k){
    priority_queue<int,vector<int>,greater<int>> pq;
    for(int n:nums){
        pq.push(n);
        if(pq.size()>k) pq.pop();
    }
    return pq.top();
}`},"top-k-frequent":{python:`from collections import Counter
def topKFrequent(nums, k):
    count = Counter(nums)
    return sorted(count, key=count.get, reverse=True)[:k]
# Time: O(n log n)  Space: O(n)`,javascript:`function topKFrequent(nums, k) {
    const count = {};
    for (const n of nums) count[n] = (count[n] || 0) + 1;
    return Object.keys(count)
        .sort((a,b) => count[b]-count[a])
        .slice(0, k)
        .map(Number);
}`,cpp:`vector<int> topKFrequent(vector<int>& nums,int k){
    unordered_map<int,int> cnt;
    for(int n:nums) cnt[n]++;
    vector<pair<int,int>> v(cnt.begin(),cnt.end());
    sort(v.begin(),v.end(),[](auto&a,auto&b){return a.second>b.second;});
    vector<int> res;
    for(int i=0;i<k;i++) res.push_back(v[i].first);
    return res;
}`},"merge-intervals":{python:`def merge(intervals):
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged
# Time: O(n log n)  Space: O(n)`,javascript:`function merge(intervals) {
    intervals.sort((a,b) => a[0]-b[0]);
    const res = [intervals[0]];
    for (const [s,e] of intervals.slice(1)) {
        if (s <= res[res.length-1][1])
            res[res.length-1][1] = Math.max(res[res.length-1][1], e);
        else res.push([s,e]);
    }
    return res;
}`,cpp:`vector<vector<int>> merge(vector<vector<int>>& iv){
    sort(iv.begin(),iv.end());
    vector<vector<int>> res={iv[0]};
    for(auto& v:iv){
        if(v[0]<=res.back()[1])
            res.back()[1]=max(res.back()[1],v[1]);
        else res.push_back(v);
    }
    return res;
}`},quickselect:{python:`def findKthSmallest(nums, k):
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
# Time: O(n) avg  Space: O(1)`,javascript:`function kthSmallest(nums, k) {
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
}`,cpp:`int kthSmallest(vector<int>& nums,int k){
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
}`},"sort-linked-list":{python:`def sortList(head):
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
# Time: O(n log n)  Space: O(log n)`,javascript:`function sortList(head) {
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
}`,cpp:`ListNode* merge(ListNode* l1,ListNode* l2){
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
}`},"count-inversions":{python:`def countInversions(arr):
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
# Time: O(n log n)  Space: O(n)`,javascript:`function countInversions(arr) {
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
}`,cpp:`long long mergeCount(vector<int>& arr,int l,int r){
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
}`}},ir=({id:t})=>t==="sort-colors"?e.jsx(Ut,{}):t==="merge-sorted"?e.jsx(Kt,{}):t==="kth-largest"?e.jsx(He,{title:"Min-heap of size k: scan all elements, always keep k largest.",steps:Xt,initState:[3,2,1,5,6,4].map(n=>({val:n,color:"#e2e8f0",border:"#94a3b8"}))}):t==="top-k-frequent"?e.jsx(He,{title:"Build frequency map, sort by frequency, take top k.",steps:tr,initState:[{label:"1:?",color:"#e2e8f0",border:"#94a3b8"},{label:"2:?",color:"#e2e8f0",border:"#94a3b8"},{label:"3:?",color:"#e2e8f0",border:"#94a3b8"}]}):t==="merge-intervals"?e.jsx(He,{title:"Sort intervals by start, then greedily merge overlapping ones.",steps:Yt,initState:[{label:"[1,3]"},{label:"[2,6]"},{label:"[8,10]"},{label:"[15,18]"}].map(n=>({...n,color:"#dbeafe",border:"#93c5fd"}))}):t==="quickselect"?e.jsx(He,{title:"QuickSelect: partition around pivot, recurse only toward the target index.",steps:Jt,initState:[7,2,5,1,8].map(n=>({val:n,color:"#e2e8f0",border:"#94a3b8"}))}):t==="sort-linked-list"?e.jsx(He,{title:"Split linked list at midpoint, recursively sort each half, then merge.",steps:Zt,initState:[4,2,1,3].map(n=>({val:n,color:"#dbeafe",border:"#93c5fd"}))}):t==="count-inversions"?e.jsx(He,{title:"Modified Merge Sort: count inversions when merging — each out-of-order merge adds left.length - i inversions.",steps:er,initState:[3,1,2].map(n=>({val:n,color:"#dbeafe",border:"#93c5fd"}))}):null,nr=()=>{const[t,n]=i.useState(pt[0]),[a,d]=i.useState("python");return e.jsxs("div",{style:ve.outer,children:[e.jsxs("div",{style:ve.headerWrap,children:[e.jsx("h2",{style:ve.heading,children:"Sorting Practice Problems"}),e.jsx("p",{style:ve.sub,children:"Practice common sorting challenges and explore step-by-step animated solutions."})]}),e.jsxs("div",{style:ve.split,children:[e.jsx("div",{style:ve.left,children:pt.map(o=>e.jsxs("div",{onClick:()=>{n(o),d("python")},style:{...ve.card,boxShadow:t.id===o.id?"0 0 0 2px #4f46e5":"0 4px 10px rgba(0,0,0,0.05)",backgroundColor:t.id===o.id?"#f0f1fe":"#fff"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"6px"},children:[e.jsxs("span",{style:{fontWeight:"800",color:"#1e293b",fontSize:"0.98rem"},children:[o.tag," ",o.title]}),e.jsx("span",{style:ut(o.difficulty),children:o.difficulty})]}),e.jsx("p",{style:{fontSize:"0.82rem",color:"#64748b",margin:0,lineHeight:"1.5"},children:o.desc}),e.jsx("button",{style:{...ve.viewBtn,marginTop:"10px",backgroundColor:t.id===o.id?"#4f46e5":"#f1f5f9",color:t.id===o.id?"#fff":"#4f46e5"},children:t.id===o.id?"▸ Viewing Solution":"View Animated Solution"})]},o.id))}),e.jsx("div",{style:ve.right,children:e.jsx(X,{mode:"wait",children:e.jsx(q.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},exit:{opacity:0},transition:{duration:.25},children:e.jsxs("div",{style:ve.panel,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",flexWrap:"wrap",gap:"8px"},children:[e.jsxs("h3",{style:{margin:0,fontSize:"1.3rem",fontWeight:"900",color:"#1e293b"},children:[t.tag," ",t.title]}),e.jsx("span",{style:ut(t.difficulty),children:t.difficulty})]}),e.jsx("p",{style:{color:"#64748b",marginBottom:"20px",lineHeight:"1.6",fontSize:"0.95rem"},children:t.desc}),e.jsx(ir,{id:t.id}),e.jsxs("div",{style:{marginTop:"24px"},children:[e.jsx("h4",{style:{fontWeight:"800",color:"#1e293b",marginBottom:"12px"},children:"Implementation"}),e.jsx("div",{style:{display:"flex",gap:"8px",marginBottom:"12px",flexWrap:"wrap"},children:["python","javascript","cpp"].map(o=>e.jsx("button",{onClick:()=>d(o),style:{padding:"5px 14px",borderRadius:"8px",border:a===o?"none":"1px solid #e2e8f0",backgroundColor:a===o?"#4f46e5":"#f8fafc",color:a===o?"#fff":"#64748b",fontWeight:"700",cursor:"pointer",fontSize:"0.85rem"},children:o==="cpp"?"C++":o.toUpperCase()},o))}),e.jsx("pre",{style:{backgroundColor:"#0f172a",color:"#f8fafc",padding:"1.2rem",borderRadius:"14px",overflowX:"auto",fontSize:"0.85rem",lineHeight:"1.6",fontFamily:"monospace",margin:0},children:e.jsx("code",{children:rr[t.id]?.[a]||"// Coming soon"})})]})]})},t.id)})})]})]})},ue={wrap:{display:"flex",flexDirection:"column",gap:"12px"},desc:{fontSize:"0.9rem",color:"#64748b",lineHeight:"1.6",backgroundColor:"#f1f5f9",borderRadius:"10px",padding:"10px 14px"},vizArea:{backgroundColor:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:"14px",padding:"20px",display:"flex",flexDirection:"column",gap:"12px",alignItems:"center",minHeight:"120px"},cell:{width:"40px",height:"40px",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"900",fontSize:"0.9rem",color:"#1e293b",transition:"background-color 0.3s, outline 0.2s"},msg:{backgroundColor:"#1e293b",color:"#fff",padding:"8px 16px",borderRadius:"10px",fontSize:"0.88rem",fontWeight:"700",textAlign:"center"},legend:{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap",fontSize:"0.85rem"},controls:{display:"flex",gap:"8px",justifyContent:"center",flexWrap:"wrap"},btn:t=>({padding:"8px 16px",borderRadius:"10px",border:"none",backgroundColor:t,color:"#fff",fontWeight:"700",cursor:"pointer",fontSize:"0.9rem"})},ve={outer:{fontFamily:"system-ui, sans-serif",width:"100%"},headerWrap:{textAlign:"center",marginBottom:"28px"},heading:{fontSize:"1.8rem",fontWeight:"900",color:"#1e293b",marginBottom:"8px"},sub:{fontSize:"1rem",color:"#64748b",margin:0},split:{display:"flex",gap:"20px",alignItems:"flex-start",flexWrap:"wrap"},left:{flex:"0 0 38%",minWidth:"260px",display:"flex",flexDirection:"column",gap:"12px"},right:{flex:1,minWidth:"300px"},card:{borderRadius:"14px",padding:"16px",cursor:"pointer",transition:"box-shadow 0.2s, background-color 0.15s",border:"1px solid #f1f5f9"},viewBtn:{padding:"6px 14px",borderRadius:"8px",border:"none",cursor:"pointer",fontWeight:"700",fontSize:"0.82rem",transition:"all 0.2s"},panel:{backgroundColor:"#f8fafc",borderRadius:"16px",padding:"24px",border:"1px solid #e2e8f0"}},mt=[{id:"bubble",label:"🫧 Bubble Sort"},{id:"selection",label:"🎯 Selection Sort"},{id:"insertion",label:"📌 Insertion Sort"},{id:"merge",label:"🔀 Merge Sort"},{id:"quick",label:"⚡ Quick Sort"},{id:"heap",label:"🏔 Heap Sort"},{id:"practice",label:"📝 Practice Problems"}],sr=({name:t})=>e.jsxs("div",{style:{padding:"3rem",textAlign:"center",color:"#64748b",fontFamily:"system-ui, sans-serif"},children:[e.jsx("div",{style:{fontSize:"3rem",marginBottom:"1rem"},children:"🚧"}),e.jsx("h3",{style:{fontSize:"1.5rem",fontWeight:"700",color:"#1e293b",marginBottom:"0.5rem"},children:t}),e.jsx("p",{style:{fontSize:"1rem"},children:"This metaphor is coming soon. Stay tuned!"})]}),or=()=>{const[t,n]=i.useState("bubble"),a=()=>{switch(t){case"bubble":return e.jsx(Nt,{});case"selection":return e.jsx(Lt,{});case"insertion":return e.jsx(_t,{});case"merge":return e.jsx(Ot,{});case"quick":return e.jsx(Vt,{});case"heap":return e.jsx(Qt,{});case"practice":return e.jsx(nr,{});default:return e.jsx(sr,{name:mt.find(d=>d.id===t)?.label})}};return e.jsx("div",{style:Se.shell,children:e.jsxs("div",{style:Se.contentWrapper,children:[e.jsxs("div",{style:Se.heroSection,children:[e.jsx("h1",{style:Se.heroTitle,children:"Sorting Algorithms"}),e.jsx("p",{style:Se.heroSubtitle,children:"Sorting algorithms arrange elements in a specific order, usually ascending or descending. Efficient sorting is essential for searching, databases, and many algorithmic tasks."})]}),e.jsx("div",{style:Se.topBar,children:e.jsx("div",{style:Se.tabs,children:mt.map(d=>e.jsxs("button",{style:{...Se.tab,color:t===d.id?"#0f172a":"#64748b",opacity:t===d.id?1:.65,fontWeight:t===d.id?"700":"500"},onClick:()=>n(d.id),children:[d.label,t===d.id&&e.jsx(q.div,{layoutId:"activeTabUnderlineSorting",style:Se.activeUnderline,transition:{type:"spring",bounce:.2,duration:.5}})]},d.id))})}),e.jsx("div",{style:Se.content,children:e.jsx(X,{mode:"wait",children:e.jsx(q.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},exit:{opacity:0},transition:{duration:.2,ease:"easeOut"},children:a()},t)})})]})})},Se={shell:{width:"100%",minHeight:"100vh",backgroundColor:"#fff",fontFamily:"'Inter', system-ui, -apple-system, sans-serif"},contentWrapper:{maxWidth:"1100px",margin:"0 auto",padding:"0 1.5rem"},heroSection:{textAlign:"center",padding:"2.5rem 0 1.5rem 0"},heroTitle:{fontSize:"2.75rem",fontWeight:"900",color:"#0f172a",marginBottom:"0.5rem",letterSpacing:"-1.5px",lineHeight:"1.1"},heroSubtitle:{fontSize:"1.1rem",color:"#475569",maxWidth:"700px",margin:"0 auto",lineHeight:"1.6",opacity:.8},topBar:{display:"flex",justifyContent:"center",borderBottom:"1px solid #f1f5f9",marginBottom:"1.5rem",position:"sticky",top:"72px",backgroundColor:"rgba(255,255,255,0.85)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",zIndex:100,padding:"0.5rem 0",scrollMarginTop:"80px"},tabs:{display:"flex",gap:"0.5rem",padding:"0 1rem",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",maskImage:"linear-gradient(to right, transparent, black 5%, black 95%, transparent)",WebkitMaskImage:"linear-gradient(to right, transparent, black 5%, black 95%, transparent)"},tab:{padding:"0.6rem 1.2rem",background:"none",border:"none",fontSize:"0.875rem",cursor:"pointer",transition:"all 0.2s ease",display:"flex",alignItems:"center",gap:"10px",whiteSpace:"nowrap",borderRadius:"8px",position:"relative"},activeUnderline:{position:"absolute",bottom:"-0.5rem",left:"20%",right:"20%",height:"2px",backgroundColor:"#3b82f6",borderRadius:"2px"},content:{minHeight:"600px",marginBottom:"2rem"}},ar=t=>new Promise(n=>setTimeout(n,t)),lr=()=>{const[t,n]=i.useState({array:[12,7,19,4,15],target:"4",currentIndex:-1,checkedIndices:[],foundIndex:-1,status:"idle",phase:"idle",message:"Ready to search."}),[a,d]=i.useState("python"),{showFeedback:o}=le(),[x,u]=i.useState(!0),b=i.useRef(!1);i.useEffect(()=>{let r=!0,c;const p=async()=>{t.status!=="running"||!b.current||!r||(await ar(1e3),!(!b.current||!r)&&(n(l=>{if(l.status!=="running")return l;const y=C(l);return y.status!=="running"&&(b.current=!1),y}),b.current&&(c=setTimeout(p,100))))};return t.status==="running"&&b.current&&p(),()=>{r=!1,clearTimeout(c)}},[t.status]);const C=r=>{const c=parseInt(r.target);if(r.status==="idle")return{...r,status:"running",phase:"compare",currentIndex:0,message:`Checking index 0. Compare ${r.array[0]} with ${c}.`};if(r.status==="running"){if(r.phase==="compare"){const p=r.array[r.currentIndex];return p===c?{...r,status:"found",phase:"found",foundIndex:r.currentIndex,message:`Element found at index ${r.currentIndex}!`}:{...r,phase:"move",message:`${p} is not equal to ${c}.`}}else if(r.phase==="move"){const p=r.currentIndex+1,l=[...r.checkedIndices,r.currentIndex];return p>=r.array.length?{...r,status:"not-found",phase:"not-found",checkedIndices:l,currentIndex:-1,message:"Target not found."}:{...r,phase:"compare",checkedIndices:l,currentIndex:p,message:`Moving to next element. Checking index ${p}. Compare ${r.array[p]} with ${c}.`}}}return r},R=r=>{const c=C(r);return c.status==="found"&&r.status!=="found"?o("Target found! Linear search never misses 🔍","success"):c.status==="not-found"&&r.status!=="not-found"&&o("Reached the end... target wasn't there ❌","info"),c},I=()=>{if(!t.target||isNaN(parseInt(t.target))){n(r=>({...r,message:"Please enter a valid number to search."}));return}A(),b.current=!0,n(r=>R({...r,status:"idle"})),u(!1)},j=()=>{if(!t.target||isNaN(parseInt(t.target))){n(r=>({...r,message:"Please enter a valid number to search."}));return}b.current=!1,n(r=>R(r)),u(!1)},A=()=>{b.current=!1,n(r=>({...r,currentIndex:-1,checkedIndices:[],foundIndex:-1,status:"idle",phase:"idle",message:"Ready to search."}))};return e.jsxs("div",{style:K.container,children:[e.jsxs("div",{style:K.header,children:[e.jsx("h2",{style:K.title,children:"Linear Search — Finding a Book on a Shelf 📚"}),e.jsxs("div",{style:K.desc,children:[e.jsx("p",{children:"Imagine searching for a specific book on a shelf."}),e.jsx("p",{children:"You check each book one by one until you find the correct one."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Linear Search"})," works the same way by scanning the array sequentially from start to finish."]})]})]}),e.jsxs("div",{style:K.inputSection,children:[e.jsx("label",{style:K.inputLabel,children:"Search Target:"}),e.jsx("input",{type:"number",value:t.target,onChange:r=>{n(c=>({...c,target:r.target.value})),A()},style:K.inputBox})]}),e.jsxs("div",{style:K.visualizer,children:[e.jsx("div",{style:K.arrayContainer,children:t.array.map((r,c)=>{let p="#F1F5F9",l="#1E293B";return t.foundIndex===c?(p="#22C55E",l="white"):t.status==="not-found"&&t.foundIndex===-1&&t.checkedIndices.includes(c)?(p="#EF4444",l="white"):t.currentIndex===c?(p="#FACC15",l="#1E293B"):t.checkedIndices.includes(c)&&(p="#3B82F6",l="white"),e.jsxs(q.div,{style:{...K.box,backgroundColor:p,color:l},animate:{scale:t.currentIndex===c?1.08:1,boxShadow:t.currentIndex===c?"0 0 15px rgba(250, 204, 21, 0.4)":"none"},className:t.currentIndex===c?"pulse-glow":"",transition:{type:"spring",stiffness:300,damping:20},layout:!0,children:[e.jsx("span",{style:K.boxIndex,children:c}),e.jsx("span",{style:K.boxValue,children:r})]},c)})}),e.jsx(X,{mode:"wait",children:e.jsx(q.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},style:{...K.messageBox,backgroundColor:t.status==="not-found"?"#ef4444":"#1e293b"},children:t.message},t.message)}),e.jsx("div",{style:K.legend,children:[["#FACC15","Current (Yellow)"],["#3B82F6","Checked (Blue)"],["#22C55E","Found (Green)"],["#EF4444","Not Found (Red)"]].map(([r,c])=>e.jsxs("div",{style:K.legendItem,children:[e.jsx("div",{style:{...K.dot,backgroundColor:r}}),e.jsx("span",{children:c})]},c))})]}),e.jsx("div",{style:K.resultPanel,children:e.jsx("div",{style:K.resultText,children:t.status==="found"?e.jsxs("span",{style:{color:"#16a34a"},children:["Result: Target found at index ",t.foundIndex]}):t.status==="not-found"?e.jsx("span",{style:{color:"#dc2626"},children:"Result: Target not found"}):e.jsx("span",{style:{color:"#64748b"},children:"Waiting for search to complete..."})})}),e.jsxs("div",{style:K.controls,children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx("button",{onClick:I,disabled:t.status==="running"||t.status==="found"||t.status==="not-found",style:K.btn,children:"▶ Search One-by-One 🔍"}),x&&t.status==="idle"&&e.jsx("div",{className:"tooltip-hint",style:{bottom:"110%",left:"50%"},children:"Start scanning the shelf! ✨"})]}),e.jsx("button",{onClick:j,disabled:t.status==="found"||t.status==="not-found",style:K.btn,children:"⏭ Check Next"}),e.jsx("button",{onClick:A,style:K.btn,children:"↺ Reset"})]}),e.jsxs("div",{style:K.codeSection,children:[e.jsx("h3",{style:K.subTitle,children:"Linear Search Implementation"}),e.jsx("div",{style:K.langSelector,children:["python","javascript","cpp"].map(r=>e.jsx("button",{onClick:()=>d(r),style:{...K.langBtn,backgroundColor:a===r?"#4f46e5":"#f1f5f9",color:a===r?"#fff":"#64748b",border:a===r?"none":"1px solid #e2e8f0"},children:r==="cpp"?"C++":r.toUpperCase()},r))}),e.jsxs("pre",{style:K.codeBox,children:[a==="python"&&e.jsx("code",{children:`def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Target found
    return -1  # Target not found

# Time:  O(n)
# Space: O(1)`}),a==="javascript"&&e.jsx("code",{children:`function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // Target found
        }
    }
    return -1; // Target not found
}

// Time:  O(n)
// Space: O(1)`}),a==="cpp"&&e.jsx("code",{children:`#include <vector>
using namespace std;

int linearSearch(const vector<int>& arr, int target) {
    for (int i = 0; i < arr.size(); i++) {
        if (arr[i] == target) {
            return i; // Target found
        }
    }
    return -1; // Target not found
}

// Time:  O(n)
// Space: O(1)`})]})]}),e.jsxs("div",{style:K.quizSection,children:[e.jsx("h3",{style:K.subTitle,children:"Knowledge Check"}),e.jsx("div",{style:K.quizGrid,children:[{q:"What is Linear Search?",a:"A searching algorithm that checks every element in a data structure sequentially until the target is found."},{q:"What is the time complexity of Linear Search?",a:"O(n) in the worst and average cases, since it may have to scan the entire array. O(1) in the best case if the target is the first element."},{q:"When is Linear Search useful?",a:"When the dataset is small, or when the data is unsorted and cannot be sorted beforehand."},{q:"Why is Linear Search inefficient for large datasets?",a:"Because it checks elements one by one, scaling linearly. For an array of 1 million elements, it might take 1 million comparisons, whereas Binary Search would take at most ~20."}].map((r,c)=>e.jsxs("div",{style:K.quizCard,children:[e.jsxs("p",{style:K.question,children:[e.jsxs("strong",{children:["Q",c+1,":"]})," ",r.q]}),e.jsx("p",{style:K.answer,children:r.a})]},c))})]})]})},K={container:{padding:"2rem",backgroundColor:"#fff",borderRadius:"32px",border:"1px solid #e2e8f0",boxShadow:"0 4px 6px -1px rgba(0,0,0,0.05)",fontFamily:"system-ui, sans-serif"},header:{textAlign:"center",marginBottom:"2rem"},title:{fontSize:"2rem",fontWeight:"900",color:"#1e293b",letterSpacing:"-0.025em",marginBottom:"1rem"},desc:{color:"#64748b",fontSize:"1.05rem",lineHeight:"1.7",maxWidth:"750px",margin:"0 auto"},inputSection:{display:"flex",justifyContent:"center",alignItems:"center",gap:"1rem",marginBottom:"2rem"},inputLabel:{fontWeight:"700",color:"#1e293b",fontSize:"1.1rem"},inputBox:{padding:"0.5rem 1rem",fontSize:"1.1rem",borderRadius:"8px",border:"2px solid #cbd5e1",outline:"none",width:"100px",textAlign:"center",fontWeight:"600",color:"#0f172a"},visualizer:{background:"white",borderRadius:"16px",padding:"28px",boxShadow:"0 6px 18px rgba(0,0,0,0.06)",marginTop:"28px",display:"flex",flexDirection:"column",alignItems:"center",gap:"1.5rem",marginBottom:"1.5rem"},arrayContainer:{display:"flex",flexWrap:"wrap",gap:"16px",justifyContent:"center"},box:{width:"64px",height:"64px",borderRadius:"10px",background:"#F1F5F9",fontWeight:"600",fontSize:"18px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",transition:"background-color 0.3s, color 0.3s"},boxIndex:{fontSize:"0.7rem",opacity:.7,marginBottom:"2px"},boxValue:{fontSize:"18px",fontWeight:"600"},messageBox:{color:"#fff",padding:"0.7rem 1.5rem",borderRadius:"12px",fontSize:"1rem",fontWeight:"700",textAlign:"center",minWidth:"300px"},legend:{display:"flex",gap:"1.5rem",flexWrap:"wrap",justifyContent:"center",marginTop:"1rem"},legendItem:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.9rem",color:"#64748b",fontWeight:"600"},dot:{width:"12px",height:"12px",borderRadius:"50%"},resultPanel:{background:"#F8FAFC",borderRadius:"12px",padding:"14px",marginTop:"16px",border:"1px solid #E2E8F0",textAlign:"center",width:"100%",maxWidth:"400px"},resultText:{fontSize:"1.2rem",fontWeight:"bold"},controls:{display:"flex",justifyContent:"center",gap:"1rem",marginBottom:"2rem",flexWrap:"wrap"},btn:{background:"#4F46E5",color:"white",borderRadius:"10px",padding:"10px 18px",fontWeight:"500",border:"none",cursor:"pointer",transition:"background-color 0.2s",fontSize:"1rem"},codeSection:{marginBottom:"3rem"},subTitle:{fontSize:"1.5rem",fontWeight:"900",color:"#1e293b",marginBottom:"1.5rem",textAlign:"center"},langSelector:{display:"flex",justifyContent:"center",gap:"0.75rem",marginBottom:"1.25rem"},langBtn:{padding:"0.6rem 1.2rem",borderRadius:"10px",fontSize:"0.9rem",fontWeight:"700",cursor:"pointer",transition:"all 0.2s"},codeBox:{backgroundColor:"#0f172a",color:"#f8fafc",padding:"1.5rem",borderRadius:"20px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",fontFamily:"monospace",boxShadow:"inset 0 2px 4px rgba(0,0,0,0.1)"},quizSection:{marginTop:"2rem"},quizGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"1.5rem"},quizCard:{backgroundColor:"#f8fafc",padding:"1.5rem",borderRadius:"20px",border:"1px solid #f1f5f9"},question:{fontWeight:"700",color:"#1e293b",marginBottom:"0.75rem",fontSize:"1rem"},answer:{color:"#10b981",fontWeight:"600",lineHeight:"1.5",fontSize:"0.95rem"}},dr=t=>new Promise(n=>setTimeout(n,t)),cr=()=>{const[t,n]=i.useState({array:[2,4,7,12,15,19,23,29],target:"15",left:0,right:7,mid:-1,foundIndex:-1,status:"idle",phase:"idle",message:"Ready to search."}),[a,d]=i.useState("python"),{showFeedback:o}=le(),[x,u]=i.useState(!0),b=i.useRef(!1);i.useEffect(()=>{let r=!0,c;const p=async()=>{t.status!=="running"||!b.current||!r||(await dr(1500),!(!b.current||!r)&&(n(l=>{if(l.status!=="running")return l;const y=C(l);return y.status!=="running"&&(b.current=!1),y}),b.current&&(c=setTimeout(p,100))))};return t.status==="running"&&b.current&&p(),()=>{r=!1,clearTimeout(c)}},[t.status]);const C=r=>{const c=parseInt(r.target);if(r.status==="idle")return{...r,status:"running",phase:"calc-mid",left:0,right:r.array.length-1,mid:Math.floor((0+r.array.length-1)/2),message:"Opening the dictionary in the middle."};if(r.status==="running"){if(r.left>r.right)return{...r,status:"not-found",phase:"not-found",mid:-1,message:"Target not found."};if(r.phase==="calc-mid"){const l=Math.floor((r.left+r.right)/2);return{...r,mid:l,phase:"compare",message:`Middle element is ${r.array[l]} at index ${l}.`}}else if(r.phase==="compare"){const l=r.array[r.mid];return l===c?{...r,status:"found",phase:"found",foundIndex:r.mid,message:"Target found."}:l<c?{...r,phase:"update-bounds",message:"Target is larger, searching right half."}:{...r,phase:"update-bounds",message:"Target is smaller, searching left half."}}else if(r.phase==="update-bounds")if(r.array[r.mid]<c){const y=r.mid+1;return y>r.right?{...r,left:y,status:"not-found",phase:"not-found",mid:-1,message:"Target not found."}:{...r,left:y,phase:"calc-mid",message:"New middle selected."}}else{const y=r.mid-1;return r.left>y?{...r,right:y,status:"not-found",phase:"not-found",mid:-1,message:"Target not found."}:{...r,right:y,phase:"calc-mid",message:"New middle selected."}}}const p=r;return p.status==="found"&&o("Found it! Binary search is incredibly fast 🎯","success"),p.status==="not-found"&&o("Not here... the range was exhausted ❌","info"),p},R=r=>{const c=C(r);return c.status==="found"&&r.status!=="found"?o("Found it! Binary Search is lightning fast 🎯","success"):c.status==="not-found"&&r.status!=="not-found"&&o("Target not found in the list ❌","info"),c},I=()=>{if(!t.target||isNaN(parseInt(t.target))){n(r=>({...r,message:"Please enter a valid number to search."}));return}A(),b.current=!0,n(r=>R({...r,status:"idle"})),u(!1)},j=()=>{if(!t.target||isNaN(parseInt(t.target))){n(r=>({...r,message:"Please enter a valid number to search."}));return}b.current=!1,n(r=>R(r)),u(!1)},A=()=>{b.current=!1,n(r=>({...r,left:0,right:r.array.length-1,mid:-1,foundIndex:-1,status:"idle",phase:"idle",message:"Ready to search."}))};return e.jsxs("div",{style:O.container,children:[e.jsxs("div",{style:O.header,children:[e.jsx("h2",{style:O.title,children:"Binary Search — Finding a Word in a Dictionary 📖"}),e.jsxs("div",{style:O.desc,children:[e.jsx("p",{children:"Imagine searching for a word in a dictionary. Instead of checking every page one by one, you open the dictionary in the middle."}),e.jsx("p",{children:"If the word comes before the middle word alphabetically, you search the left half. If it comes after, you search the right half."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Binary Search"})," works the same way: each step eliminates half the remaining elements. The array ",e.jsx("strong",{children:"must be sorted"})," for this to work."]})]})]}),e.jsxs("div",{style:O.inputSection,children:[e.jsx("label",{style:O.inputLabel,children:"Search Target:"}),e.jsx("input",{type:"number",value:t.target,onChange:r=>{n(c=>({...c,target:r.target.value})),A()},style:O.inputBox})]}),e.jsxs("div",{style:O.visualizer,children:[e.jsx("div",{style:{position:"relative",paddingBottom:"30px"},children:e.jsx("div",{style:O.arrayContainer,children:t.array.map((r,c)=>{let p="#F1F5F9",l="#1E293B";const y=t.status!=="idle"&&(c<t.left||c>t.right);let B=y?.3:1;return t.foundIndex===c?(p="#22C55E",l="white",B=1):t.status==="not-found"&&t.foundIndex===-1&&!y?(p="#EF4444",l="white"):t.mid===c&&(p="#FACC15",l="#1E293B"),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsxs(q.div,{style:{...O.box,backgroundColor:p,color:l,opacity:B},animate:{scale:t.mid===c?1.08:1,opacity:B,boxShadow:t.mid===c?"0 0 15px rgba(250, 204, 21, 0.4)":"none"},className:t.mid===c?"pulse-glow":"",transition:{type:"spring",stiffness:300,damping:20},layout:!0,children:[e.jsx("span",{style:O.boxIndex,children:c}),e.jsx("span",{style:O.boxValue,children:r})]}),e.jsxs("div",{style:{height:"20px",marginTop:"8px",fontSize:"0.85rem",fontWeight:"bold",color:"#64748b",display:"flex",gap:"4px"},children:[t.status!=="idle"&&t.status!=="not-found"&&t.left===c&&e.jsx("span",{style:{color:"#ec4899"},children:"L"}),t.status!=="idle"&&t.status!=="not-found"&&t.right===c&&e.jsx("span",{style:{color:"#3b82f6"},children:"R"}),t.status!=="idle"&&t.status!=="not-found"&&t.mid===c&&t.foundIndex===-1&&e.jsx("span",{style:{color:"#eab308"},children:"M"})]})]},c)})})}),e.jsx(X,{mode:"wait",children:e.jsx(q.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},style:{...O.messageBox,backgroundColor:t.status==="not-found"?"#ef4444":"#1e293b"},children:t.message},t.message)}),e.jsxs("div",{style:O.legend,children:[[["#FACC15","Middle (Yellow)"],["#22C55E","Found (Green)"],["#EF4444","Not Found (Red)"],["#cbd5e1","Eliminated (Faded)"]].map(([r,c])=>e.jsxs("div",{style:O.legendItem,children:[e.jsx("div",{style:{...O.dot,backgroundColor:r}}),e.jsx("span",{children:c})]},c)),e.jsxs("div",{style:O.legendItem,children:[e.jsx("div",{style:{fontWeight:"bold",color:"#ec4899",fontSize:"0.9rem"},children:"L"}),e.jsx("span",{children:"Left Bound"})]}),e.jsxs("div",{style:O.legendItem,children:[e.jsx("div",{style:{fontWeight:"bold",color:"#3b82f6",fontSize:"0.9rem"},children:"R"}),e.jsx("span",{children:"Right Bound"})]})]})]}),e.jsx("div",{style:O.resultPanel,children:e.jsx("div",{style:O.resultText,children:t.status==="found"?e.jsxs("span",{style:{color:"#16a34a"},children:["Result: Target found at index ",t.foundIndex]}):t.status==="not-found"?e.jsx("span",{style:{color:"#dc2626"},children:"Result: Target not found"}):e.jsx("span",{style:{color:"#64748b"},children:"Waiting for search to complete..."})})}),e.jsxs("div",{style:O.controls,children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx("button",{onClick:I,disabled:t.status==="running"||t.status==="found"||t.status==="not-found",style:O.btn,children:"▶ Hunt the Number! 🎯"}),x&&t.status==="idle"&&e.jsx("div",{className:"tooltip-hint",style:{bottom:"110%",left:"50%"},children:"Let's find your target! ✨"})]}),e.jsx("button",{onClick:j,disabled:t.status==="found"||t.status==="not-found",style:O.btn,children:"⏭ Take a Step"}),e.jsx("button",{onClick:A,style:O.btn,children:"↺ Reset All"})]}),e.jsxs("div",{style:O.codeSection,children:[e.jsx("h3",{style:O.subTitle,children:"Binary Search Implementation"}),e.jsx("div",{style:O.langSelector,children:["python","javascript","cpp"].map(r=>e.jsx("button",{onClick:()=>d(r),style:{...O.langBtn,backgroundColor:a===r?"#4f46e5":"#f1f5f9",color:a===r?"#fff":"#64748b",border:a===r?"none":"1px solid #e2e8f0"},children:r==="cpp"?"C++":r.toUpperCase()},r))}),e.jsxs("pre",{style:O.codeBox,children:[a==="python"&&e.jsx("code",{children:`def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        mid = (left + right) // 2
        
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1

# Time:  O(log n)
# Space: O(1)`}),a==="javascript"&&e.jsx("code",{children:`function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

// Time:  O(log n)
// Space: O(1)`}),a==="cpp"&&e.jsx("code",{children:`#include <vector>
using namespace std;

int binarySearch(const vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2; // Prevents integer overflow
        
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}

// Time:  O(log n)
// Space: O(1)`})]})]}),e.jsxs("div",{style:O.quizSection,children:[e.jsx("h3",{style:O.subTitle,children:"Knowledge Check"}),e.jsx("div",{style:O.quizGrid,children:[{q:"What is a core requirement for Binary Search?",a:"The dataset must be sorted beforehand so the algorithm can reliably eliminate halves based on greater/lesser comparisons."},{q:"What is the time complexity of Binary Search?",a:"O(log n). Since it halves the search space every step, searching 1 million elements takes at most ~20 steps."},{q:"How does it compare to Linear Search?",a:"Linear Search is O(n) and works on unsorted data. Binary Search is significantly faster (O(log n)) but strictly requires sorted data."},{q:"Why is `mid = left + (right - left) / 2` preferred in typed languages?",a:"To prevent integer overflow if `left` and `right` are very large numbers."}].map((r,c)=>e.jsxs("div",{style:O.quizCard,children:[e.jsxs("p",{style:O.question,children:[e.jsxs("strong",{children:["Q",c+1,":"]})," ",r.q]}),e.jsx("p",{style:O.answer,children:r.a})]},c))})]})]})},O={container:{padding:"2rem",backgroundColor:"#fff",borderRadius:"32px",border:"1px solid #e2e8f0",boxShadow:"0 4px 6px -1px rgba(0,0,0,0.05)",fontFamily:"system-ui, sans-serif"},header:{textAlign:"center",marginBottom:"2rem"},title:{fontSize:"2rem",fontWeight:"900",color:"#1e293b",letterSpacing:"-0.025em",marginBottom:"1rem"},desc:{color:"#64748b",fontSize:"1.05rem",lineHeight:"1.7",maxWidth:"750px",margin:"0 auto"},inputSection:{display:"flex",justifyContent:"center",alignItems:"center",gap:"1rem",marginBottom:"2rem"},inputLabel:{fontWeight:"700",color:"#1e293b",fontSize:"1.1rem"},inputBox:{padding:"0.5rem 1rem",fontSize:"1.1rem",borderRadius:"8px",border:"2px solid #cbd5e1",outline:"none",width:"100px",textAlign:"center",fontWeight:"600",color:"#0f172a"},visualizer:{background:"white",borderRadius:"16px",padding:"28px",boxShadow:"0 6px 18px rgba(0,0,0,0.06)",marginTop:"28px",display:"flex",flexDirection:"column",alignItems:"center",gap:"1.5rem",marginBottom:"1.5rem"},arrayContainer:{display:"flex",flexWrap:"wrap",gap:"16px",justifyContent:"center"},box:{width:"64px",height:"64px",borderRadius:"10px",background:"#F1F5F9",fontWeight:"600",fontSize:"18px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",transition:"background-color 0.3s, color 0.3s, opacity 0.3s"},boxIndex:{fontSize:"0.7rem",opacity:.7,marginBottom:"2px"},boxValue:{fontSize:"18px",fontWeight:"600"},messageBox:{color:"#fff",padding:"0.7rem 1.5rem",borderRadius:"12px",fontSize:"1rem",fontWeight:"700",textAlign:"center",minWidth:"300px"},legend:{display:"flex",gap:"1.5rem",flexWrap:"wrap",justifyContent:"center",marginTop:"1rem"},legendItem:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.9rem",color:"#64748b",fontWeight:"600"},dot:{width:"12px",height:"12px",borderRadius:"50%"},resultPanel:{background:"#F8FAFC",borderRadius:"12px",padding:"14px",marginTop:"16px",border:"1px solid #E2E8F0",textAlign:"center",width:"100%",maxWidth:"400px"},resultText:{fontSize:"1.2rem",fontWeight:"bold"},controls:{display:"flex",justifyContent:"center",gap:"1rem",marginBottom:"2rem",flexWrap:"wrap"},btn:{background:"#4F46E5",color:"white",borderRadius:"10px",padding:"10px 18px",fontWeight:"500",border:"none",cursor:"pointer",transition:"background-color 0.2s",fontSize:"1rem"},codeSection:{marginBottom:"3rem"},subTitle:{fontSize:"1.5rem",fontWeight:"900",color:"#1e293b",marginBottom:"1.5rem",textAlign:"center"},langSelector:{display:"flex",justifyContent:"center",gap:"0.75rem",marginBottom:"1.25rem"},langBtn:{padding:"0.6rem 1.2rem",borderRadius:"10px",fontSize:"0.9rem",fontWeight:"700",cursor:"pointer",transition:"all 0.2s"},codeBox:{backgroundColor:"#0f172a",color:"#f8fafc",padding:"1.5rem",borderRadius:"20px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",fontFamily:"monospace",boxShadow:"inset 0 2px 4px rgba(0,0,0,0.1)"},quizSection:{marginTop:"2rem"},quizGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"1.5rem"},quizCard:{backgroundColor:"#f8fafc",padding:"1.5rem",borderRadius:"20px",border:"1px solid #f1f5f9"},question:{fontWeight:"700",color:"#1e293b",marginBottom:"0.75rem",fontSize:"1rem"},answer:{color:"#10b981",fontWeight:"600",lineHeight:"1.5",fontSize:"0.95rem"}},pr=t=>new Promise(n=>setTimeout(n,t)),ur=()=>{const[t,n]=i.useState({array:[2,4,6,8,10,12],target:"14",left:0,right:5,status:"idle",phase:"idle",message:"Ready to search."}),[a,d]=i.useState("python"),{showFeedback:o}=le(),[x,u]=i.useState(!0),b=i.useRef(!1);i.useEffect(()=>{let r=!0,c;const p=async()=>{t.status!=="running"||!b.current||!r||(await pr(1500),!(!b.current||!r)&&(n(l=>{if(l.status!=="running")return l;const y=C(l);return y.status!=="running"&&(b.current=!1),y}),b.current&&(c=setTimeout(p,100))))};return t.status==="running"&&b.current&&p(),()=>{r=!1,clearTimeout(c)}},[t.status]);const C=r=>{const c=parseInt(r.target);if(r.status==="idle")return{...r,status:"running",phase:"compare",left:0,right:r.array.length-1,message:`Left pointer at index 0. Right pointer at index ${r.array.length-1}.`};if(r.status==="running"){if(r.left>=r.right)return{...r,status:"not-found",phase:"not-found",message:"Pointers crossed without finding a pair. Target not found."};if(r.phase==="compare"){const p=r.array[r.left]+r.array[r.right];return p===c?{...r,status:"found",phase:"found",message:`Sum is ${p}. Target found!`}:p<c?{...r,phase:"move-left",message:`Sum is ${p}. Too small, we need a larger value. Moving left pointer inward.`}:{...r,phase:"move-right",message:`Sum is ${p}. Too large, we need a smaller value. Moving right pointer inward.`}}else if(r.phase==="move-left"){const p=r.left+1;return p>=r.right?{...r,left:p,status:"not-found",phase:"not-found",message:"Pointers met. Target not found."}:{...r,left:p,phase:"compare",message:`Left pointer at index ${p}. Right pointer at index ${r.right}.`}}else if(r.phase==="move-right"){const p=r.right-1;return r.left>=p?{...r,right:p,status:"not-found",phase:"not-found",message:"Pointers met. Target not found."}:{...r,right:p,phase:"compare",message:`Left pointer at index ${r.left}. Right pointer at index ${p}.`}}}return r},R=r=>{const c=C(r);return c.status==="found"&&r.status!=="found"?o("Found it! The pair perfectly matches the sum 🎯","success"):c.status==="not-found"&&r.status!=="not-found"&&o("No match found in the hallway 🚶","info"),c},I=()=>{if(!t.target||isNaN(parseInt(t.target))){n(r=>({...r,message:"Please enter a valid target sum."}));return}A(),b.current=!0,n(r=>R({...r,status:"idle"})),u(!1)},j=()=>{if(!t.target||isNaN(parseInt(t.target))){n(r=>({...r,message:"Please enter a valid target sum."}));return}b.current=!1,n(r=>R(r)),u(!1)},A=()=>{b.current=!1,n(r=>({...r,left:0,right:r.array.length-1,status:"idle",phase:"idle",message:"Ready to search."}))};return e.jsxs("div",{style:Q.container,children:[e.jsxs("div",{style:Q.header,children:[e.jsx("h2",{style:Q.title,children:"Two Pointers — Finding a Match 🚶"}),e.jsx("div",{style:Q.desc,children:e.jsx("p",{children:"Two Pointers is like meeting a friend in a long hallway. One starts at each end and you move closer until you find the perfect match!"})})]}),e.jsxs("div",{style:Q.inputSection,children:[e.jsx("label",{style:Q.inputLabel,children:"Target Pair Sum:"}),e.jsx("input",{type:"number",value:t.target,onChange:r=>{n(c=>({...c,target:r.target.value})),A()},style:Q.inputBox})]}),e.jsxs("div",{style:Q.visualizer,children:[e.jsx("div",{style:{position:"relative",paddingBottom:"30px"},children:e.jsx("div",{style:Q.arrayContainer,children:t.array.map((r,c)=>{let p="#F1F5F9",l="#1E293B";const y=t.status!=="idle"&&(c<t.left||c>t.right);let B=y?.4:1;return t.status==="found"&&(c===t.left||c===t.right)?(p="#22C55E",l="white",B=1):t.status==="not-found"&&!y?(p="#EF4444",l="white"):t.status!=="idle"&&t.status!=="not-found"&&c===t.left?(p="#FACC15",l="#1E293B"):t.status!=="idle"&&t.status!=="not-found"&&c===t.right&&(p="#3B82F6",l="white"),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsxs(q.div,{style:{...Q.box,backgroundColor:p,color:l,opacity:B},animate:{scale:t.left===c||t.right===c?1.08:1,opacity:B,boxShadow:t.left===c?"0 0 15px rgba(250, 204, 21, 0.4)":t.right===c?"0 0 15px rgba(59, 130, 246, 0.4)":"none"},className:t.left===c||t.right===c?"pulse-glow":"",transition:{type:"spring",stiffness:300,damping:20},layout:!0,children:[e.jsx("span",{style:Q.boxIndex,children:c}),e.jsx("span",{style:Q.boxValue,children:r})]}),e.jsxs("div",{style:{height:"20px",marginTop:"8px",fontSize:"0.9rem",fontWeight:"bold",display:"flex",gap:"4px"},children:[t.status!=="idle"&&t.left===c&&e.jsx("span",{style:{color:"#eab308"},children:"L →"}),t.status!=="idle"&&t.right===c&&e.jsx("span",{style:{color:"#3b82f6"},children:"← R"})]})]},c)})})}),t.status!=="idle"&&t.left<t.array.length&&t.right>=0&&t.left<t.right&&e.jsxs("div",{style:Q.equationBox,children:[e.jsx("span",{style:{color:"#854d0e",fontWeight:"bold"},children:t.array[t.left]})," +",e.jsx("span",{style:{color:"#1e3a8a",fontWeight:"bold"},children:t.array[t.right]})," =",e.jsx("span",{style:{fontWeight:"bold"},children:t.array[t.left]+t.array[t.right]})]}),e.jsx(X,{mode:"wait",children:e.jsx(q.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},style:{...Q.messageBox,backgroundColor:t.status==="not-found"?"#ef4444":"#1e293b"},children:t.message},t.message)}),e.jsx("div",{style:Q.legend,children:[["#FACC15","Left Pointer"],["#3B82F6","Right Pointer"],["#22C55E","Match Found"],["#cbd5e1","Ignored Elements"]].map(([r,c])=>e.jsxs("div",{style:Q.legendItem,children:[e.jsx("div",{style:{...Q.dot,backgroundColor:r}}),e.jsx("span",{children:c})]},c))})]}),e.jsx("div",{style:Q.resultPanel,children:e.jsx("div",{style:Q.resultText,children:t.status==="found"?e.jsxs("span",{style:{color:"#16a34a"},children:["Result: Pair found at indices ",t.left," and ",t.right]}):t.status==="not-found"?e.jsx("span",{style:{color:"#dc2626"},children:"Result: No pair found for given target sum"}):e.jsx("span",{style:{color:"#64748b"},children:"Waiting for search to complete..."})})}),e.jsxs("div",{style:Q.controls,children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx("button",{onClick:I,disabled:t.status==="running"||t.status==="found"||t.status==="not-found",style:Q.btn,children:"▶ Find the Pair! 🚶"}),x&&t.status==="idle"&&e.jsx("div",{className:"tooltip-hint",style:{bottom:"110%",left:"50%"},children:"Step into the hallway! ✨"})]}),e.jsx("button",{onClick:j,disabled:t.status==="found"||t.status==="not-found",style:Q.btn,children:"⏭ Take a Step"}),e.jsx("button",{onClick:A,style:Q.btn,children:"↺ Reset All"})]}),e.jsxs("div",{style:Q.codeSection,children:[e.jsx("h3",{style:Q.subTitle,children:"Two Pointers Implementation (Two Sum in Sorted Array)"}),e.jsx("div",{style:Q.langSelector,children:["python","javascript","cpp"].map(r=>e.jsx("button",{onClick:()=>d(r),style:{...Q.langBtn,backgroundColor:a===r?"#4f46e5":"#f1f5f9",color:a===r?"#fff":"#64748b",border:a===r?"none":"1px solid #e2e8f0"},children:r==="cpp"?"C++":r.toUpperCase()},r))}),e.jsxs("pre",{style:Q.codeBox,children:[a==="python"&&e.jsx("code",{children:`def two_sum(arr, target):
    left, right = 0, len(arr) - 1
    
    while left < right:
        current_sum = arr[left] + arr[right]
        
        if current_sum == target:
            return (left, right)
        elif current_sum < target:
            left += 1  # Need a larger sum
        else:
            right -= 1 # Need a smaller sum
            
    return -1

# Time:  O(n)
# Space: O(1)`}),a==="javascript"&&e.jsx("code",{children:`function twoSum(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left < right) {
        const sum = arr[left] + arr[right];
        
        if (sum === target) {
            return [left, right];
        } else if (sum < target) {
            left++; // Need a larger sum
        } else {
            right--; // Need a smaller sum
        }
    }
    return -1;
}

// Time:  O(n)
// Space: O(1)`}),a==="cpp"&&e.jsx("code",{children:`#include <vector>
using namespace std;

vector<int> twoSum(const vector<int>& arr, int target) {
    int left = 0;
    int right = arr.size() - 1;
    
    while (left < right) {
        int sum = arr[left] + arr[right];
        
        if (sum == target) {
            return {left, right};
        } else if (sum < target) {
            left++; // Need a larger sum
        } else {
            right--; // Need a smaller sum
        }
    }
    return {-1, -1};
}

// Time:  O(n)
// Space: O(1)`})]})]}),e.jsxs("div",{style:Q.quizSection,children:[e.jsx("h3",{style:Q.subTitle,children:"Knowledge Check"}),e.jsx("div",{style:Q.quizGrid,children:[{q:"What is the Two Pointer technique?",a:"An algorithm strategy that uses two different indices to search through an array simultaneously, often starting from opposite ends."},{q:"What is a common use case?",a:"Finding a pair of numbers that add up to a specific target sum in a sorted array."},{q:"Why must the array be sorted for the Two Sum problem using this technique?",a:"Because we decide whether to increment the left pointer or decrement the right pointer based on whether the sum is too small or too large."},{q:"What is the time complexity?",a:"O(n) linear time, because each element is visited at most once as the pointers converge."}].map((r,c)=>e.jsxs("div",{style:Q.quizCard,children:[e.jsxs("p",{style:Q.question,children:[e.jsxs("strong",{children:["Q",c+1,":"]})," ",r.q]}),e.jsx("p",{style:Q.answer,children:r.a})]},c))})]})]})},Q={container:{padding:"2rem",backgroundColor:"#fff",borderRadius:"32px",border:"1px solid #e2e8f0",boxShadow:"0 4px 6px -1px rgba(0,0,0,0.05)",fontFamily:"system-ui, sans-serif"},header:{textAlign:"center",marginBottom:"2rem"},title:{fontSize:"2rem",fontWeight:"900",color:"#1e293b",letterSpacing:"-0.025em",marginBottom:"1rem"},desc:{color:"#64748b",fontSize:"1.05rem",lineHeight:"1.7",maxWidth:"750px",margin:"0 auto"},inputSection:{display:"flex",justifyContent:"center",alignItems:"center",gap:"1rem",marginBottom:"2rem"},inputLabel:{fontWeight:"700",color:"#1e293b",fontSize:"1.1rem"},inputBox:{padding:"0.5rem 1rem",fontSize:"1.1rem",borderRadius:"8px",border:"2px solid #cbd5e1",outline:"none",width:"100px",textAlign:"center",fontWeight:"600",color:"#0f172a"},visualizer:{background:"white",borderRadius:"16px",padding:"28px",boxShadow:"0 6px 18px rgba(0,0,0,0.06)",marginTop:"28px",display:"flex",flexDirection:"column",alignItems:"center",gap:"1.5rem",marginBottom:"1.5rem"},equationBox:{fontSize:"1.4rem",padding:"0.5rem 1rem",backgroundColor:"#fff",borderRadius:"8px",border:"1px solid #e2e8f0",boxShadow:"0 2px 4px rgba(0,0,0,0.05)",marginBottom:"0.5rem",display:"flex",gap:"10px"},arrayContainer:{display:"flex",flexWrap:"wrap",gap:"16px",justifyContent:"center"},box:{width:"64px",height:"64px",borderRadius:"10px",background:"#F1F5F9",fontWeight:"600",fontSize:"18px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",transition:"background-color 0.3s, color 0.3s, opacity 0.3s"},boxIndex:{fontSize:"0.7rem",opacity:.7,marginBottom:"2px"},boxValue:{fontSize:"18px",fontWeight:"600"},messageBox:{color:"#fff",padding:"0.7rem 1.5rem",borderRadius:"12px",fontSize:"1rem",fontWeight:"700",textAlign:"center",minWidth:"300px"},legend:{display:"flex",gap:"1.5rem",flexWrap:"wrap",justifyContent:"center",marginTop:"1rem"},legendItem:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.9rem",color:"#64748b",fontWeight:"600"},dot:{width:"12px",height:"12px",borderRadius:"50%"},resultPanel:{background:"#F8FAFC",borderRadius:"12px",padding:"14px",marginTop:"16px",border:"1px solid #E2E8F0",textAlign:"center",width:"100%",maxWidth:"400px"},resultText:{fontSize:"1.2rem",fontWeight:"bold"},controls:{display:"flex",justifyContent:"center",gap:"1rem",marginBottom:"2rem",flexWrap:"wrap"},btn:{background:"#4F46E5",color:"white",borderRadius:"10px",padding:"10px 18px",fontWeight:"500",border:"none",cursor:"pointer",transition:"background-color 0.2s",fontSize:"1rem"},codeSection:{marginBottom:"3rem"},subTitle:{fontSize:"1.5rem",fontWeight:"900",color:"#1e293b",marginBottom:"1.5rem",textAlign:"center"},langSelector:{display:"flex",justifyContent:"center",gap:"0.75rem",marginBottom:"1.25rem"},langBtn:{padding:"0.6rem 1.2rem",borderRadius:"10px",fontSize:"0.9rem",fontWeight:"700",cursor:"pointer",transition:"all 0.2s"},codeBox:{backgroundColor:"#0f172a",color:"#f8fafc",padding:"1.5rem",borderRadius:"20px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",fontFamily:"monospace",boxShadow:"inset 0 2px 4px rgba(0,0,0,0.1)"},quizSection:{marginTop:"2rem"},quizGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"1.5rem"},quizCard:{backgroundColor:"#f8fafc",padding:"1.5rem",borderRadius:"20px",border:"1px solid #f1f5f9"},question:{fontWeight:"700",color:"#1e293b",marginBottom:"0.75rem",fontSize:"1rem"},answer:{color:"#10b981",fontWeight:"600",lineHeight:"1.5",fontSize:"0.95rem"}},mr=t=>new Promise(n=>setTimeout(n,t)),hr=()=>{const[t,n]=i.useState({array:[2,1,5,1,3,2],k:3,windowStart:0,windowEnd:2,currentSum:0,maxSum:0,status:"idle",phase:"idle",message:"Ready to search."}),[a,d]=i.useState("python"),{showFeedback:o}=le(),[x,u]=i.useState(!0),b=i.useRef(!1);i.useEffect(()=>{let r=!0,c;const p=async()=>{t.status!=="running"||!b.current||!r||(await mr(1500),!(!b.current||!r)&&(n(l=>{if(l.status!=="running")return l;const y=C(l);return y.status!=="running"&&(b.current=!1),y}),b.current&&(c=setTimeout(p,100))))};return t.status==="running"&&b.current&&p(),()=>{r=!1,clearTimeout(c)}},[t.status]);const C=r=>{if(r.status==="idle"){const c=r.array.slice(0,r.k).reduce((p,l)=>p+l,0);return{...r,status:"running",phase:"init-window",windowStart:0,windowEnd:r.k-1,currentSum:c,maxSum:c,message:`Window covering indexes 0–${r.k-1}. Current sum is ${c}. Max sum is ${c}.`}}if(r.status==="running"){if(r.windowEnd>=r.array.length-1)return{...r,status:"completed",phase:"completed",message:`Reached the end of the array. The maximum sum of any window of size ${r.k} is ${r.maxSum}.`};if(r.phase==="init-window"||r.phase==="slide-window"){const c=r.windowStart+1,p=r.windowEnd+1,l=r.array[r.windowStart],y=r.array[p],B=r.currentSum-l+y,H=Math.max(r.maxSum,B);return{...r,phase:"slide-window",windowStart:c,windowEnd:p,currentSum:B,maxSum:H,message:`Sliding window forward. Removing index ${r.windowStart} (Value: ${l}), adding index ${p} (Value: ${y}). Updating window sum to ${B}.`}}}return r},R=r=>{const c=C(r);return c.status==="completed"&&r.status!=="completed"?o(`Maximum sum of ${c.maxSum} found! 🏆`,"success"):c.phase==="slide-window"&&r.phase!=="slide-window"&&o("Slide! 📷 New data captured."),c},I=()=>{if(t.k>t.array.length||t.k<=0){n(r=>({...r,message:"Invalid window size."}));return}A(),b.current=!0,n(r=>R({...r,status:"idle"})),u(!1)},j=()=>{if(t.k>t.array.length||t.k<=0){n(r=>({...r,message:"Invalid window size."}));return}b.current=!1,n(r=>R(r)),u(!1)},A=()=>{b.current=!1,n(r=>({...r,windowStart:0,windowEnd:r.k-1,currentSum:0,maxSum:0,status:"idle",phase:"idle",message:"Ready to search."}))};return e.jsxs("div",{style:V.container,children:[e.jsxs("div",{style:V.header,children:[e.jsx("h2",{style:V.title,children:"Sliding Window — The Moving Camera 📷"}),e.jsx("div",{style:V.desc,children:e.jsx("p",{children:"The Sliding Window is like a camera frame. Instead of looking at everything, we focus on a small part and slide it across!"})})]}),e.jsxs("div",{style:V.inputSection,children:[e.jsx("label",{style:V.inputLabel,children:"Window Size (k):"}),e.jsx("input",{type:"number",value:t.k,onChange:r=>{n(c=>({...c,k:parseInt(r.target.value)||0})),A()},style:V.inputBox,min:"1",max:t.array.length})]}),e.jsxs("div",{style:V.visualizer,children:[e.jsx("div",{style:{position:"relative",paddingBottom:"30px"},children:e.jsx("div",{style:V.arrayContainer,children:t.array.map((r,c)=>{let p="#F1F5F9",l="#1E293B";const y=t.status!=="idle"&&c>=t.windowStart&&c<=t.windowEnd,B=t.status!=="idle"&&c===t.windowStart-1,H=t.status!=="idle"&&c===t.windowEnd;return t.status==="completed"&&y?(p="#22C55E",l="white"):y&&t.phase!=="calc-sum"?H&&t.phase==="slide-window"?(p="#3B82F6",l="white"):(p="#FACC15",l="#1E293B"):B&&t.phase==="slide-window"&&(p="#EF4444",l="white"),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsxs(q.div,{style:{...V.box,backgroundColor:p,color:l},animate:{scale:y?1.08:1,boxShadow:y?"0 0 15px rgba(250, 204, 21, 0.4)":"none"},className:y?"pulse-glow":"",transition:{type:"spring",stiffness:300,damping:20},layout:!0,children:[e.jsx("span",{style:V.boxIndex,children:c}),e.jsx("span",{style:V.boxValue,children:r})]}),e.jsxs("div",{style:{height:"20px",marginTop:"8px",fontSize:"0.9rem",fontWeight:"bold",color:"#1E293B",display:"flex",gap:"4px"},children:[t.status!=="idle"&&t.windowStart===c&&e.jsx("span",{children:"["}),t.status!=="idle"&&t.windowEnd===c&&e.jsx("span",{children:"]"})]})]},c)})})}),t.status!=="idle"&&e.jsxs("div",{style:{display:"flex",gap:"2rem",marginBottom:"0.5rem"},children:[e.jsxs("div",{style:V.stateBox,children:[e.jsx("div",{style:{fontSize:"0.8rem",color:"#64748b",fontWeight:"bold"},children:"Current Window Sum"}),e.jsx("div",{style:{fontSize:"1.4rem",color:"#eab308",fontWeight:"900"},children:t.currentSum})]}),e.jsxs("div",{style:V.stateBox,children:[e.jsx("div",{style:{fontSize:"0.8rem",color:"#64748b",fontWeight:"bold"},children:"Maximum Sum Found"}),e.jsx("div",{style:{fontSize:"1.4rem",color:"#22c55e",fontWeight:"900"},children:t.maxSum})]})]}),e.jsx(X,{mode:"wait",children:e.jsx(q.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},style:{...V.messageBox,backgroundColor:t.status==="completed"?"#166534":"#1e293b"},children:t.message},t.message)}),e.jsx("div",{style:V.legend,children:[["#FACC15","In Window"],["#3B82F6","Newly Added"],["#EF4444","Just Removed"]].map(([r,c])=>e.jsxs("div",{style:V.legendItem,children:[e.jsx("div",{style:{...V.dot,backgroundColor:r}}),e.jsx("span",{children:c})]},c))})]}),e.jsx("div",{style:V.resultPanel,children:e.jsx("div",{style:V.resultText,children:t.status==="completed"?e.jsxs("span",{style:{color:"#16a34a"},children:["Result: Max Sum is ",t.maxSum]}):e.jsx("span",{style:{color:"#64748b"},children:"Waiting for sliding window to complete..."})})}),e.jsxs("div",{style:V.controls,children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx("button",{onClick:I,disabled:t.status==="running"||t.status==="completed",style:V.btn,children:"▶ Slide the Frame! 📷"}),x&&t.status==="idle"&&e.jsx("div",{className:"tooltip-hint",style:{bottom:"110%",left:"50%"},children:"Start the camera! ✨"})]}),e.jsx("button",{onClick:j,disabled:t.status==="completed",style:V.btn,children:"⏭ Next Slide"}),e.jsx("button",{onClick:A,style:V.btn,children:"↺ Reset All"})]}),e.jsxs("div",{style:V.codeSection,children:[e.jsx("h3",{style:V.subTitle,children:"Sliding Window Implementation (Max Sum Array)"}),e.jsx("div",{style:V.langSelector,children:["python","javascript","cpp"].map(r=>e.jsx("button",{onClick:()=>d(r),style:{...V.langBtn,backgroundColor:a===r?"#4f46e5":"#f1f5f9",color:a===r?"#fff":"#64748b",border:a===r?"none":"1px solid #e2e8f0"},children:r==="cpp"?"C++":r.toUpperCase()},r))}),e.jsxs("pre",{style:V.codeBox,children:[a==="python"&&e.jsx("code",{children:`def max_sub_array_of_size_k(k, arr):
    max_sum = 0
    window_sum = 0
    window_start = 0

    for window_end in range(len(arr)):
        window_sum += arr[window_end]  # Add the next element
        
        # Slide the window if we've hit size k
        if window_end >= k - 1:
            max_sum = max(max_sum, window_sum)
            window_sum -= arr[window_start]  # Subtract element going out
            window_start += 1  # Slide the window ahead
            
    return max_sum

# Time:  O(n)
# Space: O(1)`}),a==="javascript"&&e.jsx("code",{children:`function maxSubArrayOfSizeK(k, arr) {
    let maxSum = 0;
    let windowSum = 0;
    let windowStart = 0;

    for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
        windowSum += arr[windowEnd]; // Add the next element
        
        // Slide the window if we've hit size k
        if (windowEnd >= k - 1) {
            maxSum = Math.max(maxSum, windowSum);
            windowSum -= arr[windowStart]; // Subtract element going out
            windowStart++; // Slide the window ahead
        }
    }
    return maxSum;
}

// Time:  O(n)
// Space: O(1)`}),a==="cpp"&&e.jsx("code",{children:`#include <vector>
#include <algorithm>
using namespace std;

int maxSubArrayOfSizeK(int k, const vector<int>& arr) {
    int maxSum = 0;
    int windowSum = 0;
    int windowStart = 0;

    for (int windowEnd = 0; windowEnd < arr.size(); windowEnd++) {
        windowSum += arr[windowEnd]; // Add the next element
        
        // Slide the window if we've hit size k
        if (windowEnd >= k - 1) {
            maxSum = max(maxSum, windowSum);
            windowSum -= arr[windowStart]; // Subtract element going out
            windowStart++; // Slide the window ahead
        }
    }
    return maxSum;
}

// Time:  O(n)
// Space: O(1)`})]})]}),e.jsxs("div",{style:V.quizSection,children:[e.jsx("h3",{style:V.subTitle,children:"Knowledge Check"}),e.jsx("div",{style:V.quizGrid,children:[{q:"What problems does Sliding Window solve?",a:"Problems asking to find or calculate something among all contiguous subarrays (or sublists) of a given size."},{q:"Why is it more efficient than brute force?",a:"Because instead of recalculating the sum (or product, etc.) of the entire sub-array from scratch, we only calculate the difference between the old and new edges."},{q:"What is the standard time complexity jump?",a:"It often reduces O(n²) nested loop problems down to O(n) single pass loops."},{q:"What happens to the window edges?",a:"When the leading edge expands to encompass the target size `k`, the trailing edge begins sliding forward by subtracting its element from the total tracking score."}].map((r,c)=>e.jsxs("div",{style:V.quizCard,children:[e.jsxs("p",{style:V.question,children:[e.jsxs("strong",{children:["Q",c+1,":"]})," ",r.q]}),e.jsx("p",{style:V.answer,children:r.a})]},c))})]})]})},V={container:{padding:"2rem",backgroundColor:"#fff",borderRadius:"32px",border:"1px solid #e2e8f0",boxShadow:"0 4px 6px -1px rgba(0,0,0,0.05)",fontFamily:"system-ui, sans-serif"},header:{textAlign:"center",marginBottom:"2rem"},title:{fontSize:"2rem",fontWeight:"900",color:"#1e293b",letterSpacing:"-0.025em",marginBottom:"1rem"},desc:{color:"#64748b",fontSize:"1.05rem",lineHeight:"1.7",maxWidth:"750px",margin:"0 auto"},inputSection:{display:"flex",justifyContent:"center",alignItems:"center",gap:"1rem",marginBottom:"2rem"},inputLabel:{fontWeight:"700",color:"#1e293b",fontSize:"1.1rem"},inputBox:{padding:"0.5rem 1rem",fontSize:"1.1rem",borderRadius:"8px",border:"2px solid #cbd5e1",outline:"none",width:"100px",textAlign:"center",fontWeight:"600",color:"#0f172a"},visualizer:{background:"white",borderRadius:"16px",padding:"28px",boxShadow:"0 6px 18px rgba(0,0,0,0.06)",marginTop:"28px",display:"flex",flexDirection:"column",alignItems:"center",gap:"1.5rem",marginBottom:"1.5rem"},stateBox:{padding:"0.75rem 1.5rem",backgroundColor:"#fff",borderRadius:"12px",border:"1px solid #e2e8f0",boxShadow:"0 2px 4px rgba(0,0,0,0.05)",textAlign:"center",minWidth:"150px"},arrayContainer:{display:"flex",flexWrap:"wrap",gap:"16px",justifyContent:"center"},box:{width:"64px",height:"64px",borderRadius:"10px",background:"#F1F5F9",fontWeight:"600",fontSize:"18px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",transition:"background-color 0.3s, color 0.3s, opacity 0.3s"},boxIndex:{fontSize:"0.7rem",opacity:.7,marginBottom:"2px"},boxValue:{fontSize:"18px",fontWeight:"600"},messageBox:{color:"#fff",padding:"0.7rem 1.5rem",borderRadius:"12px",fontSize:"1rem",fontWeight:"700",textAlign:"center",minWidth:"300px"},legend:{display:"flex",gap:"1.5rem",flexWrap:"wrap",justifyContent:"center",marginTop:"1rem"},legendItem:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.9rem",color:"#64748b",fontWeight:"600"},dot:{width:"12px",height:"12px",borderRadius:"50%"},resultPanel:{background:"#F8FAFC",borderRadius:"12px",padding:"14px",marginTop:"16px",border:"1px solid #E2E8F0",textAlign:"center",width:"100%",maxWidth:"400px"},resultText:{fontSize:"1.2rem",fontWeight:"bold"},controls:{display:"flex",justifyContent:"center",gap:"1rem",marginBottom:"2rem",flexWrap:"wrap"},btn:{background:"#4F46E5",color:"white",borderRadius:"10px",padding:"10px 18px",fontWeight:"500",border:"none",cursor:"pointer",transition:"background-color 0.2s",fontSize:"1rem"},codeSection:{marginBottom:"3rem"},subTitle:{fontSize:"1.5rem",fontWeight:"900",color:"#1e293b",marginBottom:"1.5rem",textAlign:"center"},langSelector:{display:"flex",justifyContent:"center",gap:"0.75rem",marginBottom:"1.25rem"},langBtn:{padding:"0.6rem 1.2rem",borderRadius:"10px",fontSize:"0.9rem",fontWeight:"700",cursor:"pointer",transition:"all 0.2s"},codeBox:{backgroundColor:"#0f172a",color:"#f8fafc",padding:"1.5rem",borderRadius:"20px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",fontFamily:"monospace",boxShadow:"inset 0 2px 4px rgba(0,0,0,0.1)"},quizSection:{marginTop:"2rem"},quizGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"1.5rem"},quizCard:{backgroundColor:"#f8fafc",padding:"1.5rem",borderRadius:"20px",border:"1px solid #f1f5f9"},question:{fontWeight:"700",color:"#1e293b",marginBottom:"0.75rem",fontSize:"1rem"},answer:{color:"#10b981",fontWeight:"600",lineHeight:"1.5",fontSize:"0.95rem"}},fr=t=>new Promise(n=>setTimeout(n,t)),ht=[{id:"two-sum",title:"Two Sum",desc:"Given an array of integers and a target sum, find two numbers that add up to the target using a hash map or two pointers.",difficulty:"Easy",tag:"🎯"},{id:"binary-search",title:"Binary Search in Sorted Array",desc:"Implement standard binary search to find a target value in a sorted array in O(log n) time.",difficulty:"Easy",tag:"🔍"},{id:"first-bad-version",title:"First Bad Version",desc:"Find the first bad version in an API using binary search to minimize API calls.",difficulty:"Easy",tag:"🐛"},{id:"find-peak",title:"Find Peak Element",desc:"Find any peak element (an element greater than its neighbors) using binary search.",difficulty:"Medium",tag:"⛰️"},{id:"search-rotated",title:"Search in Rotated Sorted Array",desc:"Find a target in a sorted array that has been rotated, still strictly using O(log n) time.",difficulty:"Medium",tag:"🔄"},{id:"min-rotated",title:"Minimum in Rotated Sorted Array",desc:"Find the minimum element in a rotated sorted array using binary search.",difficulty:"Medium",tag:"⬇️"},{id:"k-closest",title:"K Closest Elements",desc:"Find the k closest elements to a given value x in a sorted array using binary search and two pointers.",difficulty:"Medium",tag:"🤏"},{id:"median-two-sorted",title:"Median of Two Sorted Arrays",desc:"Find the median of two sorted arrays of different sizes in O(log(min(m, n))) time.",difficulty:"Hard",tag:"📊"}],ft=t=>({padding:"3px 10px",borderRadius:"999px",fontSize:"12px",fontWeight:"700",backgroundColor:t==="Easy"?"#dcfce7":t==="Medium"?"#fff7ed":"#fee2e2",color:t==="Easy"?"#15803d":t==="Medium"?"#c2410c":"#b91c1c",display:"inline-block"}),We=({title:t,steps:n,initState:a})=>{const[d,o]=i.useState(0),[x,u]=i.useState(!1),[b,C]=i.useState(!1),[R,I]=i.useState(a),j=i.useRef(!1),A=()=>{j.current=!0,setTimeout(()=>{j.current=!1},100),o(0),u(!1),C(!1),I(a)},r=async()=>{j.current=!1,C(!0),u(!1);for(let l=0;l<n.length;l++){if(j.current)return;o(l),I(n[l].state),await fr(900)}u(!0),C(!1),o(n.length-1),window.AppProgress&&window.AppProgress.markProblemSolved()},c=()=>{if(x||b)return;const l=Math.min(d+1,n.length-1);o(l),I(n[l].state),l===n.length-1&&u(!0)},p=n[d];return e.jsxs("div",{style:Ee.wrap,children:[e.jsx("div",{style:Ee.desc,children:t}),e.jsxs("div",{style:Ee.vizArea,children:[e.jsx("div",{style:{display:"flex",gap:"6px",alignItems:"flex-end",justifyContent:"center",flexWrap:"wrap",marginBottom:"12px"},children:R.map((l,y)=>e.jsx("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},children:e.jsx("div",{style:{...Ee.cell,backgroundColor:l.color||"#F1F5F9",border:"2px solid "+(l.border||"#cbd5e1"),minWidth:l.label?"50px":"40px",fontSize:l.label?"0.7rem":"0.9rem"},children:l.label||l.val})},y))}),p&&e.jsx("div",{style:Ee.msg,children:p.msg})]}),e.jsxs("div",{style:Ee.controls,children:[e.jsx("button",{onClick:r,disabled:b,style:Ee.btn("#4F46E5"),children:"▶ Start Animation"}),e.jsx("button",{onClick:c,disabled:b||x,style:Ee.btn("#0891b2"),children:"⏭ Next Step"}),e.jsx("button",{onClick:A,style:Ee.btn("#ef4444"),children:"↺ Reset"})]})]})},gt=[{msg:"Input: [2, 7, 11, 15], Target = 9. Use Hash Map.",state:[{val:2},{val:7},{val:11},{val:15}].map(t=>({...t,color:"#F1F5F9"}))},{msg:"Check 2: 9-2 = 7 in map? No. Add 2 to map.",state:[{val:2,color:"#FACC15"},{val:7},{val:11},{val:15}]},{msg:"Check 7: 9-7 = 2 in map? Yes! Found pair.",state:[{val:2,color:"#22C55E"},{val:7,color:"#22C55E"},{val:11},{val:15}]}],xt=[{msg:"Search for 7 in [1, 3, 5, 7, 9]. lo=0, hi=4",state:[{val:1},{val:3},{val:5},{val:7},{val:9}].map((t,n)=>({...t,border:n===0||n===4?"#3B82F6":"#cbd5e1"}))},{msg:"mid = 2 (val: 5). 5 < 7. Search Right.",state:[{val:1,color:"#cbd5e1"},{val:3,color:"#cbd5e1"},{val:5,color:"#FACC15"},{val:7},{val:9}]},{msg:"lo=3, hi=4. mid = 3 (val: 7). Found!",state:[{val:1,color:"#cbd5e1"},{val:3,color:"#cbd5e1"},{val:5,color:"#cbd5e1"},{val:7,color:"#22C55E"},{val:9}]}],bt=[{msg:"Versions: [G, G, G, B, B]. Find first Bad.",state:[{label:"1"},{label:"2"},{label:"3"},{label:"4"},{label:"5"}]},{msg:"Check mid=3. API says GOOD. Search right.",state:[{label:"1",color:"#cbd5e1"},{label:"2",color:"#cbd5e1"},{label:"3",color:"#FACC15"},{label:"4"},{label:"5"}]},{msg:"Check mid=4. API says BAD. Look left to be sure.",state:[{label:"1",color:"#cbd5e1"},{label:"2",color:"#cbd5e1"},{label:"3",color:"#cbd5e1"},{label:"4",color:"#FACC15"},{label:"5",color:"#cbd5e1"}]},{msg:"Version 4 is the first Bad!",state:[{label:"1",color:"#cbd5e1"},{label:"2",color:"#cbd5e1"},{label:"3",color:"#cbd5e1"},{label:"4",color:"#EF4444"},{label:"5",color:"#cbd5e1"}]}],yt=[{msg:"Find Peak in [1, 2, 1, 3, 5, 6, 4]",state:[1,2,1,3,5,6,4].map(t=>({val:t}))},{msg:"mid = 3 (val: 3). Next is 5. 3 < 5 -> Look right.",state:[1,2,1,3,5,6,4].map((t,n)=>({val:t,color:n===3?"#FACC15":"#F1F5F9"}))},{msg:"mid = 5 (val: 6). Next is 4. 6 > 4 -> Look left.",state:[1,2,1,3,5,6,4].map((t,n)=>({val:t,color:n<4?"#cbd5e1":n===5?"#FACC15":"#F1F5F9"}))},{msg:"Peak is 6!",state:[1,2,1,3,5,6,4].map((t,n)=>({val:t,color:n===5?"#22C55E":"#cbd5e1"}))}],jt=[{msg:"Search 0 in [4, 5, 6, 7, 0, 1, 2]",state:[4,5,6,7,0,1,2].map(t=>({val:t}))},{msg:"mid=3, val=7. Array left half [4..7] is sorted.",state:[4,5,6,7,0,1,2].map((t,n)=>({val:t,color:n===3?"#FACC15":n<=2?"#dbeafe":"#F1F5F9"}))},{msg:"0 is NOT in [4..7]. Search right half.",state:[4,5,6,7,0,1,2].map((t,n)=>({val:t,color:n<=3?"#cbd5e1":"#F1F5F9"}))},{msg:"Found 0 at index 4!",state:[4,5,6,7,0,1,2].map((t,n)=>({val:t,color:n===4?"#22C55E":"#cbd5e1"}))}],vt=[{msg:"Find Min in [4, 5, 6, 7, 0, 1, 2]",state:[4,5,6,7,0,1,2].map(t=>({val:t}))},{msg:"mid=3 (val=7). 7 > rightmost(2), min is to the right.",state:[4,5,6,7,0,1,2].map((t,n)=>({val:t,color:n===3?"#FACC15":n===6?"#3B82F6":"#F1F5F9"}))},{msg:"lo=4, hi=6. mid=5 (val=1). 1 < rightmost(2), min is to the left.",state:[4,5,6,7,0,1,2].map((t,n)=>({val:t,color:n===5?"#FACC15":n<=3?"#cbd5e1":"#F1F5F9"}))},{msg:"Found min 0 at index 4!",state:[4,5,6,7,0,1,2].map((t,n)=>({val:t,color:n===4?"#22C55E":"#cbd5e1"}))}],St=[{msg:"Find 3 closest to 4 in [1, 2, 3, 4, 5].",state:[1,2,3,4,5].map(t=>({val:t}))},{msg:"Binary search finds exactly 4 at index 3.",state:[1,2,3,4,5].map((t,n)=>({val:t,color:n===3?"#FACC15":"#F1F5F9"}))},{msg:"Expand outwards. 3 and 5 are tied, take smaller (3).",state:[1,2,3,4,5].map((t,n)=>({val:t,color:n===2||n===3?"#22C55E":"#F1F5F9"}))},{msg:"Next closest is 5.",state:[1,2,3,4,5].map((t,n)=>({val:t,color:n>=2&&n<=4?"#22C55E":"#cbd5e1"}))}],wt=[{msg:"Arrays A: [1, 3], B: [2]. Total len 3 (odd). Target Median is rank 2.",state:[{label:"A: 1"},{label:"3"},{label:"B: 2"},{label:" "}]},{msg:"Binary search on smaller array A to partition elements.",state:[{label:"A: 1",color:"#FACC15"},{label:"3"},{label:"B: 2",color:"#FACC15"},{label:" "}]},{msg:"Partition valid logic: A_left < B_right and B_left < A_right.",state:[{label:"A: 1",color:"#22C55E"},{label:"3"},{label:"B: 2"},{label:" "}]},{msg:"Median is max(A_left, B_left) for odd length = 2.",state:[{label:"A: 1"},{label:"3"},{label:"B: 2",color:"#22C55E"},{label:" "}]}],gr={"two-sum":{python:`def twoSum(nums, target):
    hash_map = {}
    for i, num in enumerate(nums):
        diff = target - num
        if diff in hash_map:
            return [hash_map[diff], i]
        hash_map[num] = i
    return []
# Time: O(n)  Space: O(n)`,javascript:`function twoSum(nums, target) {
    const map = new Map();
    for(let i=0; i<nums.length; i++) {
        let diff = target - nums[i];
        if(map.has(diff)) return [map.get(diff), i];
        map.set(nums[i], i);
    }
    return [];
}`,cpp:`vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> map;
    for (int i=0; i<nums.size(); i++) {
        if (map.count(target - nums[i]))
            return {map[target - nums[i]], i};
        map[nums[i]] = i;
    }
    return {};
}`},"binary-search":{python:`def search(nums, target):
    l, r = 0, len(nums)-1
    while l <= r:
        m = (l + r) // 2
        if nums[m] == target: return m
        elif nums[m] < target: l = m + 1
        else: r = m - 1
    return -1`,javascript:`function search(nums, target) {
    let l = 0, r = nums.length - 1;
    while(l <= r) {
        let m = Math.floor((l + r) / 2);
        if(nums[m] === target) return m;
        if(nums[m] < target) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`,cpp:`int search(vector<int>& nums, int target) {
    int l = 0, r = nums.size() - 1;
    while(l <= r) {
        int m = l + (r - l) / 2;
        if(nums[m] == target) return m;
        if(nums[m] < target) l = m + 1;
        else r = m - 1;
    }
    return -1;
}`},"first-bad-version":{python:`def firstBadVersion(n):
    l, r = 1, n
    while l < r:
        mid = (l + r) // 2
        if isBadVersion(mid):
            r = mid
        else:
            l = mid + 1
    return l`,javascript:`function firstBadVersion(n) {
    let l = 1, r = n;
    while(l < r) {
        let mid = Math.floor((l + r)/2);
        if(isBadVersion(mid)) r = mid;
        else l = mid + 1;
    }
    return l;
}`,cpp:`int firstBadVersion(int n) {
    int l = 1, r = n;
    while(l < r) {
        int mid = l + (r - l) / 2;
        if(isBadVersion(mid)) r = mid;
        else l = mid + 1;
    }
    return l;
}`},"find-peak":{python:`def findPeakElement(nums):
    l, r = 0, len(nums) - 1
    while l < r:
        m = (l + r) // 2
        if nums[m] > nums[m+1]:
            r = m
        else:
            l = m + 1
    return l`,javascript:`function findPeakElement(nums) {
    let l = 0, r = nums.length - 1;
    while(l < r) {
        let m = Math.floor((l + r)/2);
        if(nums[m] > nums[m+1]) r = m;
        else l = m + 1;
    }
    return l;
}`,cpp:`int findPeakElement(vector<int>& nums) {
    int l = 0, r = nums.size() - 1;
    while(l < r) {
        int m = l + (r - l) / 2;
        if(nums[m] > nums[m+1]) r = m;
        else l = m + 1;
    }
    return l;
}`},"search-rotated":{python:`def search(nums, target):
    l, r = 0, len(nums)-1
    while l <= r:
        m = (l + r) // 2
        if nums[m] == target: return m
        if nums[l] <= nums[m]: # Left half sorted
            if nums[l] <= target < nums[m]: r = m - 1
            else: l = m + 1
        else: # Right half sorted
            if nums[m] < target <= nums[r]: l = m + 1
            else: r = m - 1
    return -1`,javascript:`function search(nums, target) {
    let l = 0, r = nums.length - 1;
    while (l <= r) {
        let m = Math.floor((l + r)/2);
        if (nums[m] === target) return m;
        if (nums[l] <= nums[m]) {
            if (nums[l] <= target && target < nums[m]) r = m - 1;
            else l = m + 1;
        } else {
            if (nums[m] < target && target <= nums[r]) l = m + 1;
            else r = m - 1;
        }
    }
    return -1;
}`,cpp:`int search(vector<int>& nums, int target) {
    int l = 0, r = nums.size() - 1;
    while (l <= r) {
        int m = l + (r - l)/2;
        if (nums[m] == target) return m;
        if (nums[l] <= nums[m]) {
            if (nums[l] <= target && target < nums[m]) r = m - 1;
            else l = m + 1;
        } else {
            if (nums[m] < target && target <= nums[r]) l = m + 1;
            else r = m - 1;
        }
    }
    return -1;
}`},"min-rotated":{python:`def findMin(nums):
    l, r = 0, len(nums) - 1
    while l < r:
        m = (l + r) // 2
        if nums[m] > nums[r]:
            l = m + 1
        else:
            r = m
    return nums[l]`,javascript:`function findMin(nums) {
    let l = 0, r = nums.length - 1;
    while(l < r) {
        let m = Math.floor((l + r)/2);
        if(nums[m] > nums[r]) l = m + 1;
        else r = m;
    }
    return nums[l];
}`,cpp:`int findMin(vector<int>& nums) {
    int l = 0, r = nums.size() - 1;
    while(l < r) {
        int m = l + (r - l)/2;
        if(nums[m] > nums[r]) l = m + 1;
        else r = m;
    }
    return nums[l];
}`},"k-closest":{python:`def findClosestElements(arr, k, x):
    l, r = 0, len(arr) - k
    while l < r:
        m = (l + r) // 2
        if x - arr[m] > arr[m + k] - x:
            l = m + 1
        else:
            r = m
    return arr[l:l+k]`,javascript:`function findClosestElements(arr, k, x) {
    let l = 0, r = arr.length - k;
    while (l < r) {
        let m = Math.floor((l + r)/2);
        if (x - arr[m] > arr[m + k] - x) l = m + 1;
        else r = m;
    }
    return arr.slice(l, l + k);
}`,cpp:`vector<int> findClosestElements(vector<int>& arr, int k, int x) {
    int l = 0, r = arr.size() - k;
    while (l < r) {
        int m = l + (r - l)/2;
        if (x - arr[m] > arr[m + k] - x) l = m + 1;
        else r = m;
    }
    return vector<int>(arr.begin() + l, arr.begin() + l + k);
}`},"median-two-sorted":{python:`def findMedianSortedArrays(nums1, nums2):
    A, B = nums1, nums2
    total = len(nums1) + len(nums2)
    half = total // 2
    if len(B) < len(A): A, B = B, A
    
    l, r = 0, len(A) - 1
    while True:
        i = (l + r) // 2
        j = half - i - 2
        
        Aleft = A[i] if i >= 0 else float("-infinity")
        Aright = A[i + 1] if (i + 1) < len(A) else float("infinity")
        Bleft = B[j] if j >= 0 else float("-infinity")
        Bright = B[j + 1] if (j + 1) < len(B) else float("infinity")
        
        if Aleft <= Bright and Bleft <= Aright:
            if total % 2: return min(Aright, Bright)
            return (max(Aleft, Bleft) + min(Aright, Bright)) / 2
        elif Aleft > Bright: r = i - 1
        else: l = i + 1`,javascript:`function findMedianSortedArrays(nums1, nums2) {
    // Advanced algorithm O(log(min(m,n)))
    // Not fitting small code box fully, but concept aligns.
}`,cpp:`double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    // Detailed partition approach
    // Returning 0 for brevity placeholder
    return 0;
}`}},xr=({id:t})=>t==="two-sum"?e.jsx(We,{title:"Two Sum via Hash Map",steps:gt,initState:gt[0].state}):t==="binary-search"?e.jsx(We,{title:"Binary Search",steps:xt,initState:xt[0].state}):t==="first-bad-version"?e.jsx(We,{title:"First Bad Version",steps:bt,initState:bt[0].state}):t==="find-peak"?e.jsx(We,{title:"Find Peak",steps:yt,initState:yt[0].state}):t==="search-rotated"?e.jsx(We,{title:"Search Rotated",steps:jt,initState:jt[0].state}):t==="min-rotated"?e.jsx(We,{title:"Min Rotated",steps:vt,initState:vt[0].state}):t==="k-closest"?e.jsx(We,{title:"K Closest",steps:St,initState:St[0].state}):t==="median-two-sorted"?e.jsx(We,{title:"Median Two Arrays",steps:wt,initState:wt[0].state}):null,br=()=>{const[t,n]=i.useState(ht[0]),[a,d]=i.useState("python");return e.jsx("div",{style:De.outer,children:e.jsxs("div",{style:De.split,children:[e.jsx("div",{style:De.left,children:ht.map(o=>e.jsxs("div",{onClick:()=>{n(o),d("python")},style:{...De.card,boxShadow:t.id===o.id?"0 0 0 2px #4F46E5":"0 4px 10px rgba(0,0,0,0.05)",backgroundColor:t.id===o.id?"#F0F1FE":"#fff"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"6px"},children:[e.jsxs("span",{style:{fontWeight:"800",color:"#1E293B",fontSize:"0.98rem"},children:[o.tag," ",o.title]}),e.jsx("span",{style:ft(o.difficulty),children:o.difficulty})]}),e.jsx("p",{style:{fontSize:"0.82rem",color:"#64748B",margin:0,lineHeight:"1.5"},children:o.desc}),e.jsx("button",{style:{...De.viewBtn,marginTop:"10px",backgroundColor:t.id===o.id?"#4F46E5":"#F1F5F9",color:t.id===o.id?"#fff":"#4F46E5"},children:t.id===o.id?"▸ Viewing Solution":"View Animated Solution"})]},o.id))}),e.jsx("div",{style:De.right,children:e.jsx(X,{mode:"wait",children:e.jsx(q.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},exit:{opacity:0},transition:{duration:.25},children:e.jsxs("div",{style:De.panel,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",flexWrap:"wrap",gap:"8px"},children:[e.jsxs("h3",{style:{margin:0,fontSize:"1.3rem",fontWeight:"900",color:"#1E293B"},children:[t.tag," ",t.title]}),e.jsx("span",{style:ft(t.difficulty),children:t.difficulty})]}),e.jsx("p",{style:{color:"#64748B",marginBottom:"20px",lineHeight:"1.6",fontSize:"0.95rem"},children:t.desc}),e.jsx(xr,{id:t.id}),e.jsxs("div",{style:{marginTop:"24px"},children:[e.jsx("h4",{style:{fontWeight:"800",color:"#1E293B",marginBottom:"12px"},children:"Implementation"}),e.jsx("div",{style:{display:"flex",gap:"8px",marginBottom:"12px",flexWrap:"wrap"},children:["python","javascript","cpp"].map(o=>e.jsx("button",{onClick:()=>d(o),style:{padding:"5px 14px",borderRadius:"8px",border:a===o?"none":"1px solid #E2E8F0",backgroundColor:a===o?"#4F46E5":"#F8FAFC",color:a===o?"#fff":"#64748B",fontWeight:"700",cursor:"pointer",fontSize:"0.85rem"},children:o==="cpp"?"C++":o.toUpperCase()},o))}),e.jsx("pre",{style:{backgroundColor:"#0F172A",color:"#F8FAFC",padding:"1.2rem",borderRadius:"14px",overflowX:"auto",fontSize:"0.85rem",lineHeight:"1.6",fontFamily:"monospace",margin:0},children:e.jsx("code",{children:gr[t.id]?.[a]||"// implementation details"})})]})]})},t.id)})})]})})},Ee={wrap:{display:"flex",flexDirection:"column",gap:"12px"},desc:{fontSize:"0.9rem",color:"#64748B",lineHeight:"1.6",backgroundColor:"#F1F5F9",borderRadius:"10px",padding:"10px 14px"},vizArea:{backgroundColor:"#F8FAFC",border:"1px solid #E2E8F0",borderRadius:"14px",padding:"20px",display:"flex",flexDirection:"column",gap:"12px",alignItems:"center",minHeight:"120px"},cell:{width:"40px",height:"40px",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"900",fontSize:"0.9rem",color:"#1E293B",transition:"background-color 0.3s, outline 0.2s"},msg:{backgroundColor:"#1E293B",color:"#fff",padding:"8px 16px",borderRadius:"10px",fontSize:"0.88rem",fontWeight:"700",textAlign:"center"},controls:{display:"flex",gap:"8px",justifyContent:"center",flexWrap:"wrap"},btn:t=>({padding:"8px 16px",borderRadius:"10px",border:"none",backgroundColor:t,color:"#fff",fontWeight:"700",cursor:"pointer",fontSize:"0.9rem"})},De={outer:{fontFamily:"system-ui, sans-serif",width:"100%"},split:{display:"flex",gap:"20px",alignItems:"flex-start",flexWrap:"wrap"},left:{flex:"0 0 38%",minWidth:"260px",display:"flex",flexDirection:"column",gap:"12px"},right:{flex:1,minWidth:"300px"},card:{borderRadius:"14px",padding:"16px",cursor:"pointer",transition:"box-shadow 0.2s, background-color 0.15s",border:"1px solid #F1F5F9"},viewBtn:{padding:"6px 14px",borderRadius:"8px",border:"none",cursor:"pointer",fontWeight:"700",fontSize:"0.82rem",transition:"all 0.2s"},panel:{backgroundColor:"#F8FAFC",borderRadius:"16px",padding:"24px",border:"1px solid #E2E8F0"}},Ct=[{id:"linear",label:"Linear Search"},{id:"binary",label:"Binary Search"},{id:"twopointer",label:"Two Pointer Search"},{id:"sliding",label:"Sliding Window Search"},{id:"practice",label:"Searching Practice Problems"}],yr=({name:t})=>e.jsxs("div",{style:{padding:"3rem",textAlign:"center",color:"#64748b",fontFamily:"system-ui, sans-serif"},children:[e.jsx("div",{style:{fontSize:"3rem",marginBottom:"1rem"},children:"🚧"}),e.jsx("h3",{style:{fontSize:"1.5rem",fontWeight:"700",color:"#1e293b",marginBottom:"0.5rem"},children:t}),e.jsx("p",{style:{fontSize:"1rem"},children:"This metaphor is coming soon. Stay tuned!"})]}),jr=()=>{const[t,n]=i.useState("linear"),a=()=>{switch(t){case"linear":return e.jsx(lr,{});case"binary":return e.jsx(cr,{});case"twopointer":return e.jsx(ur,{});case"sliding":return e.jsx(hr,{});case"practice":return e.jsx(br,{});default:return e.jsx(yr,{name:Ct.find(d=>d.id===t)?.label})}};return e.jsx("div",{style:we.shell,children:e.jsxs("div",{style:we.contentWrapper,children:[e.jsxs("div",{style:we.heroSection,children:[e.jsx("h1",{style:we.heroTitle,children:"Searching Algorithms"}),e.jsx("p",{style:we.heroSubtitle,children:"Searching algorithms help locate elements inside data structures such as arrays or lists. Efficient searching is essential for databases, applications, and large datasets."})]}),e.jsx("div",{style:we.topBar,children:e.jsx("div",{style:we.tabs,children:Ct.map(d=>e.jsxs("button",{style:{...we.tab,color:t===d.id?"#0f172a":"#64748b",opacity:t===d.id?1:.65,fontWeight:t===d.id?"700":"500"},onClick:()=>n(d.id),children:[d.label,t===d.id&&e.jsx(q.div,{layoutId:"activeTabUnderlineSearching",style:we.activeUnderline,transition:{type:"spring",bounce:.2,duration:.5}})]},d.id))})}),e.jsx("div",{style:we.content,children:e.jsx(X,{mode:"wait",children:e.jsx(q.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},exit:{opacity:0},transition:{duration:.2,ease:"easeOut"},children:a()},t)})})]})})},we={shell:{width:"100%",minHeight:"100vh",backgroundColor:"#fff",fontFamily:"'Inter', system-ui, -apple-system, sans-serif"},contentWrapper:{maxWidth:"1100px",margin:"0 auto",padding:"0 1.5rem"},heroSection:{textAlign:"center",padding:"2.5rem 0 1.5rem 0"},heroTitle:{fontSize:"2.75rem",fontWeight:"900",color:"#0f172a",marginBottom:"0.5rem",letterSpacing:"-1.5px",lineHeight:"1.1"},heroSubtitle:{fontSize:"1.1rem",color:"#475569",maxWidth:"700px",margin:"0 auto",lineHeight:"1.6",opacity:.8},topBar:{display:"flex",justifyContent:"center",borderBottom:"1px solid #f1f5f9",marginBottom:"1.5rem",position:"sticky",top:"72px",backgroundColor:"rgba(255,255,255,0.85)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",zIndex:100,padding:"0.5rem 0",scrollMarginTop:"80px"},tabs:{display:"flex",gap:"0.5rem",padding:"0 1rem",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",maskImage:"linear-gradient(to right, transparent, black 5%, black 95%, transparent)",WebkitMaskImage:"linear-gradient(to right, transparent, black 5%, black 95%, transparent)"},tab:{padding:"0.6rem 1.2rem",background:"none",border:"none",fontSize:"0.875rem",cursor:"pointer",transition:"all 0.2s ease",display:"flex",alignItems:"center",gap:"10px",whiteSpace:"nowrap",borderRadius:"8px",position:"relative"},activeUnderline:{position:"absolute",bottom:"-0.5rem",left:"20%",right:"20%",height:"2px",backgroundColor:"#3b82f6",borderRadius:"2px"},content:{minHeight:"600px",marginBottom:"2rem"}},vr=t=>new Promise(n=>setTimeout(n,t)),xe=5,Sr=()=>{const[t,n]=i.useState("play"),{showFeedback:a}=le(),[d,o]=i.useState(!0),[x,u]=i.useState(0),[b,C]=i.useState("Climb the stairs! Find the optimal paths."),[R,I]=i.useState(new Set),[j,A]=i.useState(Array(xe+1).fill("?")),[r,c]=i.useState(-1),[p,l]=i.useState(!1),[y,B]=i.useState(null),H=i.useRef(!1),[M,T]=i.useState("python"),[$,v]=i.useState(!1),z=(()=>{const w=[1,1];for(let W=2;W<=xe;W++)w[W]=w[W-1]+w[W-2];return w})(),E=()=>{u(0),C("Climb the stairs! Find the optimal paths.")},h=()=>{E(),I(new Set),A(Array(xe+1).fill("?"))},s=w=>{if(x===xe)return;const W=x+w;if(W>xe){C("Oops! You overshoot the top step.");return}if(u(W),W===xe){newSolved.add(W),I(newSolved),a("Success! You reached the top step. 🚀","success");const P=[...j];P[W]=z[W],A(P)}else if(R.has(W))C("This subproblem was already solved.");else{C(`Climbed to step ${W}.`);const P=new Set(R);P.add(W),I(P);const N=[...j];N[W]=z[W],A(N)}},m=()=>{const w=[],W={},P=N=>{if(w.push({node:N,msg:`Calculating f(${N})...`,memo:{...W}}),N===0||N===1)return W[N]=1,w.push({node:N,msg:`Base case: f(${N}) = 1`,memo:{...W}}),1;if(W[N]!==void 0)return w.push({node:N,msg:"This subproblem was already solved.",memo:{...W},hit:!0}),W[N];const U=P(N-1)+P(N-2);return W[N]=U,w.push({node:N,msg:`Stored result: f(${N}) = ${U}`,memo:{...W}}),U};return P(xe),w.push({node:xe,msg:`Finished! ${W[xe]} ways to reach top.`,memo:{...W},done:!0}),w},k=()=>{const w=[],W=Array(xe+1).fill("?");W[0]=1,w.push({node:0,msg:"Base case: dp[0] = 1",dp:[...W]}),W[1]=1,w.push({node:1,msg:"Base case: dp[1] = 1",dp:[...W]});for(let P=2;P<=xe;P++)w.push({node:P,msg:`Calculating dp[${P}] = dp[${P-1}] + dp[${P-2}]`,dp:[...W]}),W[P]=W[P-1]+W[P-2],w.push({node:P,msg:`dp[${P}] = ${W[P-1]} + ${W[P-2]} = ${W[P]}`,dp:[...W]});return w.push({node:xe,msg:"Finished Table Construction!",dp:[...W],done:!0}),w},S=async w=>{if(p)return;l(!0),H.current=!1,c(-1);const W=w==="memo"?m():k();for(let P=0;P<W.length&&!H.current;P++){c(P);const N=W[P];if(B(N.node),C(N.msg),N.done?a("Success! Simulation complete. 🎓","success"):N.hit&&a("Hitting the memo! 🧠"),w==="memo"){const U=Array(xe+1).fill("?");Object.keys(N.memo).forEach(te=>{U[te]=N.memo[te]+(N.hit&&parseInt(te)===N.node?" (Mem)":"")}),A(U)}else A(N.dp);await vr(1e3)}l(!1),B(null)},g=()=>{H.current=!0,l(!1)},f=w=>{g(),n(w),h(),(w==="tab"||w==="memo")&&(C(w==="tab"?"Click Start to build the DP table Bottom-Up.":"Click Start to trace Top-Down Memoization."),A(Array(xe+1).fill("?")))},F=w=>{const W=t==="play"?x===w:y===w;if(W&&w===xe)return"#22C55E";if(W)return"#FACC15";const P=j[w];return P!=="?"&&typeof P=="string"&&P.includes("(Mem)")?"#A855F7":P!=="?"?"#3B82F6":"#F1F5F9"};return e.jsxs("div",{style:Z.container,children:[e.jsxs("div",{style:Z.card,children:[e.jsx("h3",{style:Z.title,children:"Climbing Stairs — Infinite Tower Challenge"}),e.jsxs("p",{style:Z.desc,children:["Imagine a tower with ",xe," steps. You can climb either ",e.jsx("strong",{children:"1 step"})," or ",e.jsx("strong",{children:"2 steps"})," at a time. The challenge is to find how many different ways you can reach each step all the way to the top."]})]}),e.jsxs("div",{style:{display:"flex",gap:"10px",marginBottom:"20px",justifyContent:"center",flexWrap:"wrap"},children:[e.jsx("button",{onClick:()=>f("play"),style:{...Z.modeBtn,background:t==="play"?"#4F46E5":"#F1F5F9",color:t==="play"?"white":"#1E293B"},children:"Interactive Gameplay"}),e.jsx("button",{onClick:()=>f("memo"),style:{...Z.modeBtn,background:t==="memo"?"#4F46E5":"#F1F5F9",color:t==="memo"?"white":"#1E293B"},children:"Enable Memoization"}),e.jsx("button",{onClick:()=>f("tab"),style:{...Z.modeBtn,background:t==="tab"?"#4F46E5":"#F1F5F9",color:t==="tab"?"white":"#1E293B"},children:"Bottom-Up Mode"})]}),e.jsxs("div",{style:Z.visualizer,children:[e.jsx("div",{style:{flex:"1 1 350px",display:"flex",flexDirection:"column",paddingRight:"20px",borderRight:"2px dashed #E2E8F0",justifyContent:"flex-end",minHeight:"400px",position:"relative"},children:e.jsx("div",{style:{position:"relative",height:"100%",display:"flex",flexDirection:"column-reverse",alignItems:"flex-start"},children:[...Array(xe+1).keys()].map(w=>e.jsxs("div",{style:{width:"120px",height:"60px",borderRadius:"10px",background:F(w),fontWeight:"600",display:"flex",alignItems:"center",justifyContent:"center",marginLeft:`${w*45}px`,marginBottom:"5px",transition:"background-color 0.3s, transform 0.2s",className:F(w)==="#FACC15"||F(w)==="#22C55E"?"pulse-glow":"",boxShadow:F(w)==="#FACC15"?"0 0 15px rgba(250, 204, 21, 0.5)":"0 4px 10px rgba(0,0,0,0.05)",color:F(w)==="#F1F5F9"?"#1E293B":"white",position:"relative"},children:["Step ",w,F(w)==="#FACC15"&&e.jsx(q.span,{layoutId:"climber",initial:{opacity:0,y:10},animate:{opacity:1,y:-45},transition:{type:"spring",stiffness:300,damping:25},style:{position:"absolute",fontSize:"2.5rem",zIndex:10},children:"🧗"})]},w))})}),e.jsxs("div",{style:{flex:"1 1 350px",display:"flex",flexDirection:"column",paddingLeft:"20px"},children:[e.jsx("div",{style:Z.messageBox,children:b}),e.jsxs("div",{style:Z.controlsRow,children:[t==="play"&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx(q.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>{s(1),o(!1)},disabled:x>=xe,style:Z.btn("#3B82F6"),children:"🏃 Take 1 Step"}),d&&e.jsx("div",{className:"tooltip-hint",style:{bottom:"110%",left:"50%"},children:"Climb towards the top! ✨"})]}),e.jsx(q.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>{s(2),o(!1)},disabled:x>=xe-1,style:Z.btn("#10B981"),children:"🏃 Take 2 Steps"}),e.jsx(q.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:E,style:Z.btn("#64748B"),children:"↺ Restart Run"}),e.jsx(q.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:h,style:Z.btn("#EF4444"),children:"🗑 Reset Game"})]}),t!=="play"&&e.jsxs(e.Fragment,{children:[e.jsx(q.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>S(t),disabled:p,style:Z.btn("#4F46E5"),children:"▶ Start Animation 🎬"}),e.jsx(q.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:h,style:Z.btn("#EF4444"),children:"↺ Reset"})]})]}),e.jsxs("div",{style:{marginTop:"20px",background:"#F8FAFC",padding:"16px",borderRadius:"12px",border:"1px solid #E2E8F0"},children:[e.jsxs("h4",{style:{margin:"0 0 16px 0",fontSize:"1.1rem",color:"#1E293B",display:"flex",justifyContent:"space-between"},children:["DP Table Formulation",e.jsx("span",{style:{fontSize:"0.85rem",color:"#64748B",fontWeight:"normal"},children:"Amount → Minimum coins... wait, Ways → Steps"})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[e.jsx(X,{children:[...Array(xe+1).keys()].filter(w=>j[w]!=="?").map(w=>e.jsxs(q.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{duration:.3},style:{display:"flex",justifyContent:"space-between",padding:"10px 16px",background:typeof j[w]=="string"&&j[w].includes("(Mem)")?"#F3E8FF":"#DBEAFE",borderRadius:"8px",borderLeft:`4px solid ${typeof j[w]=="string"&&j[w].includes("(Mem)")?"#A855F7":"#3B82F6"}`},children:[e.jsxs("span",{style:{fontWeight:600,color:"#1E293B"},children:["Step ",w]}),e.jsxs("span",{style:{fontWeight:800,color:typeof j[w]=="string"&&j[w].includes("(Mem)")?"#7E22CE":"#1D4ED8"},children:[typeof j[w]=="string"?j[w].replace("(Mem)",""):j[w]," ways"]})]},w))}),j.every(w=>w==="?")&&e.jsx("div",{style:{textAlign:"center",padding:"20px",color:"#94A3B8",fontStyle:"italic"},children:"Table is empty. Start solving!"})]})]}),e.jsxs("div",{style:Z.legend,children:[e.jsxs("div",{style:Z.legendItem,children:[e.jsx("span",{style:{...Z.dot,background:"#FACC15"}})," Current step"]}),e.jsxs("div",{style:Z.legendItem,children:[e.jsx("span",{style:{...Z.dot,background:"#3B82F6"}})," Computed step"]}),e.jsxs("div",{style:Z.legendItem,children:[e.jsx("span",{style:{...Z.dot,background:"#A855F7"}})," Memoized value"]}),e.jsxs("div",{style:Z.legendItem,children:[e.jsx("span",{style:{...Z.dot,background:"#22C55E"}})," Final step"]})]})]})]}),e.jsxs("div",{style:Z.codeSection,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"},children:[e.jsx("h3",{style:{margin:0,fontSize:"1.2rem",color:"#1E293B",fontWeight:"800"},children:"Algorithm Implementation"}),e.jsx("div",{style:{display:"flex",gap:"8px"},children:["python","javascript","cpp"].map(w=>e.jsx("button",{onClick:()=>T(w),style:{...Z.langBtn,background:M===w?"#4F46E5":"#F1F5F9",color:M===w?"white":"#64748B"},children:w==="cpp"?"C++":w.charAt(0).toUpperCase()+w.slice(1)},w))})]}),e.jsx("pre",{style:Z.codeBlock,children:e.jsx("code",{children:wr[M]})})]}),e.jsxs("div",{style:{...Z.card,marginTop:"24px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{margin:"0 0 8px 0",color:"#1E293B"},children:"Knowledge Check"}),e.jsx("p",{style:{margin:0,color:"#64748B",fontSize:"0.95rem"},children:"Test your understanding of Dynamic Programming concepts."})]}),e.jsx("button",{onClick:()=>v(!$),style:{...Z.langBtn,background:$?"#64748B":"#4F46E5",color:"white"},children:$?"Hide Quiz":"Take Quiz"})]}),e.jsx(X,{children:$&&e.jsx(q.div,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},style:{overflow:"hidden"},children:e.jsxs("div",{style:{marginTop:"24px",display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(Je,{q:"1. What is Dynamic Programming?",o:["An iterative looping technique","A method for solving complex problems by breaking them down into simpler overlapping subproblems","A way to sort arrays quickly","Programming websites dynamically"],a:1}),e.jsx(Je,{q:"2. What are overlapping subproblems?",o:["Functions that infinitely loop","Subproblems that are completely independent","Subproblems that share exactly the same inputs and are solved multiple times recursively","Code conflicts when merging"],a:2}),e.jsx(Je,{q:"3. What is memoization?",o:["Writing comments to remember what code does","Storing the results of expensive function calls and returning the cached result when the same inputs occur again","Converting a program into memory blocks","Building a table bottom-up"],a:1}),e.jsx(Je,{q:"4. What is the difference between memoization and tabulation?",o:["Memoization is Top-Down caching; Tabulation is Bottom-Up table building","They are exactly the same thing","Memoization is iterative; Tabulation is recursive","Tabulation uses less memory than iterative approaches"],a:0})]})})})]})]})},Je=({q:t,o:n,a})=>{const[d,o]=i.useState(null);return e.jsxs("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"12px",border:"1px solid #E2E8F0"},children:[e.jsx("h4",{style:{margin:"0 0 12px 0",color:"#1E293B",fontSize:"1rem"},children:t}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:n.map((x,u)=>e.jsxs("button",{onClick:()=>o(u),style:{padding:"10px 16px",textAlign:"left",borderRadius:"8px",border:d===u?u===a?"2px solid #22C55E":"2px solid #EF4444":"2px solid transparent",background:d===u?u===a?"#DCFCE7":"#FEE2E2":"#FFF",color:"#1E293B",cursor:"pointer",transition:"all 0.2s",boxShadow:"0 2px 4px rgba(0,0,0,0.02)"},children:[x,d===u&&u===a&&e.jsx("span",{style:{float:"right"},children:"✅ Correct"}),d===u&&u!==a&&e.jsx("span",{style:{float:"right"},children:"❌ Incorrect"})]},u))})]})},Z={container:{fontFamily:"system-ui, sans-serif"},card:{background:"white",borderRadius:"16px",padding:"24px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)",marginBottom:"24px"},title:{fontSize:"1.5rem",fontWeight:"800",color:"#1e293b",margin:"0 0 12px 0"},desc:{fontSize:"1rem",color:"#64748B",lineHeight:"1.6",margin:0},modeBtn:{padding:"10px 20px",borderRadius:"999px",border:"none",fontWeight:"700",cursor:"pointer",transition:"all 0.2s",fontSize:"0.95rem"},visualizer:{background:"white",borderRadius:"16px",padding:"28px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)",marginBottom:"24px",display:"flex",flexWrap:"wrap",gap:"20px"},messageBox:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",fontSize:"1.1rem",fontWeight:"600",marginBottom:"20px",textAlign:"center",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 6px rgba(0,0,0,0.1)"},controlsRow:{display:"flex",gap:"10px",flexWrap:"wrap",justifyContent:"center"},btn:t=>({background:t,color:"white",border:"none",borderRadius:"8px",padding:"12px 18px",fontWeight:"700",cursor:"pointer",opacity:.95,fontSize:"0.95rem"}),legend:{display:"flex",gap:"16px",flexWrap:"wrap",background:"#F8FAFC",padding:"12px",borderRadius:"8px",border:"1px solid #E2E8F0",marginTop:"20px",justifyContent:"center"},legendItem:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.85rem",color:"#64748B",fontWeight:"600"},dot:{width:"12px",height:"12px",borderRadius:"4px"},codeSection:{background:"white",borderRadius:"16px",padding:"24px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)"},langBtn:{padding:"8px 16px",borderRadius:"8px",border:"none",fontWeight:"700",cursor:"pointer",transition:"all 0.2s",fontSize:"0.85rem"},codeBlock:{background:"#0F172A",color:"#E2E8F0",padding:"20px",borderRadius:"12px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",margin:0,fontFamily:"monospace"}},wr={python:`def climbStairs(n: int) -> int:
    if n <= 2: return n
    
    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 2
    
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
        
    return dp[n]`,javascript:`function climbStairs(n) {
    if (n <= 2) return n;
    
    const dp = new Array(n + 1).fill(0);
    dp[1] = 1;
    dp[2] = 2;
    
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    
    return dp[n];
}`,cpp:`int climbStairs(int n) {
    if (n <= 2) return n;
    
    vector<int> dp(n + 1);
    dp[1] = 1;
    dp[2] = 2;
    
    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    
    return dp[n];
}`},Oe=t=>new Promise(n=>setTimeout(n,t)),kt=[1,2,5],be=11,Cr=()=>{const[t,n]=i.useState("play"),{showFeedback:a}=le(),[d,o]=i.useState(!0),[x,u]=i.useState([]),[b,C]=i.useState("Drag tokens or click to add coins to the vending machine!"),R=x.reduce((S,g)=>S+g,0),[I,j]=i.useState(!1),A=i.useRef(!1),[r,c]=i.useState(Array(be+1).fill("∞")),[p,l]=i.useState(null),[y,B]=i.useState(null),[H,M]=i.useState("Click Start to trace the Bottom-Up DP table."),[T,$]=i.useState("python"),[v,D]=i.useState(!1),z=S=>{if(R+S>be){C("Oops! That exceeds the target amount.");return}const g=[...x,S];u(g);const f=R+S;f===be?g.length===3?(C("Optimal solution found! 3 coins (5, 5, 1)."),a("Optimal solution found! You nailed it 🎯","success")):(C(`Target reached with ${g.length} coins. Can you do it in 3?`),a("Success! You reached the target 🚀","info")):C(`Added ${S}¢. Current amount: ${f}¢`)},E=()=>{u([]),C("Drag tokens or click to add coins to the vending machine!")},h=async()=>{if(I)return;j(!0),A.current=!1;const S=Array(be+1).fill("∞");S[0]=0,c([...S]),M("Base case: dp[0] = 0. Zero coins needed to make amount 0."),await Oe(1500);for(let g=1;g<=be&&!A.current;g++){l(g),M(`Calculating minimum coins for amount ${g}¢...`),await Oe(1e3);for(let f of kt){if(A.current)break;if(g-f>=0){B(f),M(`Checking coin ${f}¢... Can we use it for amount ${g}¢?`),await Oe(1e3);const F=S[g-f];if(F!=="∞"){const w=F+1;S[g]==="∞"||w<S[g]?(S[g]=w,c([...S]),M(`Updating dp[${g}] to ${w} coins (dp[${g-f}] + 1).`)):M(`dp[${g}] is already optimal with ${S[g]} coins. No update.`)}else M(`dp[${g-f}] is unreachable. Cannot use ${f}¢ coin.`);await Oe(1e3)}}B(null),M(`Amount ${g}¢ computed! Optimal is ${S[g]} coins.`),await Oe(1e3)}A.current||(l(be),M(`Finished! Minimum coins to make ${be}¢ is ${S[be]}.`),a("Success! Vending machine logic ready 🚀","success"),window.AppProgress&&window.AppProgress.markProblemSolved()),j(!1)},s=()=>{A.current=!0,j(!1),c(Array(be+1).fill("∞")),l(null),B(null),M("Click Start to trace the Bottom-Up DP table.")},m=S=>{I&&(A.current=!0),n(S),S==="play"?E():s()},k=S=>t==="sim"?S===be&&r[S]!=="∞"?"#22C55E":S===p?"#FACC15":p!==null&&y!==null&&S===p-y?"#A855F7":r[S]!=="∞"?"#3B82F6":"#F1F5F9":R===S?"#22C55E":R>S?"#E2E8F0":"#F1F5F9";return e.jsxs("div",{style:oe.container,children:[e.jsxs("div",{style:oe.card,children:[e.jsx("h3",{style:oe.title,children:"Coin Change — Vending Machine Builder"}),e.jsxs("p",{style:oe.desc,children:["A vending machine must produce a target amount using the minimum number of coins. Given coins of denominations ",e.jsx("strong",{children:"[1, 2, 5]"})," and a ",e.jsxs("strong",{children:["target of ",be]}),", construct the optimum combination."]})]}),e.jsxs("div",{style:{display:"flex",gap:"10px",marginBottom:"20px",justifyContent:"center"},children:[e.jsx("button",{onClick:()=>m("play"),style:{...oe.modeBtn,background:t==="play"?"#4F46E5":"#F1F5F9",color:t==="play"?"white":"#1E293B"},children:"Interactive Builder"}),e.jsx("button",{onClick:()=>m("sim"),style:{...oe.modeBtn,background:t==="sim"?"#4F46E5":"#F1F5F9",color:t==="sim"?"white":"#1E293B"},children:"Algorithm Visualization"})]}),e.jsxs("div",{style:oe.visualizer,children:[e.jsxs("div",{style:{flex:"1 1 350px",display:"flex",flexDirection:"column",gap:"20px",paddingRight:"20px",borderRight:"2px dashed #E2E8F0"},children:[e.jsxs("div",{style:{background:"#1E293B",borderRadius:"16px",padding:"24px",display:"flex",flexDirection:"column",alignItems:"center",boxShadow:"0 8px 16px rgba(0,0,0,0.1)"},children:[e.jsx("div",{style:{color:"#94A3B8",fontSize:"1rem",fontWeight:"bold",letterSpacing:"2px",marginBottom:"10px"},children:"TARGET"}),e.jsxs("div",{style:{fontSize:"3rem",fontWeight:"800",color:"#10B981",fontFamily:"monospace",background:"#0F172A",padding:"10px 30px",borderRadius:"12px",border:"2px solid #334155"},children:[be,"¢"]}),e.jsx("div",{style:{width:"100%",height:"24px",background:"#334155",borderRadius:"12px",marginTop:"20px",overflow:"hidden",position:"relative"},children:e.jsx(q.div,{style:{height:"100%",background:R===be?"#10B981":"#3B82F6"},initial:{width:0},animate:{width:`${Math.min(100,R/be*100)}%`},transition:{type:"spring",stiffness:100}})}),e.jsxs("div",{style:{color:"white",marginTop:"10px",fontSize:"1.2rem",fontWeight:"600"},children:["Current: ",R,"¢"]})]}),t==="play"&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",background:"#F8FAFC",padding:"20px",borderRadius:"12px",border:"1px solid #E2E8F0"},children:[e.jsx("p",{style:{margin:"0 0 16px 0",fontWeight:"600",color:"#64748B"},children:"Available Coins (Drag or Click)"}),e.jsxs("div",{style:{display:"flex",gap:"16px",position:"relative"},children:[kt.map(S=>e.jsx(q.div,{onClick:()=>{z(S),o(!1)},drag:!0,dragConstraints:{left:0,right:0,top:0,bottom:0},dragElastic:.5,whileHover:{scale:1.1},whileTap:{scale:.9},className:"pulse-glow",style:{width:"60px",height:"60px",borderRadius:"50%",background:"#FACC15",border:"4px solid #CA8A04",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"800",fontSize:"1.2rem",color:"#713F12",cursor:"grab",boxShadow:"0 4px 6px rgba(0,0,0,0.1)"},children:S},S)),d&&e.jsxs("div",{className:"tooltip-hint",style:{bottom:"110%",left:"50%"},children:["Add coins to reach ",be,"¢! ✨"]})]})]}),t==="play"&&e.jsx("div",{style:{minHeight:"80px",display:"flex",gap:"8px",flexWrap:"wrap",padding:"16px",border:"2px dashed #CBD5E1",borderRadius:"12px"},children:e.jsx(X,{children:x.map((S,g)=>e.jsx(q.div,{initial:{scale:0,opacity:0},animate:{scale:1,opacity:1},exit:{scale:0,opacity:0},style:{width:"40px",height:"40px",borderRadius:"50%",background:"#FDE047",border:"2px solid #CA8A04",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold",color:"#713F12"},children:S},g))})})]}),e.jsxs("div",{style:{flex:"1 1 350px",display:"flex",flexDirection:"column",paddingLeft:"20px",gap:"20px"},children:[e.jsx("div",{style:oe.messageBox,children:t==="play"?b:H}),e.jsx("div",{style:oe.controlsRow,children:t==="play"?e.jsx(q.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:E,style:oe.btn("#EF4444"),children:"↺ Reset Vending Logic"}):e.jsxs(e.Fragment,{children:[e.jsx(q.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:h,disabled:I,style:oe.btn("#4F46E5"),children:"▶ Start Animation 🎬"}),e.jsx(q.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:s,style:oe.btn("#EF4444"),children:"↺ Reset"})]})}),e.jsxs("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"12px",border:"1px solid #E2E8F0",flexGrow:1},children:[e.jsx("h4",{style:{margin:"0 0 16px 0",fontSize:"1rem",color:"#1E293B"},children:"DP Table: Amount → Min Coins"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:[...Array(be+1).keys()].map(S=>e.jsxs(q.div,{layout:!0,style:{width:"45px",display:"flex",flexDirection:"column",alignItems:"center",background:k(S),borderRadius:"8px",border:"1px solid #CBD5E1",padding:"4px",transition:"background-color 0.3s",className:S===p?"pulse-glow":""},children:[e.jsx("span",{style:{fontSize:"0.75rem",color:"#64748B",fontWeight:"bold"},children:S}),e.jsx("span",{style:{fontSize:"1rem",color:k(S)==="#F1F5F9"?"#94A3B8":k(S)==="#22C55E"?"white":"#1E293B",fontWeight:"800"},children:t==="sim"?r[S]:S===0?"0":"?"})]},S))})]}),e.jsxs("div",{style:oe.legend,children:[e.jsxs("div",{style:oe.legendItem,children:[e.jsx("span",{style:{...oe.dot,background:"#FACC15"}})," Current amount"]}),e.jsxs("div",{style:oe.legendItem,children:[e.jsx("span",{style:{...oe.dot,background:"#3B82F6"}})," Computed amount"]}),e.jsxs("div",{style:oe.legendItem,children:[e.jsx("span",{style:{...oe.dot,background:"#22C55E"}})," Optimal target"]})]})]})]}),e.jsxs("div",{style:oe.codeSection,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"},children:[e.jsx("h3",{style:{margin:0,fontSize:"1.2rem",color:"#1E293B",fontWeight:"800"},children:"Algorithm Implementation"}),e.jsx("div",{style:{display:"flex",gap:"8px"},children:["python","javascript","cpp"].map(S=>e.jsx("button",{onClick:()=>$(S),style:{...oe.langBtn,background:T===S?"#4F46E5":"#F1F5F9",color:T===S?"white":"#64748B"},children:S==="cpp"?"C++":S.charAt(0).toUpperCase()+S.slice(1)},S))})]}),e.jsx("pre",{style:oe.codeBlock,children:e.jsx("code",{children:kr[T]})})]}),e.jsxs("div",{style:{...oe.card,marginTop:"24px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{margin:"0 0 8px 0",color:"#1E293B"},children:"Knowledge Check"}),e.jsx("p",{style:{margin:0,color:"#64748B",fontSize:"0.95rem"},children:"Test your understanding of the Coin Change DP algorithm."})]}),e.jsx("button",{onClick:()=>D(!v),style:{...oe.langBtn,background:v?"#64748B":"#4F46E5",color:"white"},children:v?"Hide Quiz":"Take Quiz"})]}),e.jsx(X,{children:v&&e.jsx(q.div,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},style:{overflow:"hidden"},children:e.jsxs("div",{style:{marginTop:"24px",display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(it,{q:"1. Why do we initialize the DP array to Infinity (or a large number) except for dp[0]?",o:["Because we do not know the answer strictly yet","To represent amount 0 needing 0 coins, while setting other amounts to an unachieved high bounds for minimum comparisons","To avoid index out of bounds errors during coin deduction","To save memory space"],a:1}),e.jsx(it,{q:"2. During tabulation, for a given amount i and coin c, what is the recursive relation?",o:["dp[i] = dp[i] + c","dp[i] = min(dp[i], dp[i-c] + 1)","dp[i] = dp[i-1] + c","dp[i] = min(dp[i-c], 1)"],a:1}),e.jsx(it,{q:"3. Is Coin Change a variation of the Knapsack problem?",o:["Yes, it is closely related to the Unbounded Knapsack problem since coins can be used infinitely","No, they have no relation","Yes, it is the exact same as 0/1 Knapsack","No, it is a greedy-only problem"],a:0})]})})})]})]})},it=({q:t,o:n,a})=>{const[d,o]=i.useState(null);return e.jsxs("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"12px",border:"1px solid #E2E8F0"},children:[e.jsx("h4",{style:{margin:"0 0 12px 0",color:"#1E293B",fontSize:"1rem"},children:t}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:n.map((x,u)=>e.jsxs("button",{onClick:()=>o(u),style:{padding:"10px 16px",textAlign:"left",borderRadius:"8px",border:d===u?u===a?"2px solid #22C55E":"2px solid #EF4444":"2px solid transparent",background:d===u?u===a?"#DCFCE7":"#FEE2E2":"#FFF",color:"#1E293B",cursor:"pointer",transition:"all 0.2s",boxShadow:"0 2px 4px rgba(0,0,0,0.02)"},children:[x,d===u&&u===a&&e.jsx("span",{style:{float:"right"},children:"✅ Correct"}),d===u&&u!==a&&e.jsx("span",{style:{float:"right"},children:"❌ Incorrect"})]},u))})]})},oe={container:{fontFamily:"system-ui, sans-serif"},card:{background:"white",borderRadius:"16px",padding:"24px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)",marginBottom:"24px"},title:{fontSize:"1.5rem",fontWeight:"800",color:"#1e293b",margin:"0 0 12px 0"},desc:{fontSize:"1rem",color:"#64748B",lineHeight:"1.6",margin:0},modeBtn:{padding:"10px 20px",borderRadius:"999px",border:"none",fontWeight:"700",cursor:"pointer",transition:"all 0.2s",fontSize:"0.95rem"},visualizer:{background:"white",borderRadius:"16px",padding:"28px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)",marginBottom:"24px",display:"flex",flexWrap:"wrap",gap:"20px"},messageBox:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",fontSize:"1rem",fontWeight:"600",marginBottom:"10px",textAlign:"center",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 6px rgba(0,0,0,0.1)"},controlsRow:{display:"flex",gap:"10px",flexWrap:"wrap",justifyContent:"center"},btn:t=>({background:t,color:"white",border:"none",borderRadius:"8px",padding:"12px 18px",fontWeight:"700",cursor:"pointer",opacity:.95,fontSize:"0.95rem"}),legend:{display:"flex",gap:"16px",flexWrap:"wrap",background:"#F8FAFC",padding:"12px",borderRadius:"8px",border:"1px solid #E2E8F0",marginTop:"10px",justifyContent:"center"},legendItem:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.85rem",color:"#64748B",fontWeight:"600"},dot:{width:"12px",height:"12px",borderRadius:"4px"},codeSection:{background:"white",borderRadius:"16px",padding:"24px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)"},langBtn:{padding:"8px 16px",borderRadius:"8px",border:"none",fontWeight:"700",cursor:"pointer",transition:"all 0.2s",fontSize:"0.85rem"},codeBlock:{background:"#0F172A",color:"#E2E8F0",padding:"20px",borderRadius:"12px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",margin:0,fontFamily:"monospace"}},kr={python:`def coinChange(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for i in range(1, amount + 1):
        for c in coins:
            if i - c >= 0:
                dp[i] = min(dp[i], dp[i - c] + 1)
                
    return dp[amount] if dp[amount] != float('inf') else -1`,javascript:`function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (let c of coins) {
            if (i - c >= 0) {
                dp[i] = Math.min(dp[i], dp[i - c] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}`,cpp:`int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    
    for (int i = 1; i <= amount; i++) {
        for (int c : coins) {
            if (i - c >= 0) {
                dp[i] = min(dp[i], dp[i - c] + 1);
            }
        }
    }
    
    return dp[amount] > amount ? -1 : dp[amount];
}`},Ve=t=>new Promise(n=>setTimeout(n,t)),Qe=[{id:1,name:"Compass",weight:1,value:15},{id:2,name:"Tent",weight:3,value:20},{id:3,name:"Rations",weight:4,value:30}],ye=5,Fr=()=>{const[t,n]=i.useState("play"),{showFeedback:a}=le(),[d,o]=i.useState(!0),[x,u]=i.useState([]),b=x.reduce((f,F)=>f+F.weight,0),C=x.reduce((f,F)=>f+F.value,0),[R,I]=i.useState("Pack your bag! Maximize the value without exceeding capacity 5."),j=Qe.length,[A,r]=i.useState(Array.from({length:j+1},()=>Array(ye+1).fill("?"))),[c,p]=i.useState(!1),[l,y]=i.useState({r:null,c:null}),[B,H]=i.useState(null),[M,T]=i.useState("Click Start to trace the Bottom-Up DP table."),$=i.useRef(!1),[v,D]=i.useState("python"),[z,E]=i.useState(!1),h=f=>{if(x.some(w=>w.id===f.id))u(x.filter(w=>w.id!==f.id)),I(`Removed ${f.name}.`);else if(b+f.weight>ye)I(`Cannot add ${f.name}. Exceeds capacity!`);else{const w=[...x,f];u(w);const W=w.reduce((P,N)=>P+N.value,0);W===45?(I("Amazing! You found the optimal packing: Value 45."),a("Optimal packing found! 🎒🏆","success")):(I(`Added ${f.name}. Value is now ${W}.`),a(`Packed ${f.name}! 📦`))}},s=()=>{u([]),I("Pack your bag! Maximize the value without exceeding capacity 5.")},m=async()=>{if(c)return;p(!0),$.current=!1;const f=Array.from({length:j+1},()=>Array(ye+1).fill("?"));r([...f.map(F=>[...F])]),T("Initialize 0th row and 0th column with 0 (Base Cases).");for(let F=0;F<=j;F++)f[F][0]=0;for(let F=0;F<=ye;F++)f[0][F]=0;r([...f.map(F=>[...F])]),await Ve(1500);for(let F=1;F<=j&&!$.current;F++){const w=Qe[F-1];for(let W=1;W<=ye&&!$.current;W++){if(y({r:F,c:W}),w.weight<=W){if(T(`Item ${w.name} (w:${w.weight}, v:${w.value}) fits in capacity ${W}.`),await Ve(1e3),$.current)break;const P=w.value+f[F-1][W-w.weight],N=f[F-1][W];if(H({r1:F-1,c1:W-w.weight,r2:F-1,c2:W}),T(`Check best: Take item = ${w.value} + dp[${F-1}][${W-w.weight}] (${f[F-1][W-w.weight]}) = ${P}. OR Leave = dp[${F-1}][${W}] (${N}).`),await Ve(2e3),$.current)break;f[F][W]=Math.max(P,N)}else{if(H({r2:F-1,c2:W}),T(`Item ${w.name} (w:${w.weight}) DOES NOT fit in capacity ${W}. Leave it: dp[${F-1}][${W}] (${f[F-1][W]}).`),await Ve(1500),$.current)break;f[F][W]=f[F-1][W]}H(null),r([...f.map(P=>[...P])]),T(`Computed dp[${F}][${W}] = ${f[F][W]}.`),await Ve(500)}}$.current||(y({r:j,c:ye}),T(`Finished! The maximum value possible is ${f[j][ye]}.`),a("Success! Knapsack optimized 🎒🚀","success"),window.AppProgress&&window.AppProgress.markProblemSolved()),p(!1)},k=()=>{$.current=!0,p(!1),r(Array.from({length:j+1},()=>Array(ye+1).fill("?"))),y({r:null,c:null}),H(null),T("Click Start to trace the Bottom-Up DP table.")},S=f=>{c&&($.current=!0),n(f),f==="play"?s():k()},g=(f,F)=>t==="sim"?f===j&&F===ye&&A[f][F]!=="?"&&!c?"#22C55E":l.r===f&&l.c===F?"#FACC15":B&&(B.r1===f&&B.c1===F||B.r2===f&&B.c2===F)?"#A855F7":A[f][F]!=="?"?"#3B82F6":"#F1F5F9":"#F1F5F9";return e.jsxs("div",{style:ne.container,children:[e.jsxs("div",{style:ne.card,children:[e.jsx("h3",{style:ne.title,children:"0/1 Knapsack — Backpack Packing"}),e.jsxs("p",{style:ne.desc,children:["You have a backpack with a limited capacity of ",e.jsxs("strong",{children:[ye," lbs"]}),". Choose items to maximize the total value. You can either take an item (1) or leave it (0)."]})]}),e.jsxs("div",{style:{display:"flex",gap:"10px",marginBottom:"20px",justifyContent:"center"},children:[e.jsx("button",{onClick:()=>S("play"),style:{...ne.modeBtn,background:t==="play"?"#4F46E5":"#F1F5F9",color:t==="play"?"white":"#1E293B"},children:"Interactive Packing"}),e.jsx("button",{onClick:()=>S("sim"),style:{...ne.modeBtn,background:t==="sim"?"#4F46E5":"#F1F5F9",color:t==="sim"?"white":"#1E293B"},children:"Algorithm Visualization"})]}),e.jsxs("div",{style:ne.visualizer,children:[e.jsxs("div",{style:{flex:"1 1 350px",display:"flex",flexDirection:"column",gap:"20px",paddingRight:"20px",borderRight:"2px dashed #E2E8F0"},children:[e.jsxs("div",{style:{background:"#1E293B",borderRadius:"16px",padding:"24px",display:"flex",flexDirection:"column",alignItems:"center",boxShadow:"0 8px 16px rgba(0,0,0,0.1)"},children:[e.jsxs("div",{style:{fontSize:"3rem",position:"relative"},children:["🎒",e.jsxs("div",{style:{position:"absolute",top:"-10px",right:"-15px",background:"#EF4444",color:"white",borderRadius:"50%",width:"30px",height:"30px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem",fontWeight:"bold"},children:[b,"/",ye]})]}),e.jsx("div",{style:{width:"100%",height:"20px",background:"#334155",borderRadius:"10px",marginTop:"15px",overflow:"hidden"},children:e.jsx(q.div,{style:{height:"100%",background:b>ye?"#EF4444":"#10B981"},initial:{width:0},animate:{width:`${Math.min(100,b/ye*100)}%`},transition:{type:"spring",stiffness:100}})}),e.jsxs("div",{style:{color:"#FACC15",marginTop:"10px",fontSize:"1.2rem",fontWeight:"bold"},children:["Total Value: ",C]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"10px"},children:[e.jsx("h4",{style:{margin:"0",color:"#64748B",fontSize:"1rem"},children:"Available Items"}),Qe.map(f=>{const F=x.some(w=>w.id===f.id);return e.jsxs(q.div,{onClick:()=>t==="play"&&h(f),whileHover:t==="play"?{scale:1.02,backgroundColor:"#F8FAFC"}:{},whileTap:t==="play"?{scale:.98}:{},style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:F?"#DCFCE7":"white",border:F?"2px solid #22C55E":"2px solid #E2E8F0",borderRadius:"12px",cursor:t==="play"?"pointer":"default",transition:"all 0.2s",opacity:t==="sim"&&l.r!==null&&l.r>0&&l.r!==f.id?.3:1},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[e.jsx("span",{style:{fontWeight:"bold",color:"#1E293B"},children:f.name}),e.jsxs("span",{style:{fontSize:"0.85rem",color:"#64748B"},children:["Weight: ",f.weight," lbs"]})]}),e.jsxs("div",{style:{fontWeight:"800",color:"#F59E0B",fontSize:"1.1rem"},children:["Value: ",f.value]}),F&&e.jsx("div",{style:{color:"#22C55E",fontWeight:"bold"},children:"In Bag ✓"}),!F&&t==="play"&&d&&f.id===1&&e.jsx("div",{className:"tooltip-hint",style:{bottom:"110%",left:"50%"},children:"Pack the compass first! ✨"})]},f.id)})]})]}),e.jsxs("div",{style:{flex:"1 1 400px",display:"flex",flexDirection:"column",paddingLeft:"20px",gap:"20px"},children:[e.jsx("div",{style:ne.messageBox,children:t==="play"?R:M}),e.jsx("div",{style:ne.controlsRow,children:t==="play"?e.jsx(q.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:s,style:ne.btn("#EF4444"),children:"Empty Backpack"}):e.jsxs(e.Fragment,{children:[e.jsx(q.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:m,disabled:c,style:ne.btn("#4F46E5"),children:"▶ Start Animation"}),e.jsx(q.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:k,style:ne.btn("#EF4444"),children:"↺ Reset"})]})}),e.jsxs("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"12px",border:"1px solid #E2E8F0",flexGrow:1,overflowX:"auto"},children:[e.jsx("h4",{style:{margin:"0 0 16px 0",fontSize:"1rem",color:"#1E293B"},children:"DP Table: Items (Rows) × Capacity (Cols)"}),e.jsxs("table",{style:{borderCollapse:"collapse",width:"100%",textAlign:"center"},children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{padding:"8px",borderBottom:"2px solid #CBD5E1",color:"#64748B"},children:"Item \\ Cap"}),[...Array(ye+1).keys()].map(f=>e.jsx("th",{style:{padding:"8px",borderBottom:"2px solid #CBD5E1",color:"#1E293B"},children:f},f))]})}),e.jsx("tbody",{children:[...Array(j+1).keys()].map(f=>e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"8px",borderRight:"2px solid #CBD5E1",fontWeight:"bold",color:"#1E293B"},children:f===0?"0 (None)":`${Qe[f-1].name} (v${Qe[f-1].value})`}),[...Array(ye+1).keys()].map(F=>e.jsx("td",{style:{padding:"4px"},children:e.jsx(q.div,{layout:!0,style:{width:"100%",height:"35px",display:"flex",alignItems:"center",justifyContent:"center",background:g(f,F),borderRadius:"6px",border:"1px solid #CBD5E1",fontWeight:"800",color:A[f][F]==="?"?"#94A3B8":g(f,F)==="#22C55E"?"white":"#1E293B",transition:"background-color 0.3s",className:l.r===f&&l.c===F?"pulse-glow":""},children:A[f][F]})},F))]},f))})]})]}),e.jsxs("div",{style:ne.legend,children:[e.jsxs("div",{style:ne.legendItem,children:[e.jsx("span",{style:{...ne.dot,background:"#FACC15"}})," Current cell calculating"]}),e.jsxs("div",{style:ne.legendItem,children:[e.jsx("span",{style:{...ne.dot,background:"#A855F7"}})," Depending subproblem"]}),e.jsxs("div",{style:ne.legendItem,children:[e.jsx("span",{style:{...ne.dot,background:"#3B82F6"}})," Computed"]}),e.jsxs("div",{style:ne.legendItem,children:[e.jsx("span",{style:{...ne.dot,background:"#22C55E"}})," Optimal Maximum"]})]})]})]}),e.jsxs("div",{style:ne.codeSection,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"},children:[e.jsx("h3",{style:{margin:0,fontSize:"1.2rem",color:"#1E293B",fontWeight:"800"},children:"Algorithm Implementation"}),e.jsx("div",{style:{display:"flex",gap:"8px"},children:["python","javascript","cpp"].map(f=>e.jsx("button",{onClick:()=>D(f),style:{...ne.langBtn,background:v===f?"#4F46E5":"#F1F5F9",color:v===f?"white":"#64748B"},children:f==="cpp"?"C++":f.charAt(0).toUpperCase()+f.slice(1)},f))})]}),e.jsx("pre",{style:ne.codeBlock,children:e.jsx("code",{children:Br[v]})})]}),e.jsxs("div",{style:{...ne.card,marginTop:"24px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{margin:"0 0 8px 0",color:"#1E293B"},children:"Knowledge Check"}),e.jsx("p",{style:{margin:0,color:"#64748B",fontSize:"0.95rem"},children:"Test your understanding of the 0/1 Knapsack problem."})]}),e.jsx("button",{onClick:()=>E(!z),style:{...ne.langBtn,background:z?"#64748B":"#4F46E5",color:"white"},children:z?"Hide Quiz":"Take Quiz"})]}),e.jsx(X,{children:z&&e.jsx(q.div,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},style:{overflow:"hidden"},children:e.jsxs("div",{style:{marginTop:"24px",display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(nt,{q:"1. What does the '0/1' in 0/1 Knapsack mean?",o:["You can either have 0 pounds or 1 pound of weight","You can either completely exclude (0) or completely include (1) an item, no fractions allowed","The matrix dimensions start at 0 and end at 1","The items have values of 0 or 1"],a:1}),e.jsx(nt,{q:"2. Why is a 2D array typically used for this DP solution instead of a 1D array?",o:["Because the problem is too complex","Because we must track two varying state parameters: the subset of items considered so far, and the remaining capacity","Just to match the math formula visualization","Because JavaScript needs 2D arrays to be fast"],a:1}),e.jsx(nt,{q:"3. In the recurrence relation: Math.max(takeVal, leaveVal), what does leaveVal represent?",o:["dp[i][w-1] (previous capacity)","dp[i-1][w] (the optimal value using previous items at the same capacity)","dp[i-1][w-weight] (the value without capacity limit)","0"],a:1})]})})})]})]})},nt=({q:t,o:n,a})=>{const[d,o]=i.useState(null);return e.jsxs("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"12px",border:"1px solid #E2E8F0"},children:[e.jsx("h4",{style:{margin:"0 0 12px 0",color:"#1E293B",fontSize:"1rem"},children:t}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:n.map((x,u)=>e.jsxs("button",{onClick:()=>o(u),style:{padding:"10px 16px",textAlign:"left",borderRadius:"8px",border:d===u?u===a?"2px solid #22C55E":"2px solid #EF4444":"2px solid transparent",background:d===u?u===a?"#DCFCE7":"#FEE2E2":"#FFF",color:"#1E293B",cursor:"pointer",transition:"all 0.2s",boxShadow:"0 2px 4px rgba(0,0,0,0.02)"},children:[x,d===u&&u===a&&e.jsx("span",{style:{float:"right"},children:"✅ Correct"}),d===u&&u!==a&&e.jsx("span",{style:{float:"right"},children:"❌ Incorrect"})]},u))})]})},ne={container:{fontFamily:"system-ui, sans-serif"},card:{background:"white",borderRadius:"16px",padding:"24px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)",marginBottom:"24px"},title:{fontSize:"1.5rem",fontWeight:"800",color:"#1e293b",margin:"0 0 12px 0"},desc:{fontSize:"1rem",color:"#64748B",lineHeight:"1.6",margin:0},modeBtn:{padding:"10px 20px",borderRadius:"999px",border:"none",fontWeight:"700",cursor:"pointer",transition:"all 0.2s",fontSize:"0.95rem"},visualizer:{background:"white",borderRadius:"16px",padding:"28px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)",marginBottom:"24px",display:"flex",flexWrap:"wrap",gap:"20px"},messageBox:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",fontSize:"1rem",fontWeight:"600",marginBottom:"10px",textAlign:"center",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 6px rgba(0,0,0,0.1)"},controlsRow:{display:"flex",gap:"10px",flexWrap:"wrap",justifyContent:"center"},btn:t=>({background:t,color:"white",border:"none",borderRadius:"8px",padding:"12px 18px",fontWeight:"700",cursor:"pointer",opacity:.95,fontSize:"0.95rem"}),legend:{display:"flex",gap:"16px",flexWrap:"wrap",background:"#F8FAFC",padding:"12px",borderRadius:"8px",border:"1px solid #E2E8F0",marginTop:"10px",justifyContent:"center"},legendItem:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.85rem",color:"#64748B",fontWeight:"600"},dot:{width:"12px",height:"12px",borderRadius:"4px"},codeSection:{background:"white",borderRadius:"16px",padding:"24px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)"},langBtn:{padding:"8px 16px",borderRadius:"8px",border:"none",fontWeight:"700",cursor:"pointer",transition:"all 0.2s",fontSize:"0.85rem"},codeBlock:{background:"#0F172A",color:"#E2E8F0",padding:"20px",borderRadius:"12px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",margin:0,fontFamily:"monospace"}},Br={python:`def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(1, capacity + 1):
            if weights[i - 1] <= w:
                take = values[i - 1] + dp[i - 1][w - weights[i - 1]]
                leave = dp[i - 1][w]
                dp[i][w] = max(take, leave)
            else:
                dp[i][w] = dp[i - 1][w]
                
    return dp[n][capacity]`,javascript:`function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                const take = values[i - 1] + dp[i - 1][w - weights[i - 1]];
                const leave = dp[i - 1][w];
                dp[i][w] = Math.max(take, leave);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    
    return dp[n][capacity];
}`,cpp:`int knapsack(vector<int>& weights, vector<int>& values, int capacity) {
    int n = weights.size();
    vector<vector<int>> dp(n + 1, vector<int>(capacity + 1, 0));
    
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                int take = values[i - 1] + dp[i - 1][w - weights[i - 1]];
                int leave = dp[i - 1][w];
                dp[i][w] = max(take, leave);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    
    return dp[n][capacity];
}`},Er=({n:t=5})=>{const[n,a]=i.useState(Array(t+1).fill(0)),[d,o]=i.useState(0),[x,u]=i.useState(!1),[b,C]=i.useState('Click "Start" to see how we build the solution.'),R=()=>{a(Array(t+1).fill(0)),o(0),u(!1),C('Click "Start" to see how we build the solution.')},I=()=>{if(d>t)return;let j=[...n],A="";d===0?(j[0]=1,A="Base Case: There is 1 way to stay at step 0 (do nothing)."):d===1?(j[1]=1,A="Base Case: There is 1 way to reach step 1 (one 1-step)."):(j[d]=j[d-1]+j[d-2],A=`Step ${d}: Sum of ways to reach step ${d-1} (${j[d-1]}) and step ${d-2} (${j[d-2]}) = ${j[d]}.`),a(j),C(A),o(d+1),d===t&&u(!1)};return i.useEffect(()=>{let j;return x&&d<=t?j=setInterval(I,1e3):u(!1),()=>clearInterval(j)},[x,d]),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[e.jsx("div",{style:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center"},children:b}),e.jsx("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap",justifyContent:"center"},children:n.map((j,A)=>e.jsxs(q.div,{initial:{scale:.8,opacity:0},animate:{scale:d-1===A?1.1:1,opacity:1,backgroundColor:d-1===A?"#FACC15":j>0?"#3B82F6":"#F1F5F9",color:j>0||d-1===A?"white":"#64748B"},style:{width:"60px",height:"60px",borderRadius:"10px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontWeight:"700",border:"1px solid #E2E8F0",boxShadow:d-1===A?"0 0 15px rgba(250, 204, 21, 0.5)":"none"},children:[e.jsxs("span",{style:{fontSize:"0.7rem",marginBottom:"2px"},children:["dp[",A,"]"]}),e.jsx("span",{style:{fontSize:"1.2rem"},children:j===0&&A>d-1?"?":j})]},A))}),e.jsxs("div",{style:{display:"flex",gap:"12px",justifyContent:"center"},children:[e.jsx("button",{onClick:()=>u(!0),disabled:x||d>t,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer",opacity:x||d>t?.6:1},children:"Start Animation"}),e.jsx("button",{onClick:I,disabled:x||d>t,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer",opacity:x||d>t?.6:1},children:"Next Step"}),e.jsx("button",{onClick:R,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer"},children:"Reset"})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"center",gap:"20px",marginTop:"10px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.85rem",color:"#64748B"},children:[e.jsx("div",{style:{width:"12px",height:"12px",borderRadius:"3px",background:"#FACC15"}})," Current"]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.85rem",color:"#64748B"},children:[e.jsx("div",{style:{width:"12px",height:"12px",borderRadius:"3px",background:"#3B82F6"}})," Computed"]})]})]})},zr=()=>{const t=[1,2,5],n=11,[a,d]=i.useState(Array(n+1).fill(1/0)),[o,x]=i.useState(0),[u,b]=i.useState(!1),[C,R]=i.useState("Amount 0 requires 0 coins (Base Case)."),[I,j]=i.useState(null);i.useEffect(()=>{let c=Array(n+1).fill(1/0);c[0]=0,d(c)},[]);const A=()=>{let c=Array(n+1).fill(1/0);c[0]=0,d(c),x(0),b(!1),R("Amount 0 requires 0 coins (Base Case)."),j(null)},r=()=>{if(o>=n)return;let c=o+1,p=[...a],l=1/0,y=null;for(let B of t)c-B>=0&&a[c-B]+1<l&&(l=a[c-B]+1,y=B);p[c]=l,d(p),j(y),R(`Amount ${c}: Min coins = min(${t.filter(B=>c-B>=0).map(B=>`dp[${c-B}]+1`).join(", ")}) = ${l}.`),x(c),c===n&&b(!1)};return i.useEffect(()=>{let c;return u&&o<n?c=setInterval(r,1e3):b(!1),()=>clearInterval(c)},[u,o]),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[e.jsx("div",{style:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center"},children:C}),e.jsx("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap",justifyContent:"center"},children:a.map((c,p)=>e.jsxs(q.div,{animate:{scale:o===p?1.1:1,backgroundColor:o===p?"#FACC15":c!==1/0?"#3B82F6":"#F1F5F9",color:c!==1/0||o===p?"white":"#64748B"},style:{width:"45px",height:"55px",borderRadius:"8px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontWeight:"700",border:"1px solid #E2E8F0",fontSize:"0.9rem"},children:[e.jsxs("span",{style:{fontSize:"0.6rem"},children:["amt:",p]}),e.jsx("span",{children:c===1/0?"∞":c})]},p))}),e.jsxs("div",{style:{display:"flex",gap:"12px",justifyContent:"center"},children:[e.jsx("button",{onClick:()=>b(!0),disabled:u||o>=n,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer",opacity:u||o>=n?.6:1},children:"Start Animation"}),e.jsx("button",{onClick:r,disabled:u||o>=n,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer",opacity:u||o>=n?.6:1},children:"Next Step"}),e.jsx("button",{onClick:A,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer"},children:"Reset"})]}),e.jsx("div",{style:{display:"flex",justifyContent:"center",gap:"15px"},children:t.map(c=>e.jsx("div",{style:{width:"30px",height:"30px",borderRadius:"50%",background:"#F59E0B",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.8rem",fontWeight:"bold"},children:c},c))})]})},Ar=()=>{const t=[2,7,9,3,1],n=t.length,[a,d]=i.useState(Array(n+1).fill(0)),[o,x]=i.useState(1),[u,b]=i.useState(!1),[C,R]=i.useState("Initially, no money is robbed."),[I,j]=i.useState(null),A=()=>{d(Array(n+1).fill(0)),x(1),b(!1),R("Initially, no money is robbed."),j(null)},r=()=>{if(o>n)return;let c=[...a],p=t[o-1],l=p+(o>=2?a[o-2]:0),y=a[o-1];l>=y?(c[o]=l,j("rob"),R(`House ${o} ($${p}): Robbing is better! $${p} + prev loot $${o>=2?a[o-2]:0} = $${l}.`)):(c[o]=y,j("skip"),R(`House ${o} ($${p}): Skipping is better! Keep prev loot $${y}.`)),d(c),x(o+1),o===n&&b(!1)};return i.useEffect(()=>{let c;return u&&o<=n?c=setInterval(r,1200):b(!1),()=>clearInterval(c)},[u,o]),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[e.jsx("div",{style:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center"},children:C}),e.jsx("div",{style:{display:"flex",gap:"12px",justifyContent:"center",alignItems:"flex-end",height:"100px"},children:t.map((c,p)=>e.jsxs(q.div,{animate:{scale:o-1===p?1.1:1,borderColor:o-1===p?"#FACC15":"#E2E8F0",backgroundColor:o-1===p?"#FEF9C3":"white"},style:{width:"50px",height:40+c*5,border:"2px solid",borderRadius:"8px 8px 0 0",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative"},children:[e.jsx("span",{style:{fontSize:"1.2rem"},children:"🏠"}),e.jsxs("span",{style:{fontSize:"0.8rem",fontWeight:"bold"},children:["$",c]}),o-1===p&&I==="rob"&&e.jsx(q.span,{initial:{y:-20,opacity:0},animate:{y:0,opacity:1},style:{position:"absolute",top:"-30px",fontSize:"1.5rem"},children:"💰"})]},p))}),e.jsx("div",{style:{display:"flex",gap:"8px",justifyContent:"center"},children:a.map((c,p)=>e.jsxs(q.div,{animate:{backgroundColor:o===p?"#FACC15":c>0||p===0?"#3B82F6":"#F1F5F9",color:"white"},style:{width:"45px",height:"45px",borderRadius:"8px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontWeight:"700",fontSize:"0.8rem"},children:[e.jsxs("span",{style:{fontSize:"0.6rem"},children:["dp[",p,"]"]}),e.jsx("span",{children:c})]},p))}),e.jsxs("div",{style:{display:"flex",gap:"12px",justifyContent:"center"},children:[e.jsx("button",{onClick:()=>b(!0),disabled:u||o>n,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer",opacity:u||o>n?.6:1},children:"Start Animation"}),e.jsx("button",{onClick:r,disabled:u||o>n,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer",opacity:u||o>n?.6:1},children:"Next Step"}),e.jsx("button",{onClick:A,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer"},children:"Reset"})]})]})},Rr=()=>{const t=[10,2,5,3,7,101],n=t.length,[a,d]=i.useState(Array(n).fill(1)),[o,x]=i.useState(0),[u,b]=i.useState(-1),[C,R]=i.useState(!1),[I,j]=i.useState("Each element starts as a sequence of length 1."),A=()=>{d(Array(n).fill(1)),x(0),b(-1),R(!1),j("Each element starts as a sequence of length 1.")},r=()=>{if(o>=n)return;let c=o,p=u+1,l=[...a],y="";if(p>=c&&(c=o+1,p=0,c>=n)){R(!1),j(`Finished! Longest Increasing Subsequence length is ${Math.max(...a)}.`);return}t[c]>t[p]?a[p]+1>l[c]?(l[c]=a[p]+1,y=`nums[${c}] (${t[c]}) > nums[${p}] (${t[p]}). Updated dp[${c}] to ${l[c]}.`):y=`nums[${c}] (${t[c]}) > nums[${p}] (${t[p]}) but no improvement.`:y=`nums[${c}] (${t[c]}) <= nums[${p}] (${t[p]}). Move on.`,x(c),b(p),d(l),j(y)};return i.useEffect(()=>{let c;return C&&o<n?c=setInterval(r,800):R(!1),()=>clearInterval(c)},[C,o,u]),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[e.jsx("div",{style:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center"},children:I}),e.jsx("div",{style:{display:"flex",gap:"10px",justifyContent:"center"},children:t.map((c,p)=>e.jsxs(q.div,{animate:{scale:o===p?1.1:u===p?1.05:1,boxShadow:o===p?"0 0 10px rgba(250, 204, 21, 0.8)":u===p?"0 0 10px rgba(168, 85, 247, 0.8)":"none",borderColor:o===p?"#FACC15":u===p?"#A855F7":"#E2E8F0"},style:{width:"50px",height:"50px",border:"2px solid",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold",background:"white",color:"#1E293B"},children:[c,o===p&&e.jsx("span",{style:{position:"absolute",top:"-25px",fontSize:"0.8rem",color:"#FACC15"},children:"i"}),u===p&&e.jsx("span",{style:{position:"absolute",top:"-25px",fontSize:"0.8rem",color:"#A855F7"},children:"j"})]},p))}),e.jsx("div",{style:{display:"flex",gap:"10px",justifyContent:"center"},children:a.map((c,p)=>e.jsxs(q.div,{animate:{backgroundColor:o===p?"#FACC15":c>1?"#3B82F6":"#F1F5F9",color:c>1||o===p?"white":"#64748B"},style:{width:"50px",height:"40px",borderRadius:"6px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontWeight:"700",fontSize:"0.8rem"},children:[e.jsxs("span",{style:{fontSize:"0.6rem"},children:["dp[",p,"]"]}),e.jsx("span",{children:c})]},p))}),e.jsxs("div",{style:{display:"flex",gap:"12px",justifyContent:"center"},children:[e.jsx("button",{onClick:()=>R(!0),disabled:C||o>=n,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer",opacity:C||o>=n?.6:1},children:"Start Animation"}),e.jsx("button",{onClick:r,disabled:C||o>=n,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer",opacity:C||o>=n?.6:1},children:"Next Step"}),e.jsx("button",{onClick:A,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer"},children:"Reset"})]})]})},Ir=()=>{const t="ABCDE",a=t.length,d=3,[o,x]=i.useState(Array.from({length:a+1},()=>Array(d+1).fill(0))),[u,b]=i.useState(1),[C,R]=i.useState(1),[I,j]=i.useState(!1),[A,r]=i.useState("Fill 2D table: Match = Diagonal + 1, Mismatch = Max(Top, Left)."),c=()=>{x(Array.from({length:a+1},()=>Array(d+1).fill(0))),b(1),R(1),j(!1),r("Fill 2D table: Match = Diagonal + 1, Mismatch = Max(Top, Left).")},p=()=>{if(u>a)return;let l=o.map(M=>[...M]),y="";t[u-1]==="ACE"[C-1]?(l[u][C]=o[u-1][C-1]+1,y=`Match! ${t[u-1]} === ${"ACE"[C-1]}. dp[${u}][${C}] = dp[${u-1}][${C-1}] + 1 = ${l[u][C]}.`):(l[u][C]=Math.max(o[u-1][C],o[u][C-1]),y=`Mismatch! ${t[u-1]} != ${"ACE"[C-1]}. dp[${u}][${C}] = max(dp[${u-1}][${C}], dp[${u}][${C-1}]) = ${l[u][C]}.`),x(l),r(y);let B=C+1,H=u;B>d&&(B=1,H=u+1),b(H),R(B),H>a&&(j(!1),r(`Finished! LCS length is ${l[a][d]}.`))};return i.useEffect(()=>{let l;return I&&u<=a?l=setInterval(p,1e3):j(!1),()=>clearInterval(l)},[I,u,C]),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[e.jsx("div",{style:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center"},children:A}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{borderCollapse:"collapse",margin:"0 auto"},children:[e.jsxs("thead",{children:[e.jsxs("tr",{children:[e.jsx("th",{}),e.jsx("th",{}),"ACE".split("").map((l,y)=>e.jsx("th",{style:{padding:"8px",color:"#4F46E5",fontWeight:"800"},children:l},y))]}),e.jsxs("tr",{children:[e.jsx("th",{}),e.jsx("th",{style:{padding:"8px",border:"1px solid #E2E8F0",background:"#F8FAFC"},children:"0"}),"ACE".split("").map((l,y)=>e.jsx("th",{style:{padding:"8px",border:"1px solid #E2E8F0",background:"#F8FAFC"},children:y+1},y))]})]}),e.jsx("tbody",{children:o.map((l,y)=>e.jsxs("tr",{children:[e.jsx("th",{style:{padding:"8px",color:"#4F46E5",fontWeight:"800"},children:y===0?"":t[y-1]}),l.map((B,H)=>e.jsx(q.td,{animate:{backgroundColor:u===y&&C===H?"#FACC15":y>0&&H>0&&B>0?"#DCFCE7":"white",borderColor:u===y&&C===H?"#FACC15":"#E2E8F0"},style:{border:"1px solid",width:"40px",height:"40px",textAlign:"center",fontWeight:"bold",fontSize:"0.9rem"},children:B},H))]},y))})]})}),e.jsxs("div",{style:{display:"flex",gap:"12px",justifyContent:"center"},children:[e.jsx("button",{onClick:()=>j(!0),disabled:I||u>a,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer",opacity:I||u>a?.6:1},children:"Start Animation"}),e.jsx("button",{onClick:p,disabled:I||u>a,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer",opacity:I||u>a?.6:1},children:"Next Step"}),e.jsx("button",{onClick:c,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer"},children:"Reset"})]})]})},Wr=()=>{const[o,x]=i.useState(()=>{let l=Array.from({length:4},()=>Array(4).fill(0));for(let y=0;y<=3;y++)l[y][0]=y;for(let y=0;y<=3;y++)l[0][y]=y;return l}),[u,b]=i.useState(1),[C,R]=i.useState(1),[I,j]=i.useState(!1),[A,r]=i.useState("Init first row/col: Distance from empty string."),c=()=>{let l=Array.from({length:4},()=>Array(4).fill(0));for(let y=0;y<=3;y++)l[y][0]=y;for(let y=0;y<=3;y++)l[0][y]=y;x(l),b(1),R(1),j(!1),r("Init first row/col: Distance from empty string.")},p=()=>{if(u>3)return;let l=o.map(M=>[...M]),y="";if("CAT"[u-1]==="CUT"[C-1])l[u][C]=o[u-1][C-1],y=`Same character! ${"CAT"[u-1]} === ${"CUT"[C-1]}. dp[${u}][${C}] = dp[${u-1}][${C-1}] = ${l[u][C]}.`;else{let M=o[u-1][C-1],T=o[u][C-1],$=o[u-1][C];l[u][C]=1+Math.min(M,T,$),y=`Different! ${"CAT"[u-1]} != ${"CUT"[C-1]}. dp[${u}][${C}] = 1 + min(replace:${M}, insert:${T}, delete:${$}) = ${l[u][C]}.`}x(l),r(y);let B=C+1,H=u;B>3&&(B=1,H=u+1),b(H),R(B),H>3&&(j(!1),r(`Finished! Edit Distance is ${l[3][3]}.`))};return i.useEffect(()=>{let l;return I&&u<=3?l=setInterval(p,1e3):j(!1),()=>clearInterval(l)},[I,u,C]),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[e.jsx("div",{style:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center"},children:A}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{borderCollapse:"collapse",margin:"0 auto"},children:[e.jsxs("thead",{children:[e.jsxs("tr",{children:[e.jsx("th",{}),e.jsx("th",{}),"CUT".split("").map((l,y)=>e.jsx("th",{style:{padding:"8px",color:"#4F46E5",fontWeight:"800"},children:l},y))]}),e.jsxs("tr",{children:[e.jsx("th",{}),Array.from({length:4}).map((l,y)=>e.jsx("th",{style:{padding:"8px",border:"1px solid #E2E8F0",background:"#F8FAFC"},children:y},y))]})]}),e.jsx("tbody",{children:o.map((l,y)=>e.jsxs("tr",{children:[e.jsx("th",{style:{padding:"8px",color:"#4F46E5",fontWeight:"800"},children:y===0?"":"CAT"[y-1]}),l.map((B,H)=>e.jsx(q.td,{animate:{backgroundColor:u===y&&C===H?"#FACC15":y>0&&H>0?"CAT"[y-1]==="CUT"[H-1]?"#DCFCE7":"#EFF6FF":"#F8FAFC",borderColor:u===y&&C===H?"#FACC15":"#E2E8F0"},style:{border:"1px solid",width:"40px",height:"40px",textAlign:"center",fontWeight:"bold",fontSize:"0.9rem"},children:B},H))]},y))})]})}),e.jsxs("div",{style:{display:"flex",gap:"12px",justifyContent:"center"},children:[e.jsx("button",{onClick:()=>j(!0),disabled:I||u>3,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer",opacity:I||u>3?.6:1},children:"Start Animation"}),e.jsx("button",{onClick:p,disabled:I||u>3,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer",opacity:I||u>3?.6:1},children:"Next Step"}),e.jsx("button",{onClick:c,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer"},children:"Reset"})]})]})},Tr=()=>{const t=[1,5,11,5],n=11,a=t.length,[d,o]=i.useState(()=>{let p=Array.from({length:a+1},()=>Array(n+1).fill(!1));for(let l=0;l<=a;l++)p[l][0]=!0;return p}),[x,u]=i.useState(1),[b,C]=i.useState(1),[R,I]=i.useState(!1),[j,A]=i.useState("Subset sum of 0 is always possible (true)."),r=()=>{let p=Array.from({length:a+1},()=>Array(n+1).fill(!1));for(let l=0;l<=a;l++)p[l][0]=!0;o(p),u(1),C(1),I(!1),A("Subset sum of 0 is always possible (true).")},c=()=>{if(x>a)return;let p=d.map(M=>[...M]),l="",y=t[x-1];y<=b?(p[x][b]=d[x-1][b]||d[x-1][b-y],l=`Item ${y} fits in target ${b}. dp[${x}][${b}] = dp[${x-1}][${b}] (skip) || dp[${x-1}][${b-y}] (take) = ${p[x][b]?"TRUE":"FALSE"}.`):(p[x][b]=d[x-1][b],l=`Item ${y} too big for target ${b}. dp[${x}][${b}] = dp[${x-1}][${b}] (skip) = ${p[x][b]?"TRUE":"FALSE"}.`),o(p),A(l);let B=b+1,H=x;B>n&&(B=1,H=x+1),u(H),C(B),H>a&&(I(!1),A(`Finished! Target sum ${n} is ${p[a][n]?"POSSIBLE":"IMPOSSIBLE"}.`))};return i.useEffect(()=>{let p;return R&&x<=a?p=setInterval(c,600):I(!1),()=>clearInterval(p)},[R,x,b]),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[e.jsx("div",{style:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center"},children:j}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{borderCollapse:"collapse",margin:"0 auto"},children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{}),Array.from({length:n+1}).map((p,l)=>e.jsx("th",{style:{padding:"6px",border:"1px solid #E2E8F0",background:"#F8FAFC"},children:l},l))]})}),e.jsx("tbody",{children:d.map((p,l)=>e.jsxs("tr",{children:[e.jsx("th",{style:{padding:"6px",color:"#4F46E5",fontWeight:"800"},children:l===0?"None":`${t[l-1]}`}),p.map((y,B)=>e.jsx(q.td,{animate:{backgroundColor:x===l&&b===B?"#FACC15":y?"#DCFCE7":"white",borderColor:x===l&&b===B?"#FACC15":"#E2E8F0"},style:{border:"1px solid",width:"35px",height:"35px",textAlign:"center",fontWeight:"bold",fontSize:"0.7rem"},children:y?"T":"F"},B))]},l))})]})}),e.jsxs("div",{style:{display:"flex",gap:"12px",justifyContent:"center"},children:[e.jsx("button",{onClick:()=>I(!0),disabled:R||x>a,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer",opacity:R||x>a?.6:1},children:"Start Animation"}),e.jsx("button",{onClick:c,disabled:R||x>a,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer",opacity:R||x>a?.6:1},children:"Next Step"}),e.jsx("button",{onClick:r,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer"},children:"Reset"})]})]})},$r=()=>{const t=[{w:1,v:1},{w:2,v:3},{w:3,v:4}],n=5,a=t.length,[d,o]=i.useState(Array.from({length:a+1},()=>Array(n+1).fill(0))),[x,u]=i.useState(1),[b,C]=i.useState(1),[R,I]=i.useState(!1),[j,A]=i.useState("Rows = Items, Cols = Remaining Capacity."),r=()=>{o(Array.from({length:a+1},()=>Array(n+1).fill(0))),u(1),C(1),I(!1),A("Rows = Items, Cols = Remaining Capacity.")},c=()=>{if(x>a)return;let p=d.map(M=>[...M]),l="",y=t[x-1];if(y.w<=b){let M=y.v+d[x-1][b-y.w],T=d[x-1][b];p[x][b]=Math.max(M,T),l=`Item fits! Max(take:${y.v}+dp[${x-1}][${b-y.w}], leave:dp[${x-1}][${b}]) = ${p[x][b]}.`}else p[x][b]=d[x-1][b],l=`Doesn't fit. dp[${x}][${b}] = dp[${x-1}][${b}] = ${p[x][b]}.`;o(p),A(l);let B=b+1,H=x;B>n&&(B=1,H=x+1),u(H),C(B),H>a&&(I(!1),A(`Finished! Max Value possible is ${p[a][n]}.`))};return i.useEffect(()=>{let p;return R&&x<=a?p=setInterval(c,1e3):I(!1),()=>clearInterval(p)},[R,x,b]),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[e.jsx("div",{style:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center"},children:j}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{borderCollapse:"collapse",margin:"0 auto"},children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{}),Array.from({length:n+1}).map((p,l)=>e.jsx("th",{style:{padding:"8px",border:"1px solid #E2E8F0",background:"#F8FAFC"},children:l},l))]})}),e.jsx("tbody",{children:d.map((p,l)=>e.jsxs("tr",{children:[e.jsx("th",{style:{padding:"8px",color:"#4F46E5",fontWeight:"800"},children:l===0?"0":`v${t[l-1].v},w${t[l-1].w}`}),p.map((y,B)=>e.jsx(q.td,{animate:{backgroundColor:x===l&&b===B?"#FACC15":l>0&&B>0&&y>0?"#DCFCE7":"white",borderColor:x===l&&b===B?"#FACC15":"#E2E8F0"},style:{border:"1px solid",width:"40px",height:"40px",textAlign:"center",fontWeight:"bold",fontSize:"0.9rem"},children:y},B))]},l))})]})}),e.jsxs("div",{style:{display:"flex",gap:"12px",justifyContent:"center"},children:[e.jsx("button",{onClick:()=>I(!0),disabled:R||x>a,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer",opacity:R||x>a?.6:1},children:"Start Animation"}),e.jsx("button",{onClick:c,disabled:R||x>a,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer",opacity:R||x>a?.6:1},children:"Next Step"}),e.jsx("button",{onClick:r,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer"},children:"Reset"})]})]})},Dr=[{id:"climbingstairs",title:"Climbing Stairs",difficulty:"Easy",description:"You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",example:"n = 3 => 3 ways (1+1+1, 1+2, 2+1)",python:`def climbStairs(n: int) -> int:
    if n <= 2: return n
    dp = [0] * (n + 1)
    dp[1], dp[2] = 1, 2
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]`,javascript:`function climbStairs(n) {
    if (n <= 2) return n;
    let dp = [0, 1, 2];
    for (let i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}`,cpp:`int climbStairs(int n) {
    if (n <= 2) return n;
    vector<int> dp(n + 1);
    dp[1] = 1; dp[2] = 2;
    for (int i = 3; i <= n; i++) {
        dp[i] = dp[i-1] + dp[i-2];
    }
    return dp[n];
}`,algorithm:"The number of ways to reach step `n` is exactly the sum of the ways to reach step `n-1` and step `n-2`."},{id:"coinchange",title:"Coin Change",difficulty:"Medium",description:"You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount.",example:"coins = [1,2,5], amount = 11 => 3 (5+5+1)",python:`def coinChange(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for c in coins:
            if i - c >= 0:
                dp[i] = min(dp[i], dp[i - c] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1`,javascript:`function coinChange(coins, amount) {
    const dp = Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    for (let i = 1; i <= amount; i++) {
        for (let c of coins) {
            if (i - c >= 0) dp[i] = Math.min(dp[i], dp[i - c] + 1);
        }
    }
    return dp[amount] === Infinity ? -1 : dp[amount];
}`,cpp:`int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int c : coins) {
            if (i - c >= 0) dp[i] = min(dp[i], dp[i - c] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,algorithm:"Build an array up to `amount` initialized to Infinity. For each amount, test every coin denomination to find the minimum number of coins."},{id:"houserobber",title:"House Robber",difficulty:"Medium",description:"You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected.",example:"nums = [1,2,3,1] => 4 (Rob house 1 and 3)",python:`def rob(nums: list[int]) -> int:
    rob1, rob2 = 0, 0
    for n in nums:
        temp = max(n + rob1, rob2)
        rob1 = rob2
        rob2 = temp
    return rob2`,javascript:`function rob(nums) {
    let rob1 = 0, rob2 = 0;
    for (let i = 0; i < nums.length; i++) {
        let temp = Math.max(nums[i] + rob1, rob2);
        rob1 = rob2;
        rob2 = temp;
    }
    return rob2;
}`,cpp:`int rob(vector<int>& nums) {
    int rob1 = 0, rob2 = 0;
    for (int n : nums) {
        int temp = max(n + rob1, rob2);
        rob1 = rob2;
        rob2 = temp;
    }
    return rob2;
}`,algorithm:"At each house, decide: Is it better to rob this house + the houses before the previous one? Or just keep the loot up to the previous house?"},{id:"lis",title:"Longest Increasing Subsequence",difficulty:"Medium",description:"Given an integer array nums, return the length of the longest strictly increasing subsequence.",example:"nums = [10,9,2,5,3,7,101,18] => 4 ([2,3,7,101])",python:`def lengthOfLIS(nums: list[int]) -> int:
    dp = [1] * len(nums)
    for i in range(1, len(nums)):
        for j in range(i):
            if nums[i] > nums[j]:
                dp[i] = max(dp[i], dp[j] + 1)
    return max(dp)`,javascript:`function lengthOfLIS(nums) {
    const dp = Array(nums.length).fill(1);
    let max = 1;
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
        max = Math.max(max, dp[i]);
    }
    return Math.max(...dp);
}`,cpp:`int lengthOfLIS(vector<int>& nums) {
    vector<int> dp(nums.size(), 1);
    int res = 1;
    for (int i = 1; i < nums.size(); i++) {
        for (int j = 0; j < i; j++) {
            if (nums[i] > nums[j]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
        res = max(res, dp[i]);
    }
    return res;
}`,algorithm:"For every element, look back at all previous elements. If the current is strictly greater, add 1 to the previous longest sequence."},{id:"lcs",title:"Longest Common Subsequence",difficulty:"Medium",description:"Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.",example:'text1 = "abcde", text2 = "ace" => 3 ("ace")',python:`def longestCommonSubsequence(text1: str, text2: str) -> int:
    dp = [[0] * (len(text2) + 1) for _ in range(len(text1) + 1)]
    for i in range(1, len(text1) + 1):
        for j in range(1, len(text2) + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    return dp[len(text1)][len(text2)]`,javascript:`function longestCommonSubsequence(text1, text2) {
    const dp = Array(text1.length + 1).fill(0).map(() => Array(text2.length + 1).fill(0));
    for (let i = 1; i <= text1.length; i++) {
        for (let j = 1; j <= text2.length; j++) {
            if (text1[i-1] === text2[j-1]) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    return dp[text1.length][text2.length];
}`,cpp:`int longestCommonSubsequence(string text1, string text2) {
    vector<vector<int>> dp(text1.size() + 1, vector<int>(text2.size() + 1, 0));
    for (int i = 1; i <= text1.size(); i++) {
        for (int j = 1; j <= text2.size(); j++) {
            if (text1[i-1] == text2[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
            else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
        }
    }
    return dp[text1.size()][text2.size()];
}`,algorithm:"Compare strings in a 2D matrix. Match? Diagonal + 1. Mismatch? Max of Top or Left cell."},{id:"editdistance",title:"Edit Distance",difficulty:"Hard",description:"Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2 (insert, delete, or replace).",example:'word1 = "horse", word2 = "ros" => 3',python:`def minDistance(word1: str, word2: str) -> int:
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(m + 1): dp[i][0] = i
    for j in range(n + 1): dp[0][j] = j
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])
    return dp[m][n]`,javascript:`function minDistance(word1, word2) {
    const m = word1.length, n = word2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i-1] === word2[j-1]) dp[i][j] = dp[i-1][j-1];
            else dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
        }
    }
    return dp[m][n];
}`,cpp:`int minDistance(string word1, string word2) {
    int m = word1.size(), n = word2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1));
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (word1[i-1] == word2[j-1]) dp[i][j] = dp[i-1][j-1];
            else dp[i][j] = 1 + min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});
        }
    }
    return dp[m][n];
}`,algorithm:"Very similar to LCS: Construct a 2D matrix mapping prefixes. Mismatches evaluate the minimum cost of insertion, deletion, or substitution."},{id:"subsetsum",title:"Partition Equal Subset Sum",difficulty:"Medium",description:"Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.",example:"nums = [1,5,11,5] => true (11 and 1+5+5)",python:`def canPartition(nums: list[int]) -> bool:
    total = sum(nums)
    if total % 2 != 0: return False
    target = total // 2
    dp = set([0])
    
    for n in nums:
        next_dp = set(dp)
        for t in dp:
            if t + n == target: return True
            next_dp.add(t + n)
        dp = next_dp
    return target in dp`,javascript:`function canPartition(nums) {
    const total = nums.reduce((a, b) => a + b, 0);
    if (total % 2 !== 0) return false;
    const target = total / 2;
    const dp = new Set([0]);
    
    for (let n of nums) {
        const nextDp = new Set(dp);
        for (let t of dp) {
            if (t + n === target) return true;
            nextDp.add(t + n);
        }
        dp.clear();
        for (let next of nextDp) dp.add(next);
    }
    return dp.has(target);
}`,cpp:`bool canPartition(vector<int>& nums) {
    int sum = 0;
    for (int n : nums) sum += n;
    if (sum % 2 != 0) return false;
    int target = sum / 2;
    vector<bool> dp(target + 1, false);
    dp[0] = true;
    
    for (int n : nums) {
        for (int i = target; i >= n; i--) {
            dp[i] = dp[i] || dp[i - n];
        }
    }
    return dp[target];
}`,algorithm:"To divide the array equally, the sum of array elements must be even. The target is sum/2. This then becomes a 0/1 knapsack problem reaching exact weight target."},{id:"knapsack01",title:"0/1 Knapsack",difficulty:"Medium",description:"Given a set of items, each with a weight and a value, determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible. (You can take exactly 0 or 1 of each item)",example:"values = [60, 100, 120], weights = [10, 20, 30], W = 50 => 220",python:`def knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for w in range(1, capacity + 1):
            if weights[i - 1] <= w:
                take = values[i - 1] + dp[i - 1][w - weights[i - 1]]
                dp[i][w] = max(take, dp[i - 1][w])
            else:
                dp[i][w] = dp[i - 1][w]
    return dp[n][capacity]`,javascript:`function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
    for (let i = 1; i <= n; i++) {
        for (let w = 1; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(values[i-1] + dp[i-1][w-weights[i-1]], dp[i-1][w]);
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }
    return dp[n][capacity];
}`,cpp:`int knapsack(int W, int wt[], int val[], int n) {
    vector<vector<int>> K(n + 1, vector<int>(W + 1));
    for (int i = 0; i <= n; i++) {
        for (int w = 0; w <= W; w++) {
            if (i == 0 || w == 0)
                K[i][w] = 0;
            else if (wt[i - 1] <= w)
                K[i][w] = max(val[i - 1] + K[i - 1][w - wt[i - 1]], K[i - 1][w]);
            else
                K[i][w] = K[i - 1][w];
        }
    }
    return K[n][W];
}`,algorithm:"For every item up to the limit capacity, decide if it contributes to the maximum value to either take the item, or leave it behind based on previous solutions."}],Ft=t=>{switch(t){case"Easy":return"#22C55E";case"Medium":return"#F59E0B";case"Hard":return"#EF4444";default:return"#64748B"}},Mr=()=>{const[t,n]=i.useState(null),[a,d]=i.useState("javascript");return e.jsx("div",{className:"dp-container",children:e.jsxs("div",{className:"dp-split-layout",children:[e.jsxs("div",{className:"dp-left-panel",children:[e.jsxs("div",{style:{marginBottom:"20px"},children:[e.jsx("h3",{style:{margin:"0 0 8px 0",fontSize:"1.5rem",color:"#1E293B",fontWeight:"800"},children:"Practice Problems"}),e.jsx("p",{style:{margin:0,color:"#64748B",fontSize:"1rem",lineHeight:"1.5"},children:"Master Dynamic Programming with these classic coding interview questions."})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"16px",overflowY:"auto"},children:Dr.map(o=>e.jsxs(q.div,{onClick:()=>n(o),whileHover:{scale:1.02,y:-2},whileTap:{scale:.98},style:{background:"white",borderRadius:"14px",padding:"16px",boxShadow:"0 4px 10px rgba(0,0,0,0.05)",cursor:"pointer",border:t?.id===o.id?"2px solid #4F46E5":"2px solid transparent",transition:"border 0.2s ease",display:"flex",flexDirection:"column",gap:"10px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("h4",{style:{margin:0,color:"#1E293B",fontSize:"1.1rem",fontWeight:"bold"},children:o.title}),e.jsx("span",{style:{background:Ft(o.difficulty)+"20",color:Ft(o.difficulty),padding:"4px 10px",borderRadius:"999px",fontSize:"0.8rem",fontWeight:"700"},children:o.difficulty})]}),e.jsx("p",{style:{margin:0,color:"#64748B",fontSize:"0.9rem",lineHeight:"1.5",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"},children:o.description})]},o.id))})]}),e.jsx("div",{className:"dp-right-panel",children:e.jsx(X,{mode:"wait",children:t?e.jsxs(q.div,{initial:{opacity:0,x:20},animate:{opacity:1,x:0},exit:{opacity:0,x:-20},transition:{duration:.3},className:"dp-solution-viewer",children:[e.jsxs("div",{style:{borderBottom:"2px solid #F1F5F9",paddingBottom:"20px",marginBottom:"20px"},children:[e.jsx("h2",{style:{margin:"0 0 10px 0",fontSize:"1.8rem",color:"#1E293B",fontWeight:"800"},children:t.title}),e.jsx("p",{style:{margin:"0 0 16px 0",color:"#475569",fontSize:"1.05rem",lineHeight:"1.6"},children:t.description}),e.jsxs("div",{style:{background:"#F8FAFC",padding:"12px 16px",borderRadius:"8px",borderLeft:"4px solid #4F46E5"},children:[e.jsx("span",{style:{fontWeight:"bold",color:"#1E293B"},children:"Example: "}),e.jsx("code",{style:{color:"#4F46E5",fontFamily:"monospace",fontSize:"0.95rem"},children:t.example})]})]}),e.jsxs("div",{style:{marginBottom:"24px"},children:[e.jsx("h3",{style:{margin:"0 0 16px 0",fontSize:"1.3rem",color:"#1E293B"},children:"Visualization & Animation"}),e.jsxs("div",{style:{background:"#F8FAFC",padding:"24px",borderRadius:"16px",border:"1px solid #E2E8F0",boxShadow:"inset 0 2px 4px rgba(0,0,0,0.02)"},children:[t.id==="climbingstairs"&&e.jsx(Er,{}),t.id==="coinchange"&&e.jsx(zr,{}),t.id==="houserobber"&&e.jsx(Ar,{}),t.id==="lis"&&e.jsx(Rr,{}),t.id==="lcs"&&e.jsx(Ir,{}),t.id==="editdistance"&&e.jsx(Wr,{}),t.id==="subsetsum"&&e.jsx(Tr,{}),t.id==="knapsack01"&&e.jsx($r,{})]})]}),e.jsxs("div",{style:{marginBottom:"24px"},children:[e.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"1.3rem",color:"#1E293B"},children:"Algorithm Approach"}),e.jsxs("div",{style:{background:"#EEF2FF",color:"#312E81",padding:"16px",borderRadius:"12px",fontSize:"1rem",lineHeight:"1.6"},children:["💡 ",t.algorithm]})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"},children:[e.jsx("h3",{style:{margin:0,fontSize:"1.3rem",color:"#1E293B"},children:"Solution Code"}),e.jsx("div",{style:{display:"flex",gap:"8px",background:"#F1F5F9",padding:"4px",borderRadius:"10px"},children:["python","javascript","cpp"].map(o=>e.jsx("button",{onClick:()=>d(o),style:{padding:"6px 14px",borderRadius:"6px",border:"none",fontWeight:"600",cursor:"pointer",transition:"all 0.2s",fontSize:"0.85rem",background:a===o?"#fff":"transparent",color:a===o?"#4F46E5":"#64748B",boxShadow:a===o?"0 2px 4px rgba(0,0,0,0.05)":"none"},children:o==="cpp"?"C++":o.charAt(0).toUpperCase()+o.slice(1)},o))})]}),e.jsx("pre",{style:{background:"#0F172A",color:"#E2E8F0",padding:"20px",borderRadius:"12px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",margin:0,fontFamily:'"Fira Code", monospace',boxShadow:"inset 0 2px 4px rgba(0,0,0,0.1)"},children:e.jsx("code",{children:t[a]})})]})]},t.id):e.jsxs(q.div,{initial:{opacity:0},animate:{opacity:1},style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",color:"#94A3B8"},children:[e.jsx("div",{style:{fontSize:"4rem",marginBottom:"16px"},children:"🧩"}),e.jsx("h3",{style:{margin:0},children:"Select a problem to view its solution"})]})})})]})})},Bt=[{id:"climbingstairs",label:"Climbing Stairs"},{id:"coinchange",label:"Coin Change"},{id:"knapsack",label:"0/1 Knapsack"},{id:"practice",label:"DP Practice Problems"}],qr=({name:t})=>e.jsxs("div",{style:{padding:"3rem",textAlign:"center",color:"#64748b",fontFamily:"system-ui, sans-serif"},children:[e.jsx("div",{style:{fontSize:"3rem",marginBottom:"1rem"},children:"🚧"}),e.jsx("h3",{style:{fontSize:"1.5rem",fontWeight:"700",color:"#1e293b",marginBottom:"0.5rem"},children:t}),e.jsx("p",{style:{fontSize:"1rem"},children:"This metaphor is coming soon. Stay tuned!"})]}),Hr=()=>{const[t,n]=i.useState("climbingstairs"),a=()=>{switch(t){case"climbingstairs":return e.jsx(Sr,{});case"coinchange":return e.jsx(Cr,{});case"knapsack":return e.jsx(Fr,{});case"practice":return e.jsx(Mr,{});default:return e.jsx(qr,{name:Bt.find(d=>d.id===t)?.label})}};return e.jsx("div",{style:Ce.shell,children:e.jsxs("div",{style:Ce.contentWrapper,children:[e.jsxs("div",{style:Ce.heroSection,children:[e.jsx("h1",{style:Ce.heroTitle,children:"Dynamic Programming"}),e.jsx("p",{style:Ce.heroSubtitle,children:"Dynamic Programming is a technique used to solve complex problems by breaking them into smaller subproblems and storing the results to avoid repeated computation."})]}),e.jsx("div",{style:Ce.topBar,children:e.jsx("div",{style:Ce.tabs,children:Bt.map(d=>e.jsxs("button",{style:{...Ce.tab,color:t===d.id?"#0f172a":"#64748b",opacity:t===d.id?1:.65,fontWeight:t===d.id?"700":"500"},onClick:()=>n(d.id),children:[d.label,t===d.id&&e.jsx(q.div,{layoutId:"activeTabUnderlineDP",style:Ce.activeUnderline,transition:{type:"spring",bounce:.2,duration:.5}})]},d.id))})}),e.jsx("div",{style:Ce.content,children:e.jsx(X,{mode:"wait",children:e.jsx(q.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},exit:{opacity:0},transition:{duration:.2,ease:"easeOut"},children:a()},t)})})]})})},Ce={shell:{width:"100%",minHeight:"100vh",backgroundColor:"#fff",fontFamily:"'Inter', system-ui, -apple-system, sans-serif"},contentWrapper:{maxWidth:"1100px",margin:"0 auto",padding:"0 1.5rem"},heroSection:{textAlign:"center",padding:"3rem 0 2rem 0"},heroTitle:{fontSize:"3rem",fontWeight:"900",color:"#0f172a",marginBottom:"0.75rem",letterSpacing:"-1.5px",lineHeight:"1.1"},heroSubtitle:{fontSize:"1.1rem",color:"#475569",maxWidth:"700px",margin:"0 auto",lineHeight:"1.6",opacity:.8},topBar:{display:"flex",justifyContent:"center",borderBottom:"1px solid #f1f5f9",marginBottom:"2rem",position:"sticky",top:"72px",backgroundColor:"rgba(255,255,255,0.8)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",zIndex:100,padding:"0.75rem 0",scrollMarginTop:"80px"},tabs:{display:"flex",gap:"0.5rem",padding:"0 1rem",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",maskImage:"linear-gradient(to right, transparent, black 5%, black 95%, transparent)",WebkitMaskImage:"linear-gradient(to right, transparent, black 5%, black 95%, transparent)"},tab:{padding:"0.6rem 1.2rem",background:"none",border:"none",fontSize:"0.875rem",cursor:"pointer",transition:"all 0.2s ease",display:"flex",alignItems:"center",gap:"10px",whiteSpace:"nowrap",borderRadius:"8px",position:"relative"},activeUnderline:{position:"absolute",bottom:"-0.5rem",left:"20%",right:"20%",height:"2px",backgroundColor:"#3b82f6",borderRadius:"2px"},content:{minHeight:"600px",marginBottom:"3rem"}},st=[{id:"A",start:1,end:3},{id:"B",start:2,end:4},{id:"C",start:3,end:5},{id:"D",start:0,end:6},{id:"E",start:5,end:7}],Pr=()=>{const[t,n]=i.useState([...st]),[a,d]=i.useState([]),[o,x]=i.useState([]),[u,b]=i.useState(-1),[C,R]=i.useState(!1),[I,j]=i.useState("Welcome! We want to schedule the maximum number of meetings."),[A,r]=i.useState("javascript"),{showFeedback:c}=le(),[p,l]=i.useState(!0),y=()=>{n([...st]),d([]),x([]),b(-1),R(!1),j("Welcome! We want to schedule the maximum number of meetings.")},B=()=>{const T=[...st].sort(($,v)=>$.end-v.end);n(T),d([]),x([]),b(0),R(!0),j("Step 1: Sort meetings by their finishing times.")},H=()=>{if(u===-1){B();return}if(u>=t.length){R(!1),j(`Finished! Scheduled ${a.length} meetings.`);return}const T=t[u],$=a.length>0?t[a[a.length-1]]:null;!$||T.start>=$.end?(d(v=>[...v,u]),j(`Selected Meeting ${T.id} (${T.start}-${T.end}). It starts after the last meeting ends.`),c(`Selected Meeting ${T.id}! ✅`)):(x(v=>[...v,u]),j(`Rejected Meeting ${T.id} (${T.start}-${T.end}). It overlaps with the scheduled time.`),c("Overlap found! Skipping... ⏭")),b(v=>v+1)};i.useEffect(()=>{let T;return C&&u>=0&&u<t.length?T=setTimeout(H,1500):u===t.length&&(R(!1),j(`Done! Maximum meetings scheduled: ${a.length}.`),c("Success! Schedule optimized 📅🚀","success")),()=>clearTimeout(T)},[C,u]);const M={python:`def activitySelection(start, end):
    # 1. Sort by end time
    activities = sorted(zip(start, end), key=lambda x: x[1])
    
    selected = [activities[0]]
    last_end = activities[0][1]
    
    for i in range(1, len(activities)):
        # 2. If start >= last end, pick it
        if activities[i][0] >= last_end:
            selected.append(activities[i])
            last_end = activities[i][1]
            
    return selected`,javascript:`function activitySelection(activities) {
    // 1. Sort by end time
    activities.sort((a, b) => a.end - b.end);
    
    const selected = [activities[0]];
    let lastEnd = activities[0].end;
    
    for (let i = 1; i < activities.length; i++) {
        // 2. If start >= last end, pick it
        if (activities[i].start >= lastEnd) {
            selected.push(activities[i]);
            lastEnd = activities[i].end;
        }
    }
    return selected;
}`,cpp:`struct Activity { int start, end; };

bool compare(Activity a, Activity b) {
    return a.end < b.end;
}

vector<Activity> select(vector<Activity>& arr) {
    sort(arr.begin(), arr.end(), compare);
    
    vector<Activity> res;
    res.push_back(arr[0]);
    int last_end = arr[0].end;
    
    for(int i = 1; i < arr.size(); i++) {
        if(arr[i].start >= last_end) {
            res.push_back(arr[i]);
            last_end = arr[i].end;
        }
    }
    return res;
}`};return e.jsxs("div",{style:se.container,children:[e.jsxs("div",{style:se.card,children:[e.jsx("h3",{style:se.cardTitle,children:"Activity Selection — Meeting Room Scheduler"}),e.jsxs("p",{style:se.cardDesc,children:["You manage a meeting room. Many meetings request slots. Your goal is to schedule the maximum number of non-overlapping meetings by always picking the one that ",e.jsx("strong",{children:"ends earliest"}),"."]}),e.jsx("div",{style:se.messageBox,children:I}),e.jsxs("div",{style:se.timelineContainer,children:[e.jsx("div",{style:se.timeRuler,children:[0,1,2,3,4,5,6,7].map(T=>e.jsxs("div",{style:se.timeMark,children:[T,":00"]},T))}),e.jsx("div",{style:se.slotsArea,children:t.map((T,$)=>{const v=a.includes($),D=o.includes($),z=u===$;return e.jsx(q.div,{layout:!0,initial:{opacity:0,x:-20},animate:{opacity:1,x:0,backgroundColor:v?"#DCFCE7":D?"#FEE2E2":z?"#FEF9C3":"#F1F5F9",borderColor:v?"#22C55E":D?"#EF4444":z?"#FACC15":"#E2E8F0",scale:z?1.05:1},style:{...se.activityBlock,left:`${T.start*12.5}%`,width:`${(T.end-T.start)*12.5}%`,top:`${$*40}px`,boxShadow:z?"0 0 15px rgba(250, 204, 21, 0.4)":"none"},className:z?"pulse-glow":"",children:e.jsxs("span",{style:{fontWeight:"bold",color:v?"#166534":D?"#991B1B":"#1E293B"},children:["Meeting ",T.id," (",T.start,"-",T.end,")"]})},T.id+$)})})]}),e.jsxs("div",{style:se.legend,children:[e.jsxs("div",{style:se.legendItem,children:[e.jsx("div",{style:{...se.colorBox,background:"#DCFCE7",border:"1px solid #22C55E"}})," Selected"]}),e.jsxs("div",{style:se.legendItem,children:[e.jsx("div",{style:{...se.colorBox,background:"#FEE2E2",border:"1px solid #EF4444"}})," Rejected"]}),e.jsxs("div",{style:se.legendItem,children:[e.jsx("div",{style:{...se.colorBox,background:"#FEF9C3",border:"1px solid #FACC15"}})," Current"]})]}),e.jsxs("div",{style:se.controls,children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx("button",{onClick:()=>{B(),l(!1)},disabled:C,style:se.primaryBtn,children:"▶ Start Scheduling! 📅"}),p&&!C&&e.jsx("div",{className:"tooltip-hint",style:{bottom:"110%",left:"50%"},children:"Let's optimize the room! ✨"})]}),e.jsx("button",{onClick:()=>{H(),l(!1)},disabled:C||u>=t.length,style:se.secondaryBtn,children:"⏭ Next Meeting"}),e.jsx("button",{onClick:y,style:se.dangerBtn,children:"↺ Reset"})]})]}),e.jsxs("div",{style:se.card,children:[e.jsxs("div",{style:se.codeHeader,children:[e.jsx("h3",{style:{margin:0},children:"Solution Code"}),e.jsx("div",{style:se.langSelector,children:["python","javascript","cpp"].map(T=>e.jsx("button",{onClick:()=>r(T),style:{...se.langBtn,background:A===T?"#4F46E5":"transparent",color:A===T?"#fff":"#64748B"},children:T==="cpp"?"C++":T.charAt(0).toUpperCase()+T.slice(1)},T))})]}),e.jsx("pre",{style:se.pre,children:e.jsx("code",{children:M[A]})})]})]})},se={container:{display:"flex",flexDirection:"column",gap:"2rem",padding:"1rem"},card:{background:"white",borderRadius:"16px",padding:"30px",boxShadow:"0 8px 20px rgba(0,0,0,0.06)"},cardTitle:{margin:"0 0 10px 0",fontSize:"1.5rem",fontWeight:"800",color:"#1E293B"},cardDesc:{margin:"0 0 20px 0",color:"#64748B",lineHeight:"1.6"},messageBox:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",marginBottom:"30px",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center"},timelineContainer:{position:"relative",width:"100%",height:"300px",background:"#F8FAFC",borderRadius:"12px",border:"1px solid #E2E8F0",padding:"40px 20px 20px"},timeRuler:{position:"absolute",top:"10px",left:"20px",right:"20px",display:"flex",justifyContent:"space-between",borderBottom:"1px solid #E2E8F0",paddingBottom:"5px"},timeMark:{fontSize:"0.75rem",color:"#94A3B8",fontWeight:"bold"},slotsArea:{position:"relative",height:"100%",marginTop:"10px"},activityBlock:{position:"absolute",height:"34px",borderRadius:"8px",border:"2px solid",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem",whiteSpace:"nowrap",overflow:"hidden"},legend:{display:"flex",gap:"20px",justifyContent:"center",marginTop:"20px"},legendItem:{display:"flex",alignItems:"center",gap:"8px",fontSize:"0.9rem",color:"#64748B"},colorBox:{width:"16px",height:"16px",borderRadius:"4px"},controls:{display:"flex",gap:"12px",justifyContent:"center",marginTop:"30px"},primaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer"},secondaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer"},dangerBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer"},codeHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"},langSelector:{display:"flex",gap:"8px",background:"#F1F5F9",padding:"4px",borderRadius:"10px"},langBtn:{border:"none",padding:"4px 12px",borderRadius:"6px",fontSize:"0.85rem",fontWeight:"600",cursor:"pointer",transition:"all 0.2s"},pre:{background:"#0F172A",color:"#E2E8F0",padding:"20px",borderRadius:"12px",overflowX:"auto",fontSize:"0.9rem",lineHeight:"1.6",fontFamily:"monospace"}},Et=[25,10,5,1],Nr=()=>{const[t,n]=i.useState(63),[a,d]=i.useState(63),[o,x]=i.useState([]),[u,b]=i.useState(null),[C,R]=i.useState(!1),[I,j]=i.useState("Welcome! Let's return the change using the fewest coins possible."),[A,r]=i.useState("javascript"),{showFeedback:c}=le(),[p,l]=i.useState(!0),y=()=>{d(t),x([]),b(null),R(!1),j("Reset complete. Enter a target amount or start the simulation.")},B=()=>{if(a<=0){R(!1),j(`Finished! Returned change using ${o.length} coins.`),c("Success! Change returned 🪙🚀","success");return}const M=Et.find(T=>T<=a);M?(b(M),j(`Step: Largest coin ≤ ${a} is ${M}. Subtracting it...`),c(`Picking ${M}¢ coin! 🎯`),setTimeout(()=>{x(T=>[...T,M]),d(T=>T-M),b(null)},800)):(R(!1),j("Cannot make exact change with available denominations."))};i.useEffect(()=>{let M;return C&&a>0&&(M=setTimeout(B,1500)),()=>clearTimeout(M)},[C,a,o]);const H={python:`def getChange(amount):
    coins = [25, 10, 5, 1]
    result = []
    
    for coin in coins:
        # Pick the largest coin that fits
        while amount >= coin:
            amount -= coin
            result.append(coin)
            
    return result`,javascript:`function getChange(amount) {
    const coins = [25, 10, 5, 1];
    const result = [];
    
    for (let coin of coins) {
        // Pick the largest coin that fits
        while (amount >= coin) {
            amount -= coin;
            result.push(coin);
        }
    }
    return result;
}`,cpp:`vector<int> getChange(int amount) {
    int coins[] = {25, 10, 5, 1};
    vector<int> result;
    
    for (int coin : coins) {
        // Pick the largest coin that fits
        while (amount >= coin) {
            amount -= coin;
            result.push_back(coin);
        }
    }
    return result;
}`};return e.jsxs("div",{style:ae.container,children:[e.jsxs("div",{style:ae.card,children:[e.jsx("h3",{style:ae.cardTitle,children:"Coin Change — Fast Vending Machine"}),e.jsxs("p",{style:ae.cardDesc,children:["Greedy choice: Always pick the ",e.jsx("strong",{children:"largest possible coin"})," first to minimize the total number of coins quickly."]}),e.jsx("div",{style:ae.messageBox,children:I}),e.jsxs("div",{style:ae.vendingMachine,children:[e.jsxs("div",{style:ae.displayArea,children:[e.jsxs("div",{style:ae.remainingVal,children:[e.jsx("span",{style:{fontSize:"1rem",color:"#94A3B8"},children:"REMAINING"}),e.jsxs(q.div,{initial:{scale:1.2,color:"#FACC15"},animate:{scale:1,color:"#3B82F6"},style:{fontSize:"3rem",fontWeight:"900"},children:["¢",a]},a)]}),e.jsx("div",{style:ae.coinVault,children:e.jsx(X,{children:o.map((M,T)=>e.jsx(q.div,{initial:{y:-50,opacity:0,scale:0},animate:{y:0,opacity:1,scale:1},style:{...ae.coin,background:"#10B981",boxShadow:"0 4px 0 #059669"},children:M},T))})})]}),e.jsx("div",{style:ae.coinSlots,children:Et.map(M=>e.jsxs(q.div,{animate:{scale:u===M?1.15:1,backgroundColor:u===M?"#FEF9C3":"#F1F5F9",borderColor:u===M?"#FACC15":"#E2E8F0",boxShadow:u===M?"0 0 15px rgba(250, 204, 21, 0.4)":"none"},className:u===M?"pulse-glow":"",style:ae.slot,children:[e.jsx("div",{style:{...ae.coin,background:"#F59E0B",marginBottom:"8px"},children:M}),u===M&&e.jsx(q.span,{initial:{opacity:0},animate:{opacity:1},style:ae.bestLabel,children:"BEST CHOICE"})]},M))})]}),e.jsxs("div",{style:ae.controls,children:[e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e.jsx("span",{style:{fontWeight:"bold"},children:"Target:"}),e.jsx("input",{type:"number",value:t,onChange:M=>{const T=parseInt(M.target.value)||0;n(T),d(T)},disabled:C||o.length>0,style:ae.input})]}),e.jsxs("div",{style:{position:"relative"},children:[e.jsx("button",{onClick:()=>{R(!0),l(!1)},disabled:C||a<=0,style:ae.primaryBtn,children:"▶ Give Change! 🪙"}),p&&!C&&e.jsx("div",{className:"tooltip-hint",style:{bottom:"110%",left:"50%"},children:"Let's be greedy! ✨"})]}),e.jsx("button",{onClick:()=>{B(),l(!1)},disabled:C||a<=0,style:ae.secondaryBtn,children:"⏭ Next Coin"}),e.jsx("button",{onClick:y,style:ae.dangerBtn,children:"↺ Reset"})]})]}),e.jsxs("div",{style:ae.card,children:[e.jsxs("div",{style:ae.codeHeader,children:[e.jsx("h3",{style:{margin:0},children:"Solution Code"}),e.jsx("div",{style:ae.langSelector,children:["python","javascript","cpp"].map(M=>e.jsx("button",{onClick:()=>r(M),style:{...ae.langBtn,background:A===M?"#4F46E5":"transparent",color:A===M?"#fff":"#64748B"},children:M==="cpp"?"C++":M.charAt(0).toUpperCase()+M.slice(1)},M))})]}),e.jsx("pre",{style:ae.pre,children:e.jsx("code",{children:H[A]})})]})]})},ae={container:{display:"flex",flexDirection:"column",gap:"2rem",padding:"1rem"},card:{background:"white",borderRadius:"16px",padding:"30px",boxShadow:"0 8px 20px rgba(0,0,0,0.06)"},cardTitle:{margin:"0 0 10px 0",fontSize:"1.5rem",fontWeight:"800",color:"#1E293B"},cardDesc:{margin:"0 0 20px 0",color:"#64748B",lineHeight:"1.6"},messageBox:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",marginBottom:"30px",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center"},vendingMachine:{background:"#F8FAFC",borderRadius:"16px",border:"2px solid #E2E8F0",padding:"30px",display:"flex",flexDirection:"column",gap:"30px"},displayArea:{display:"flex",justifyContent:"space-around",alignItems:"center",padding:"20px",background:"white",borderRadius:"12px",boxShadow:"inset 0 2px 4px rgba(0,0,0,0.05)"},remainingVal:{textAlign:"center"},coinVault:{display:"flex",flexWrap:"wrap",gap:"10px",maxWidth:"300px",minHeight:"60px",padding:"10px",justifyContent:"center"},coin:{width:"44px",height:"44px",borderRadius:"50%",border:"2px solid rgba(255,255,255,0.3)",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"900",fontSize:"1.1rem"},coinSlots:{display:"flex",justifyContent:"center",gap:"20px"},slot:{flex:1,padding:"15px",borderRadius:"12px",border:"2px dashed #CBD5E1",display:"flex",flexDirection:"column",alignItems:"center",position:"relative"},bestLabel:{fontSize:"0.65rem",fontWeight:"800",color:"#F59E0B",marginTop:"4px"},controls:{display:"flex",gap:"15px",justifyContent:"center",marginTop:"30px",alignItems:"center"},input:{width:"80px",padding:"8px",borderRadius:"6px",border:"1px solid #E2E8F0",textAlign:"center",fontWeight:"bold"},primaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer"},secondaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer"},dangerBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer"},codeHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"},langSelector:{display:"flex",gap:"8px",background:"#F1F5F9",padding:"4px",borderRadius:"10px"},langBtn:{border:"none",padding:"4px 12px",borderRadius:"6px",fontSize:"0.85rem",fontWeight:"600",cursor:"pointer",transition:"all 0.2s"},pre:{background:"#0F172A",color:"#E2E8F0",padding:"20px",borderRadius:"12px",overflowX:"auto",fontSize:"0.9rem",lineHeight:"1.6",fontFamily:"monospace"}},Lr=[{id:1,name:"Gold Dust",value:100,weight:20},{id:2,name:"Silver Bars",value:60,weight:10},{id:3,name:"Rare Spices",value:120,weight:30}],_r=()=>{const[t,n]=i.useState(50),[a,d]=i.useState(50),[o,x]=i.useState([]),[u,b]=i.useState([]),[C,R]=i.useState(0),[I,j]=i.useState(-1),[A,r]=i.useState([]),[c,p]=i.useState(!1),{showFeedback:l}=le(),[y,B]=i.useState(!0),[H,M]=i.useState("Step 1: Calculate Value/Weight ratio for each item."),[T,$]=i.useState("javascript");i.useEffect(()=>{const h=Lr.map(s=>({...s,ratio:s.value/s.weight}));x(h)},[]);const v=()=>{d(t),R(0),j(-1),r([]),p(!1),M("Reset complete. Adjust capacity or start the optimizer.")},D=()=>{const h=[...o].sort((s,m)=>m.ratio-s.ratio);b(h),r([]),R(0),d(t),j(0),p(!0),M("Step 2: Sort items by Value/Weight ratio (Greedy Choice).")},z=()=>{if(I===-1){D();return}if(I>=u.length||a<=0){p(!1),M(`Finished! Total Value in bag: $${C.toFixed(2)}.`),l("Success! Knapsack optimized 🎒🏆","success");return}const h=u[I];let s,m,k;h.weight<=a?(s=h.weight,m=h.value,k=1,M(`Taking 100% of ${h.name}. Value added: $${m}.`)):(k=a/h.weight,s=a,m=h.value*k,M(`Only ${a}kg space left! Taking ${Math.round(k*100)}% of ${h.name}.`),l(`Took a fraction of ${h.name}! ⚖️`)),r(S=>[...S,{...h,takenWeight:s,takenValue:m,fraction:k}]),R(S=>S+m),d(S=>S-s),j(S=>S+1)};i.useEffect(()=>{let h;return c&&I>=0&&I<u.length&&a>0&&(h=setTimeout(z,2e3)),()=>clearTimeout(h)},[c,I]);const E={python:`def fractionalKnapsack(capacity, items):
    # Sort by density (value/weight)
    items.sort(key=lambda x: x.value / x.weight, reverse=True)
    
    total_value = 0
    for item in items:
        if capacity >= item.weight:
            capacity -= item.weight
            total_value += item.value
        else:
            # Take fraction if capacity is less
            total_value += item.value * (capacity / item.weight)
            break
    return total_value`,javascript:`function fractionalKnapsack(capacity, items) {
    // Sort by ratio
    items.sort((a, b) => (b.value/b.weight) - (a.value/a.weight));
    
    let totalValue = 0;
    for (let item of items) {
        if (capacity >= item.weight) {
            capacity -= item.weight;
            totalValue += item.value;
        } else {
            // Take fraction
            totalValue += item.value * (capacity / item.weight);
            break;
        }
    }
    return totalValue;
}`,cpp:`struct Item { int val, wt; };

bool compare(Item a, Item b) {
    return (double)a.val/a.wt > (double)b.val/b.wt;
}

double knapsack(int W, Item arr[], int n) {
    sort(arr, arr + n, compare);
    double res = 0.0;
    for (int i = 0; i < n; i++) {
        if (arr[i].wt <= W) {
            W -= arr[i].wt; res += arr[i].val;
        } else {
            res += arr[i].val * ((double)W / arr[i].wt);
            break;
        }
    }
    return res;
}`};return e.jsxs("div",{style:G.container,children:[e.jsxs("div",{style:G.card,children:[e.jsx("h3",{style:G.cardTitle,children:"Fractional Knapsack — Treasure Bag Optimizer"}),e.jsxs("p",{style:G.cardDesc,children:["Unlike 0/1 knapsack, you can take ",e.jsx("strong",{children:"fractions"})," of items. Greedy choice: Always pick the item with the ",e.jsx("strong",{children:"highest value density (Value / Weight)"}),"."]}),e.jsx("div",{style:G.messageBox,children:H}),e.jsxs("div",{style:G.optimizerView,children:[e.jsx("div",{style:G.itemsGrid,children:o.map((h,s)=>{const m=u[I]?.id===h.id,k=A.some(S=>S.id===h.id);return e.jsxs(q.div,{animate:{scale:m?1.05:1,borderColor:m?"#FACC15":"#E2E8F0",backgroundColor:k?"#F1F5F9":"white",opacity:k?.6:1},className:m?"pulse-glow":"",style:{...G.itemCard,boxShadow:m?"0 0 15px rgba(250, 204, 21, 0.4)":"0 2px 4px rgba(0,0,0,0.02)"},children:[e.jsxs("div",{style:G.itemHeader,children:[e.jsx("span",{style:G.itemName,children:h.name}),e.jsxs("span",{style:G.itemRatio,children:["$",h.ratio,"/kg"]})]}),e.jsxs("div",{style:G.itemStats,children:[e.jsxs("span",{children:["Value: $",h.value]}),e.jsxs("span",{children:["Weight: ",h.weight,"kg"]})]}),m&&e.jsx("div",{style:G.pointer,children:"FOCUS"})]},h.id)})}),e.jsx("div",{style:G.bagArea,children:e.jsxs("div",{style:G.bagVisual,children:[e.jsx(X,{children:A.map((h,s)=>e.jsxs(q.div,{initial:{y:50,opacity:0},animate:{y:0,opacity:1},style:{...G.bagLayer,height:`${h.takenWeight/t*100}%`,background:h.fraction===1?"#10B981":"#A855F7"},children:[h.name," (",Math.round(h.fraction*100),"%)"]},s))}),e.jsxs("div",{style:G.bagInfo,children:[e.jsxs("div",{style:{fontSize:"1.5rem",fontWeight:"900"},children:["$",C.toFixed(1)]}),e.jsxs("div",{style:{fontSize:"0.8rem"},children:[Math.max(0,a),"kg left"]})]})]})})]}),e.jsxs("div",{style:G.legend,children:[e.jsxs("div",{style:G.legendItem,children:[e.jsx("div",{style:{...G.colorBox,background:"#10B981"}})," Full Item"]}),e.jsxs("div",{style:G.legendItem,children:[e.jsx("div",{style:{...G.colorBox,background:"#A855F7"}})," Fractional Item"]}),e.jsxs("div",{style:G.legendItem,children:[e.jsx("div",{style:{...G.colorBox,background:"#FACC15"}})," Current Best Ratio"]})]}),e.jsxs("div",{style:G.controls,children:[e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e.jsx("span",{style:{fontWeight:"bold"},children:"Bag Capacity (kg):"}),e.jsx("input",{type:"number",value:t,onChange:h=>{const s=parseInt(h.target.value)||0;n(s),d(s)},disabled:c||A.length>0,style:G.input})]}),e.jsxs("div",{style:{position:"relative"},children:[e.jsx("button",{onClick:()=>{D(),B(!1)},disabled:c||I>=u.length&&I!==-1,style:G.primaryBtn,children:"▶ Start Optimizer 🚀"}),y&&!c&&e.jsx("div",{className:"tooltip-hint",style:{bottom:"110%",left:"50%"},children:"Let's pack the most valuable items! ✨"})]}),e.jsx("button",{onClick:()=>{z(),B(!1)},disabled:c||I>=u.length&&I!==-1,style:G.secondaryBtn,children:"⏭ Next Step"}),e.jsx("button",{onClick:v,style:G.dangerBtn,children:"↺ Reset"})]})]}),e.jsxs("div",{style:G.card,children:[e.jsxs("div",{style:G.codeHeader,children:[e.jsx("h3",{style:{margin:0},children:"Solution Code"}),e.jsx("div",{style:G.langSelector,children:["python","javascript","cpp"].map(h=>e.jsx("button",{onClick:()=>$(h),style:{...G.langBtn,background:T===h?"#4F46E5":"transparent",color:T===h?"#fff":"#64748B"},children:h==="cpp"?"C++":h.charAt(0).toUpperCase()+h.slice(1)},h))})]}),e.jsx("pre",{style:G.pre,children:e.jsx("code",{children:E[T]})})]})]})},G={container:{display:"flex",flexDirection:"column",gap:"2rem",padding:"1rem"},card:{background:"white",borderRadius:"16px",padding:"30px",boxShadow:"0 8px 20px rgba(0,0,0,0.06)"},cardTitle:{margin:"0 0 10px 0",fontSize:"1.5rem",fontWeight:"800",color:"#1E293B"},cardDesc:{margin:"0 0 20px 0",color:"#64748B",lineHeight:"1.6"},messageBox:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",marginBottom:"30px",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center"},optimizerView:{display:"flex",gap:"30px",background:"#F8FAFC",padding:"20px",borderRadius:"12px",alignItems:"flex-start"},itemsGrid:{flex:1,display:"flex",flexDirection:"column",gap:"12px"},itemCard:{padding:"15px",borderRadius:"12px",border:"2px solid",position:"relative",boxShadow:"0 2px 4px rgba(0,0,0,0.02)"},itemHeader:{display:"flex",justifyContent:"space-between",marginBottom:"5px"},itemName:{fontWeight:"800",color:"#1E293B"},itemRatio:{color:"#4F46E5",fontSize:"0.85rem",fontWeight:"bold"},itemStats:{display:"flex",gap:"15px",fontSize:"0.85rem",color:"#64748B"},pointer:{position:"absolute",right:"-10px",top:"50%",transform:"translateY(-50%)",background:"#FACC15",color:"#000",fontSize:"0.6rem",fontWeight:"900",padding:"2px 6px",borderRadius:"4px"},bagArea:{width:"250px",display:"flex",justifyContent:"center"},bagVisual:{width:"160px",height:"240px",background:"#E2E8F0",border:"4px solid #94A3B8",borderRadius:"0 0 20px 20px",position:"relative",overflow:"hidden",display:"flex",flexDirection:"column-reverse"},bagLayer:{width:"100%",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.7rem",fontWeight:"bold",borderTop:"2px solid rgba(0,0,0,0.1)"},bagInfo:{position:"absolute",top:"20px",left:0,right:0,textAlign:"center",color:"#475569",zIndex:10,background:"rgba(255,255,255,0.8)",padding:"5px"},legend:{display:"flex",gap:"20px",justifyContent:"center",marginTop:"20px"},legendItem:{display:"flex",alignItems:"center",gap:"8px",fontSize:"0.9rem",color:"#64748B"},colorBox:{width:"16px",height:"16px",borderRadius:"4px"},controls:{display:"flex",gap:"15px",justifyContent:"center",marginTop:"30px",alignItems:"center",flexWrap:"wrap"},input:{width:"70px",padding:"8px",borderRadius:"6px",border:"1px solid #E2E8F0",textAlign:"center",fontWeight:"bold"},primaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer"},secondaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer"},dangerBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer"},codeHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"},langSelector:{display:"flex",gap:"8px",background:"#F1F5F9",padding:"4px",borderRadius:"10px"},langBtn:{border:"none",padding:"4px 12px",borderRadius:"6px",fontSize:"0.85rem",fontWeight:"600",cursor:"pointer",transition:"all 0.2s"},pre:{background:"#0F172A",color:"#E2E8F0",padding:"20px",borderRadius:"12px",overflowX:"auto",fontSize:"0.9rem",lineHeight:"1.6",fontFamily:"monospace"}},lt=[{char:"A",freq:5},{char:"B",freq:9},{char:"C",freq:12},{char:"D",freq:13},{char:"E",freq:16},{char:"F",freq:45}],zt=()=>lt.map((t,n)=>({id:n,char:t.char,freq:t.freq,left:null,right:null,isLeaf:!0})),tt=(t,n="",a={})=>t?t.isLeaf?(a[t.char]=n||"0",a):(tt(t.left,n+"0",a),tt(t.right,n+"1",a),a):a,dt=({node:t,depth:n=0,edgeLabel:a})=>{if(!t)return null;const d=t.isLeaf;return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},children:[a!==void 0&&e.jsx("span",{style:{fontSize:"0.75rem",fontWeight:"800",color:"#4F46E5"},children:a}),e.jsxs(q.div,{initial:{scale:0,opacity:0},animate:{scale:1,opacity:1},transition:{duration:.4,delay:n*.05},style:{width:d?"52px":"48px",height:d?"52px":"48px",borderRadius:d?"10px":"50%",background:d?"#10B981":"#3B82F6",color:"white",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontWeight:"800",fontSize:d?"0.85rem":"0.8rem",boxShadow:"0 4px 10px rgba(0,0,0,0.12)",border:"2px solid rgba(255,255,255,0.3)"},children:[d&&e.jsx("span",{children:t.char}),e.jsx("span",{style:{fontSize:"0.7rem"},children:t.freq})]}),!d&&e.jsxs("div",{style:{display:"flex",gap:Math.max(8,60-n*12)+"px",marginTop:"4px"},children:[e.jsx(dt,{node:t.left,depth:n+1,edgeLabel:"0"}),e.jsx(dt,{node:t.right,depth:n+1,edgeLabel:"1"})]})]})},Te=[{q:"Why does Huffman Coding use a greedy strategy?",options:["It always picks the two smallest-frequency nodes to merge","It randomly picks two nodes","It picks the largest node first","It doesn't use greedy"],answer:0},{q:"Why are frequent characters given shorter codes?",options:["To increase file size","To reduce total encoded length","Because they are more important","No particular reason"],answer:1},{q:"What is a prefix code?",options:["A code where every code starts with 0","A code where no codeword is a prefix of another","A code that has fixed-length","A code with only single-bit values"],answer:1},{q:"Why does Huffman coding produce optimal compression?",options:["It always uses 8-bit codes","It minimizes the weighted path length of the code tree","It removes all duplicate characters","It uses run-length encoding"],answer:1}],Or=()=>{const[t,n]=i.useState(zt),[a,d]=i.useState([]),[o,x]=i.useState(null),[u,b]=i.useState({}),[C,R]=i.useState([]),[I,j]=i.useState(!1),{showFeedback:A}=le(),[r,c]=i.useState(!0),[p,l]=i.useState("Characters with frequencies are ready. Merge the two smallest nodes each step."),[y,B]=i.useState("javascript"),[H,M]=i.useState(lt.length),[T,$]=i.useState(0),[v,D]=i.useState(null),[z,E]=i.useState(!1),[h]=i.useState("FACE"),s=()=>{n(zt()),d([]),x(null),b({}),R([]),j(!1),l("Reset! Characters with frequencies are ready."),M(lt.length),$(0),D(null),E(!1)},m=i.useCallback(()=>{n(f=>{if(f.length<=1){const te=f[0];return x(te),b(tt(te)),j(!1),l("Tree complete! Binary codes have been generated."),R([]),f}const F=[...f].sort((te,Ie)=>te.freq-Ie.freq),w=F[0],W=F[1];R([w.id,W.id]);const P={id:H,char:null,freq:w.freq+W.freq,left:w,right:W,isLeaf:!1};M(te=>te+1);const U=[...F.slice(2),P].sort((te,Ie)=>te.freq-Ie.freq);return d(te=>[...te,{a:w.isLeaf?w.char:w.freq,b:W.isLeaf?W.char:W.freq,result:P.freq}]),l(`Merged ${w.isLeaf?w.char:"("+w.freq+")"} (${w.freq}) + ${W.isLeaf?W.char:"("+W.freq+")"} (${W.freq}) → ${P.freq}. ${U.length===1?"Done!":U.length+" nodes remain."}`),U.length===1?(b(tt(P)),j(!1),R([]),A("Success! Huffman tree complete 🌳🎯","success")):A(`Merged ${w.isLeaf?w.char:"node"} and ${W.isLeaf?W.char:"node"}! 🔗`),U})},[H]),k=()=>{j(!0);const f=()=>{n(F=>F.length<=1?(j(!1),F):(setTimeout(f,1200),F)),m()};f()},S={python:`import heapq

def huffman(freq):
    heap = [[f, [c, '']] for c, f in freq.items()]
    heapq.heapify(heap)
    
    while len(heap) > 1:
        lo = heapq.heappop(heap)
        hi = heapq.heappop(heap)
        for pair in lo[1:]:
            pair[1] = '0' + pair[1]
        for pair in hi[1:]:
            pair[1] = '1' + pair[1]
        heapq.heappush(heap, [lo[0] + hi[0]] + lo[1:] + hi[1:])
    
    return sorted(heapq.heappop(heap)[1:], key=lambda p: (len(p[-1]), p))`,javascript:`class Node {
    constructor(char, freq, left = null, right = null) {
        this.char = char;
        this.freq = freq;
        this.left = left;
        this.right = right;
    }
}

function huffman(freq) {
    let nodes = Object.entries(freq)
        .map(([c, f]) => new Node(c, f));
    
    while (nodes.length > 1) {
        nodes.sort((a, b) => a.freq - b.freq);
        const left = nodes.shift();
        const right = nodes.shift();
        const parent = new Node(null, left.freq + right.freq, left, right);
        nodes.push(parent);
    }
    
    const codes = {};
    function traverse(node, code = '') {
        if (!node.left && !node.right) {
            codes[node.char] = code || '0';
            return;
        }
        traverse(node.left, code + '0');
        traverse(node.right, code + '1');
    }
    traverse(nodes[0]);
    return codes;
}`,cpp:`struct Node {
    char ch; int freq;
    Node *left, *right;
};

struct Compare {
    bool operator()(Node* a, Node* b) {
        return a->freq > b->freq;
    }
};

void buildCodes(Node* root, string code,
                map<char,string>& codes) {
    if (!root) return;
    if (!root->left && !root->right)
        codes[root->ch] = code;
    buildCodes(root->left, code + "0", codes);
    buildCodes(root->right, code + "1", codes);
}

map<char,string> huffman(map<char,int>& freq) {
    priority_queue<Node*, vector<Node*>, Compare> pq;
    for (auto& [c,f] : freq)
        pq.push(new Node{c, f, nullptr, nullptr});
    while (pq.size() > 1) {
        auto l = pq.top(); pq.pop();
        auto r = pq.top(); pq.pop();
        pq.push(new Node{'\\0', l->freq+r->freq, l, r});
    }
    map<char,string> codes;
    buildCodes(pq.top(), "", codes);
    return codes;
}`},g=Object.keys(u).length>0?h.split("").map(f=>u[f]||"?").join(""):"";return e.jsxs("div",{style:ee.container,children:[e.jsxs("div",{style:ee.card,children:[e.jsx("h3",{style:ee.cardTitle,children:"Huffman Coding — Signal Compression Network"}),e.jsxs("p",{style:ee.cardDesc,children:["Assign ",e.jsx("strong",{children:"shorter codes"})," to frequent characters and ",e.jsx("strong",{children:"longer codes"})," to rare ones. The greedy choice merges the two smallest-frequency nodes at each step, building an optimal prefix-free binary tree."]}),e.jsx("div",{style:ee.messageBox,children:p}),e.jsxs("div",{style:{marginBottom:"24px"},children:[e.jsx("h4",{style:{margin:"0 0 12px",color:"#1E293B"},children:"Priority Queue"}),e.jsx("div",{style:ee.queueRow,children:e.jsx(X,{children:[...t].sort((f,F)=>f.freq-F.freq).map(f=>e.jsxs(q.div,{layout:!0,initial:{scale:0},animate:{scale:1,backgroundColor:C.includes(f.id)?"#FACC15":f.isLeaf?"#F1F5F9":"#DBEAFE",borderColor:C.includes(f.id)?"#FACC15":"#E2E8F0"},exit:{scale:0,opacity:0},className:C.includes(f.id)?"pulse-glow":"",style:{...ee.queueNode,boxShadow:C.includes(f.id)?"0 0 15px rgba(250, 204, 21, 0.4)":"none"},children:[e.jsx("span",{style:{fontWeight:"900",color:"#1E293B"},children:f.isLeaf?f.char:"⊕"}),e.jsx("span",{style:{fontSize:"0.75rem",color:"#64748B"},children:f.freq})]},f.id))})})]}),o&&e.jsxs("div",{style:{marginBottom:"24px"},children:[e.jsx("h4",{style:{margin:"0 0 12px",color:"#1E293B"},children:"Huffman Tree"}),e.jsx("div",{style:ee.treeContainer,children:e.jsx(dt,{node:o})})]}),Object.keys(u).length>0&&e.jsxs("div",{style:{marginBottom:"24px"},children:[e.jsx("h4",{style:{margin:"0 0 12px",color:"#1E293B"},children:"Generated Binary Codes"}),e.jsx("div",{style:ee.codesGrid,children:Object.entries(u).sort((f,F)=>f[1].length-F[1].length).map(([f,F])=>e.jsxs("div",{style:ee.codeEntry,children:[e.jsx("span",{style:{fontWeight:"900",fontSize:"1.1rem",color:"#10B981"},children:f}),e.jsx("span",{style:{fontFamily:"monospace",color:"#4F46E5",fontWeight:"700"},children:F})]},f))}),e.jsxs("div",{style:ee.encodeDemo,children:[e.jsx("h4",{style:{margin:"0 0 8px",color:"#1E293B"},children:"Message Encoding Demo"}),e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center",flexWrap:"wrap"},children:[e.jsxs("span",{style:{fontWeight:"700"},children:['"',h,'"']}),e.jsx("span",{style:{color:"#94A3B8"},children:"→"}),e.jsx("span",{style:{fontFamily:"monospace",background:"#0F172A",color:"#22D3EE",padding:"6px 14px",borderRadius:"8px",fontWeight:"700",letterSpacing:"2px"},children:g}),e.jsxs("span",{style:{color:"#64748B",fontSize:"0.85rem"},children:["(",g.length," bits)"]})]})]})]}),e.jsxs("div",{style:ee.legend,children:[e.jsxs("div",{style:ee.legendItem,children:[e.jsx("div",{style:{...ee.colorBox,background:"#FACC15"}})," Selected"]}),e.jsxs("div",{style:ee.legendItem,children:[e.jsx("div",{style:{...ee.colorBox,background:"#3B82F6"}})," Merged"]}),e.jsxs("div",{style:ee.legendItem,children:[e.jsx("div",{style:{...ee.colorBox,background:"#10B981"}})," Leaf (Final)"]})]}),e.jsxs("div",{style:ee.controls,children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx("button",{onClick:()=>{m(),c(!1)},disabled:I||t.length<=1,style:{...ee.secondaryBtn,opacity:I||t.length<=1?.5:1},children:"▶ Build Next Merge 🔗"}),r&&!I&&t.length>1&&e.jsx("div",{className:"tooltip-hint",style:{bottom:"110%",left:"50%"},children:"Merge the two smallest nodes! ✨"})]}),e.jsx("button",{onClick:()=>{k(),c(!1)},disabled:I||t.length<=1,style:{...ee.primaryBtn,opacity:I||t.length<=1?.5:1},children:"⚡ Auto Build Tree"}),e.jsx("button",{onClick:s,style:ee.dangerBtn,children:"↺ Reset"})]})]}),e.jsxs("div",{style:ee.card,children:[e.jsxs("div",{style:ee.codeHeader,children:[e.jsx("h3",{style:{margin:0},children:"Solution Code"}),e.jsx("div",{style:ee.langSelector,children:["python","javascript","cpp"].map(f=>e.jsx("button",{onClick:()=>B(f),style:{...ee.langBtn,background:y===f?"#4F46E5":"transparent",color:y===f?"#fff":"#64748B"},children:f==="cpp"?"C++":f.charAt(0).toUpperCase()+f.slice(1)},f))})]}),e.jsx("pre",{style:ee.pre,children:e.jsx("code",{children:S[y]})})]}),e.jsxs("div",{style:ee.card,children:[e.jsx("h3",{style:{margin:"0 0 16px",fontSize:"1.3rem",color:"#1E293B"},children:"🧠 Knowledge Check"}),z?e.jsxs("div",{children:[e.jsxs("p",{style:{fontWeight:"700",color:"#1E293B",marginBottom:"12px"},children:["Q",T+1,": ",Te[T].q]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:Te[T].options.map((f,F)=>e.jsx("button",{onClick:()=>D(F),disabled:v!==null,style:{textAlign:"left",padding:"10px 16px",borderRadius:"8px",border:"2px solid",borderColor:v===null?"#E2E8F0":F===Te[T].answer?"#22C55E":v===F?"#EF4444":"#E2E8F0",background:v!==null&&F===Te[T].answer?"#DCFCE7":v===F&&F!==Te[T].answer?"#FEE2E2":"white",cursor:v!==null?"default":"pointer",fontWeight:"500",fontSize:"0.95rem"},children:f},F))}),v!==null&&e.jsxs("div",{style:{marginTop:"16px"},children:[e.jsx("p",{style:{color:v===Te[T].answer?"#22C55E":"#EF4444",fontWeight:"700"},children:v===Te[T].answer?"✅ Correct!":"❌ Incorrect."}),T<Te.length-1&&e.jsx("button",{onClick:()=>{$(f=>f+1),D(null)},style:ee.secondaryBtn,children:"Next Question →"})]})]}):e.jsx("button",{onClick:()=>E(!0),style:ee.primaryBtn,children:"Start Quiz"})]})]})},ee={container:{display:"flex",flexDirection:"column",gap:"2rem",padding:"1rem"},card:{background:"white",borderRadius:"16px",padding:"30px",boxShadow:"0 8px 20px rgba(0,0,0,0.06)"},cardTitle:{margin:"0 0 10px 0",fontSize:"1.5rem",fontWeight:"800",color:"#1E293B"},cardDesc:{margin:"0 0 20px 0",color:"#64748B",lineHeight:"1.6"},messageBox:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",marginBottom:"30px",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center"},queueRow:{display:"flex",gap:"12px",flexWrap:"wrap",justifyContent:"center"},queueNode:{width:"56px",height:"56px",borderRadius:"10px",border:"2px solid",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"2px"},treeContainer:{display:"flex",justifyContent:"center",padding:"20px",background:"#F8FAFC",borderRadius:"12px",border:"1px solid #E2E8F0",overflowX:"auto",minHeight:"180px"},codesGrid:{display:"flex",gap:"12px",flexWrap:"wrap",justifyContent:"center"},codeEntry:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px",background:"#F8FAFC",padding:"10px 18px",borderRadius:"10px",border:"1px solid #E2E8F0"},encodeDemo:{marginTop:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"12px",border:"1px solid #E2E8F0"},legend:{display:"flex",gap:"20px",justifyContent:"center",marginTop:"20px",marginBottom:"10px"},legendItem:{display:"flex",alignItems:"center",gap:"8px",fontSize:"0.9rem",color:"#64748B"},colorBox:{width:"16px",height:"16px",borderRadius:"4px"},controls:{display:"flex",gap:"12px",justifyContent:"center",marginTop:"20px"},primaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer"},secondaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer"},dangerBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer"},codeHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"},langSelector:{display:"flex",gap:"8px",background:"#F1F5F9",padding:"4px",borderRadius:"10px"},langBtn:{border:"none",padding:"4px 12px",borderRadius:"6px",fontSize:"0.85rem",fontWeight:"600",cursor:"pointer",transition:"all 0.2s"},pre:{background:"#0F172A",color:"#E2E8F0",padding:"20px",borderRadius:"12px",overflowX:"auto",fontSize:"0.9rem",lineHeight:"1.6",fontFamily:"monospace",margin:0}},Vr=t=>new Promise(n=>setTimeout(n,t)),Qr=[{id:"activity-selection",title:"Activity Selection Problem",difficulty:"Easy",tag:"📅",description:"Given N activities with start and finish times, select the maximum number of non-overlapping activities.",example:"start=[1,3,0,5,8,5] finish=[2,4,6,7,9,9] => 4 activities",algorithm:"Sort activities by finish time. Pick the first activity, then always pick the next activity whose start time ≥ the last selected finish time.",python:`def activitySelection(start, finish):
    n = len(start)
    activities = sorted(zip(start, finish),
                        key=lambda x: x[1])
    selected = [activities[0]]
    last_end = activities[0][1]
    
    for i in range(1, n):
        if activities[i][0] >= last_end:
            selected.append(activities[i])
            last_end = activities[i][1]
    
    return selected`,javascript:`function activitySelection(start, finish) {
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
}`,cpp:`struct Activity { int start, end; };

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
}`},{id:"min-platforms",title:"Minimum Platforms for Trains",difficulty:"Medium",tag:"🚂",description:"Given arrival and departure times of trains, find the minimum number of platforms needed so no train waits.",example:"arr=[9:00,9:40,9:50,11:00] dep=[9:10,12:00,11:20,11:30] => 3",algorithm:"Sort arrivals and departures separately. Use two pointers — when a train arrives before the earliest departure, add a platform; otherwise, free one.",python:`def minPlatforms(arr, dep):
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
    
    return max_plat`,javascript:`function minPlatforms(arr, dep) {
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
}`,cpp:`int minPlatforms(vector<int>& arr,
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
}`},{id:"gas-station",title:"Gas Station Circuit",difficulty:"Medium",tag:"⛽",description:"There are N gas stations in a circle. You start with an empty tank. Find the starting station to complete the circuit, or return -1.",example:"gas=[1,2,3,4,5] cost=[3,4,5,1,2] => start at station 3",algorithm:"Track total surplus and current surplus. If current goes negative, reset start to next station. If total surplus ≥ 0, a solution exists starting from the reset point.",python:`def canCompleteCircuit(gas, cost):
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
    
    return start if total >= 0 else -1`,javascript:`function canCompleteCircuit(gas, cost) {
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
}`,cpp:`int canCompleteCircuit(vector<int>& gas,
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
}`},{id:"jump-game",title:"Jump Game",difficulty:"Medium",tag:"🦘",description:"Given an array where each element is the max jump length from that position, determine if you can reach the last index.",example:"nums=[2,3,1,1,4] => true; nums=[3,2,1,0,4] => false",algorithm:"Track the farthest reachable index. For each position, if it is reachable, update the farthest reach. If farthest ≥ last index, return true.",python:`def canJump(nums):
    farthest = 0
    
    for i in range(len(nums)):
        if i > farthest:
            return False
        farthest = max(farthest, i + nums[i])
    
    return True`,javascript:`function canJump(nums) {
    let farthest = 0;
    
    for (let i = 0; i < nums.length; i++) {
        if (i > farthest) return false;
        farthest = Math.max(farthest, i + nums[i]);
    }
    return true;
}`,cpp:`bool canJump(vector<int>& nums) {
    int farthest = 0;
    
    for (int i = 0; i < nums.size(); i++) {
        if (i > farthest) return false;
        farthest = max(farthest, i + nums[i]);
    }
    return true;
}`},{id:"jump-game-ii",title:"Jump Game II",difficulty:"Medium",tag:"🏃",description:"Given an array where each element is the max jump length, return the minimum number of jumps to reach the last index.",example:"nums=[2,3,1,1,4] => 2 jumps (0→1→4)",algorithm:"Use a BFS-like greedy approach. Track the current jump range end and the farthest reachable. When you pass the current end, increment jumps.",python:`def jump(nums):
    jumps = 0
    current_end = 0
    farthest = 0
    
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == current_end:
            jumps += 1
            current_end = farthest
    
    return jumps`,javascript:`function jump(nums) {
    let jumps = 0, curEnd = 0, farthest = 0;
    
    for (let i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        if (i === curEnd) {
            jumps++;
            curEnd = farthest;
        }
    }
    return jumps;
}`,cpp:`int jump(vector<int>& nums) {
    int jumps = 0, curEnd = 0, farthest = 0;
    
    for (int i = 0; i < nums.size() - 1; i++) {
        farthest = max(farthest, i + nums[i]);
        if (i == curEnd) {
            jumps++;
            curEnd = farthest;
        }
    }
    return jumps;
}`},{id:"partition-labels",title:"Partition Labels",difficulty:"Medium",tag:"🏷️",description:"Partition a string into as many parts as possible so that each letter appears in at most one part. Return the sizes of the parts.",example:'"ababcbacadefegdehijhklij" => [9,7,8]',algorithm:"Record the last occurrence of each character. Iterate and expand the current partition end to the max last-occurrence. When index equals end, cut a partition.",python:`def partitionLabels(s):
    last = {c: i for i, c in enumerate(s)}
    result = []
    start = end = 0
    
    for i, c in enumerate(s):
        end = max(end, last[c])
        if i == end:
            result.append(end - start + 1)
            start = i + 1
    
    return result`,javascript:`function partitionLabels(s) {
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
}`,cpp:`vector<int> partitionLabels(string s) {
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
}`},{id:"min-arrows",title:"Minimum Arrows to Burst Balloons",difficulty:"Medium",tag:"🎯",description:"Given balloon intervals [start, end], find the minimum number of arrows shot vertically to burst all balloons.",example:"points=[[10,16],[2,8],[1,6],[7,12]] => 2 arrows",algorithm:"Sort by end coordinate. Shoot at the end of the first balloon. Skip all balloons that this arrow bursts. Repeat for remaining.",python:`def findMinArrowShots(points):
    points.sort(key=lambda x: x[1])
    arrows = 1
    end = points[0][1]
    
    for i in range(1, len(points)):
        if points[i][0] > end:
            arrows += 1
            end = points[i][1]
    
    return arrows`,javascript:`function findMinArrowShots(points) {
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
}`,cpp:`int findMinArrowShots(
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
}`},{id:"huffman-encoding",title:"Huffman Encoding",difficulty:"Hard",tag:"🌳",description:"Given character frequencies, build a Huffman tree and generate optimal prefix-free binary codes for each character.",example:"freq={a:5,b:9,c:12,d:13,e:16,f:45} => variable-length codes",algorithm:"Use a min-heap. Repeatedly extract the two smallest nodes, merge them into a new node with combined frequency, and insert back. Repeat until one node remains.",python:`import heapq

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
    
    return sorted(heap[0][1:], key=lambda p: p[1])`,javascript:`function huffmanEncoding(freq) {
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
}`,cpp:`struct Node {
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
}`}],Gr=({title:t,steps:n,initState:a})=>{const[d,o]=i.useState(0),[x,u]=i.useState(!1),[b,C]=i.useState(!1),[R,I]=i.useState(a),j=i.useRef(!1),A=()=>{j.current=!0,setTimeout(()=>{j.current=!1},100),o(0),u(!1),C(!1),I(a)},r=async()=>{j.current=!1,C(!0),u(!1);for(let l=0;l<n.length;l++){if(j.current)return;o(l),I(n[l].state),await Vr(900)}u(!0),C(!1),o(n.length-1)},c=()=>{if(x||b)return;const l=Math.min(d+1,n.length-1);o(l),I(n[l].state),l===n.length-1&&u(!0)},p=n[d];return e.jsxs("div",{style:ze.wrap,children:[e.jsx("div",{style:ze.desc,children:t}),e.jsxs("div",{style:ze.vizArea,children:[e.jsx("div",{style:{display:"flex",gap:"6px",alignItems:"flex-end",justifyContent:"center",flexWrap:"wrap",marginBottom:"12px"},children:R.map((l,y)=>e.jsx("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},children:e.jsx("div",{style:{...ze.cell,backgroundColor:l.color||"#F1F5F9",border:`2px solid ${l.border||"#cbd5e1"}`,minWidth:l.label?"50px":"40px",fontSize:l.label?"0.7rem":"0.9rem"},children:l.label||l.val})},y))}),p&&e.jsx("div",{style:ze.msg,children:p.msg})]}),e.jsxs("div",{style:ze.controls,children:[e.jsx("button",{onClick:r,disabled:b,style:ze.btn("#4F46E5"),children:"▶ Start Animation"}),e.jsx("button",{onClick:c,disabled:b||x,style:ze.btn("#0891b2"),children:"⏭ Next Step"}),e.jsx("button",{onClick:A,style:ze.btn("#ef4444"),children:"↺ Reset"})]})]})},Ur=[{msg:"Meetings: A(1-2) B(3-4) C(0-6) D(5-7) E(8-9). Sort by finish time.",state:[{label:"A 1-2"},{label:"B 3-4"},{label:"C 0-6"},{label:"D 5-7"},{label:"E 8-9"}]},{msg:"Select A (finishes first at 2). ✅",state:[{label:"A 1-2",color:"#DCFCE7",border:"#22C55E"},{label:"B 3-4"},{label:"C 0-6"},{label:"D 5-7"},{label:"E 8-9"}]},{msg:"B starts at 3 ≥ 2. Select B. ✅",state:[{label:"A 1-2",color:"#DCFCE7",border:"#22C55E"},{label:"B 3-4",color:"#DCFCE7",border:"#22C55E"},{label:"C 0-6"},{label:"D 5-7"},{label:"E 8-9"}]},{msg:"C starts at 0 < 4. Skip C. ❌",state:[{label:"A 1-2",color:"#DCFCE7",border:"#22C55E"},{label:"B 3-4",color:"#DCFCE7",border:"#22C55E"},{label:"C 0-6",color:"#FEE2E2",border:"#EF4444"},{label:"D 5-7"},{label:"E 8-9"}]},{msg:"D starts at 5 ≥ 4. Select D. ✅ E starts at 8 ≥ 7. Select E. ✅",state:[{label:"A",color:"#DCFCE7",border:"#22C55E"},{label:"B",color:"#DCFCE7",border:"#22C55E"},{label:"C",color:"#FEE2E2",border:"#EF4444"},{label:"D",color:"#DCFCE7",border:"#22C55E"},{label:"E",color:"#DCFCE7",border:"#22C55E"}]}],Kr=[{msg:"Trains arrive: 9:00, 9:40, 9:50. Depart: 9:10, 12:00, 11:20",state:[{label:"T1 9:00"},{label:"T2 9:40"},{label:"T3 9:50"}]},{msg:"T1 arrives. Platforms = 1.",state:[{label:"T1",color:"#FEF9C3",border:"#FACC15"},{label:"T2"},{label:"T3"}]},{msg:"T1 departs at 9:10. T2 arrives at 9:40. Platforms = 1.",state:[{label:"T1",color:"#DBEAFE",border:"#3B82F6"},{label:"T2",color:"#FEF9C3",border:"#FACC15"},{label:"T3"}]},{msg:"T3 arrives at 9:50. T2 still here. Platforms = 2. Max = 2.",state:[{label:"T1",color:"#DBEAFE",border:"#3B82F6"},{label:"T2",color:"#DCFCE7",border:"#22C55E"},{label:"T3",color:"#DCFCE7",border:"#22C55E"}]}],Xr=[{msg:"Gas=[1,2,3,4,5] Cost=[3,4,5,1,2]. Try station 0.",state:[{label:"S0",color:"#FEF9C3",border:"#FACC15"},{label:"S1"},{label:"S2"},{label:"S3"},{label:"S4"}]},{msg:"S0: 1-3=-2 < 0. Reset. Try station 1.",state:[{label:"S0",color:"#FEE2E2",border:"#EF4444"},{label:"S1",color:"#FEF9C3",border:"#FACC15"},{label:"S2"},{label:"S3"},{label:"S4"}]},{msg:"S1: -2, S2: -2. Reset. Try station 3.",state:[{label:"S0",color:"#FEE2E2",border:"#EF4444"},{label:"S1",color:"#FEE2E2",border:"#EF4444"},{label:"S2",color:"#FEE2E2",border:"#EF4444"},{label:"S3",color:"#FEF9C3",border:"#FACC15"},{label:"S4"}]},{msg:"✅ Starting at S3: surplus stays positive! Total ≥ 0.",state:[{label:"S0"},{label:"S1"},{label:"S2"},{label:"S3",color:"#DCFCE7",border:"#22C55E"},{label:"S4",color:"#DCFCE7",border:"#22C55E"}]}],Yr=[{msg:"nums=[2,3,1,1,4]. Start at index 0, farthest=0.",state:[{val:2,color:"#FEF9C3",border:"#FACC15"},{val:3},{val:1},{val:1},{val:4}]},{msg:"i=0: farthest = max(0, 0+2) = 2.",state:[{val:2,color:"#DCFCE7",border:"#22C55E"},{val:3,color:"#FEF9C3",border:"#FACC15"},{val:1,color:"#FEF9C3",border:"#FACC15"},{val:1},{val:4}]},{msg:"i=1: farthest = max(2, 1+3) = 4. Reached end!",state:[{val:2,color:"#DCFCE7",border:"#22C55E"},{val:3,color:"#DCFCE7",border:"#22C55E"},{val:1,color:"#DCFCE7",border:"#22C55E"},{val:1,color:"#DCFCE7",border:"#22C55E"},{val:4,color:"#DCFCE7",border:"#22C55E"}]}],Jr=[{msg:"nums=[2,3,1,1,4]. jumps=0, curEnd=0, farthest=0.",state:[{val:2,color:"#FEF9C3",border:"#FACC15"},{val:3},{val:1},{val:1},{val:4}]},{msg:"i=0: farthest=2. i==curEnd → jump! jumps=1, curEnd=2.",state:[{val:2,color:"#DCFCE7",border:"#22C55E"},{val:3,color:"#FEF9C3",border:"#FACC15"},{val:1,color:"#FEF9C3",border:"#FACC15"},{val:1},{val:4}]},{msg:"i=1: farthest=4. i=2: i==curEnd → jump! jumps=2.",state:[{val:2,color:"#DBEAFE",border:"#3B82F6"},{val:3,color:"#DCFCE7",border:"#22C55E"},{val:1,color:"#DCFCE7",border:"#22C55E"},{val:1,color:"#FEF9C3",border:"#FACC15"},{val:4,color:"#FEF9C3",border:"#FACC15"}]},{msg:"✅ Reached end in 2 jumps! (0→1→4)",state:[{val:2,color:"#DBEAFE",border:"#3B82F6"},{val:3,color:"#DCFCE7",border:"#22C55E"},{val:1},{val:1},{val:4,color:"#DCFCE7",border:"#22C55E"}]}],Zr=[{msg:'"ababcbacadefegdehijhklij". Record last occurrences.',state:"ababcbaca".split("").map(t=>({label:t}))},{msg:'Scan: "a" last@8. Expand end to 8.',state:[{label:"a",color:"#FEF9C3",border:"#FACC15"},{label:"b"},{label:"a"},{label:"b"},{label:"c"},{label:"b"},{label:"a"},{label:"c"},{label:"a"}]},{msg:"i reaches 8. Cut partition! Size = 9. ✅",state:[{label:"a",color:"#DCFCE7",border:"#22C55E"},{label:"b",color:"#DCFCE7",border:"#22C55E"},{label:"a",color:"#DCFCE7",border:"#22C55E"},{label:"b",color:"#DCFCE7",border:"#22C55E"},{label:"c",color:"#DCFCE7",border:"#22C55E"},{label:"b",color:"#DCFCE7",border:"#22C55E"},{label:"a",color:"#DCFCE7",border:"#22C55E"},{label:"c",color:"#DCFCE7",border:"#22C55E"},{label:"a",color:"#DCFCE7",border:"#22C55E"}]},{msg:"✅ Partitions: [9, 7, 8]",state:[{label:"Part1=9",color:"#DCFCE7",border:"#22C55E"},{label:"Part2=7",color:"#DBEAFE",border:"#3B82F6"},{label:"Part3=8",color:"#EDE9FE",border:"#8B5CF6"}]}],ei=[{msg:"Balloons: [1,6],[2,8],[7,12],[10,16]. Sort by end.",state:[{label:"[1,6]"},{label:"[2,8]"},{label:"[7,12]"},{label:"[10,16]"}]},{msg:"Arrow at x=6. Bursts [1,6] and [2,8]. ✅",state:[{label:"[1,6]",color:"#DCFCE7",border:"#22C55E"},{label:"[2,8]",color:"#DCFCE7",border:"#22C55E"},{label:"[7,12]"},{label:"[10,16]"}]},{msg:"[7,12] starts at 7 > 6. New arrow at x=12. Bursts [7,12] and [10,16].",state:[{label:"[1,6]",color:"#DCFCE7",border:"#22C55E"},{label:"[2,8]",color:"#DCFCE7",border:"#22C55E"},{label:"[7,12]",color:"#DCFCE7",border:"#22C55E"},{label:"[10,16]",color:"#DCFCE7",border:"#22C55E"}]},{msg:"✅ Total arrows = 2!",state:[{label:"🏹 x=6",color:"#DBEAFE",border:"#3B82F6"},{label:"🏹 x=12",color:"#DBEAFE",border:"#3B82F6"}]}],ti=[{msg:"Frequencies: a:5, b:9, c:12, d:13. Build min-heap.",state:[{label:"a:5"},{label:"b:9"},{label:"c:12"},{label:"d:13"}]},{msg:"Merge a(5) + b(9) = 14. Insert back.",state:[{label:"c:12",color:"#FEF9C3",border:"#FACC15"},{label:"d:13",color:"#FEF9C3",border:"#FACC15"},{label:"ab:14",color:"#DCFCE7",border:"#22C55E"}]},{msg:"Merge c(12) + d(13) = 25. Insert back.",state:[{label:"ab:14",color:"#DCFCE7",border:"#22C55E"},{label:"cd:25",color:"#DCFCE7",border:"#22C55E"}]},{msg:"✅ Merge ab(14) + cd(25) = root(39). Tree complete!",state:[{label:"root:39",color:"#DBEAFE",border:"#3B82F6"}]}],ri={"activity-selection":{title:"Activity Selection — Timeline",steps:Ur},"min-platforms":{title:"Minimum Platforms — Train Timeline",steps:Kr},"gas-station":{title:"Gas Station — Circular Route",steps:Xr},"jump-game":{title:"Jump Game — Reachable Positions",steps:Yr},"jump-game-ii":{title:"Jump Game II — Min Jumps",steps:Jr},"partition-labels":{title:"Partition Labels — String Segments",steps:Zr},"min-arrows":{title:"Minimum Arrows — Balloon Intervals",steps:ei},"huffman-encoding":{title:"Huffman Encoding — Tree Building",steps:ti}},ii=({id:t})=>{const n=ri[t];return n?e.jsx(Gr,{title:n.title,steps:n.steps,initState:n.steps[0].state}):null},At=t=>{switch(t){case"Easy":return"#22C55E";case"Medium":return"#F59E0B";case"Hard":return"#EF4444";default:return"#64748B"}},ni=()=>{const[t,n]=i.useState(null),[a,d]=i.useState("javascript");return e.jsx("div",{className:"greedy-container",children:e.jsxs("div",{className:"greedy-split-layout",children:[e.jsxs("div",{className:"greedy-left-panel",children:[e.jsxs("div",{style:{marginBottom:"20px"},children:[e.jsx("h3",{style:{margin:"0 0 8px 0",fontSize:"1.5rem",color:"#1E293B",fontWeight:"800"},children:"Practice Problems"}),e.jsx("p",{style:{margin:0,color:"#64748B",fontSize:"1rem",lineHeight:"1.5"},children:"Practice classic greedy algorithm challenges with animated solutions."})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"16px",overflowY:"auto"},children:Qr.map(o=>e.jsxs(q.div,{onClick:()=>{n(o),d("javascript")},whileHover:{scale:1.02,y:-2},whileTap:{scale:.98},style:{background:"white",borderRadius:"14px",padding:"16px",boxShadow:"0 4px 10px rgba(0,0,0,0.05)",cursor:"pointer",border:t?.id===o.id?"2px solid #4F46E5":"2px solid transparent",transition:"border 0.2s ease",display:"flex",flexDirection:"column",gap:"10px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("h4",{style:{margin:0,color:"#1E293B",fontSize:"1.1rem",fontWeight:"bold"},children:[o.tag," ",o.title]}),e.jsx("span",{style:{background:At(o.difficulty)+"20",color:At(o.difficulty),padding:"4px 10px",borderRadius:"999px",fontSize:"0.8rem",fontWeight:"700"},children:o.difficulty})]}),e.jsx("p",{style:{margin:0,color:"#64748B",fontSize:"0.9rem",lineHeight:"1.5",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"},children:o.description})]},o.id))})]}),e.jsx("div",{className:"greedy-right-panel",children:e.jsx(X,{mode:"wait",children:t?e.jsxs(q.div,{initial:{opacity:0,x:20},animate:{opacity:1,x:0},exit:{opacity:0,x:-20},transition:{duration:.3},className:"greedy-solution-viewer",children:[e.jsxs("div",{style:{borderBottom:"2px solid #F1F5F9",paddingBottom:"20px",marginBottom:"20px"},children:[e.jsxs("h2",{style:{margin:"0 0 10px 0",fontSize:"1.8rem",color:"#1E293B",fontWeight:"800"},children:[t.tag," ",t.title]}),e.jsx("p",{style:{margin:"0 0 16px 0",color:"#475569",fontSize:"1.05rem",lineHeight:"1.6"},children:t.description}),e.jsxs("div",{style:{background:"#F8FAFC",padding:"12px 16px",borderRadius:"8px",borderLeft:"4px solid #4F46E5"},children:[e.jsx("span",{style:{fontWeight:"bold",color:"#1E293B"},children:"Example: "}),e.jsx("code",{style:{color:"#4F46E5",fontFamily:"monospace",fontSize:"0.95rem"},children:t.example})]})]}),e.jsxs("div",{style:{marginBottom:"24px"},children:[e.jsx("h3",{style:{margin:"0 0 16px 0",fontSize:"1.3rem",color:"#1E293B"},children:"Visualization & Animation"}),e.jsx("div",{style:{background:"#F8FAFC",padding:"24px",borderRadius:"16px",border:"1px solid #E2E8F0",boxShadow:"inset 0 2px 4px rgba(0,0,0,0.02)"},children:e.jsx(ii,{id:t.id})})]}),e.jsxs("div",{style:{marginBottom:"24px"},children:[e.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"1.3rem",color:"#1E293B"},children:"Algorithm Approach"}),e.jsxs("div",{style:{background:"#EEF2FF",color:"#312E81",padding:"16px",borderRadius:"12px",fontSize:"1rem",lineHeight:"1.6"},children:["💡 ",t.algorithm]})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",flexWrap:"wrap",gap:"8px"},children:[e.jsx("h3",{style:{margin:0,fontSize:"1.3rem",color:"#1E293B"},children:"Solution Code"}),e.jsx("div",{style:{display:"flex",gap:"8px",background:"#F1F5F9",padding:"4px",borderRadius:"10px"},children:["python","javascript","cpp"].map(o=>e.jsx("button",{onClick:()=>d(o),style:{padding:"6px 14px",borderRadius:"6px",border:"none",fontWeight:"600",cursor:"pointer",transition:"all 0.2s",fontSize:"0.85rem",background:a===o?"#fff":"transparent",color:a===o?"#4F46E5":"#64748B",boxShadow:a===o?"0 2px 4px rgba(0,0,0,0.05)":"none"},children:o==="cpp"?"C++":o.charAt(0).toUpperCase()+o.slice(1)},o))})]}),e.jsx("pre",{style:{background:"#0F172A",color:"#E2E8F0",padding:"20px",borderRadius:"12px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",margin:0,fontFamily:'"Fira Code", monospace',boxShadow:"inset 0 2px 4px rgba(0,0,0,0.1)"},children:e.jsx("code",{children:t[a]})})]})]},t.id):e.jsxs(q.div,{initial:{opacity:0},animate:{opacity:1},style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",color:"#94A3B8"},children:[e.jsx("div",{style:{fontSize:"4rem",marginBottom:"16px"},children:"🏆"}),e.jsx("h3",{style:{margin:0},children:"Select a problem to view its solution"})]})})})]})})},ze={wrap:{display:"flex",flexDirection:"column",gap:"12px"},desc:{fontSize:"0.9rem",color:"#64748B",lineHeight:"1.6",backgroundColor:"#F1F5F9",borderRadius:"10px",padding:"10px 14px"},vizArea:{backgroundColor:"#F8FAFC",border:"1px solid #E2E8F0",borderRadius:"14px",padding:"20px",display:"flex",flexDirection:"column",gap:"12px",alignItems:"center",minHeight:"120px"},cell:{width:"40px",height:"40px",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"900",fontSize:"0.9rem",color:"#1E293B",transition:"background-color 0.3s, outline 0.2s"},msg:{backgroundColor:"#1E293B",color:"#fff",padding:"8px 16px",borderRadius:"10px",fontSize:"0.88rem",fontWeight:"700",textAlign:"center"},controls:{display:"flex",gap:"8px",justifyContent:"center",flexWrap:"wrap"},btn:t=>({padding:"8px 16px",borderRadius:"10px",border:"none",backgroundColor:t,color:"#fff",fontWeight:"700",cursor:"pointer",fontSize:"0.9rem"})},Rt=[{id:"activity",label:"Activity Selection"},{id:"coinchange",label:"Coin Change (Greedy)"},{id:"knapsack",label:"Fractional Knapsack"},{id:"huffman",label:"Huffman Coding"},{id:"practice",label:"Greedy Practice Problems"}],si=({name:t})=>e.jsxs("div",{style:{padding:"3rem",textAlign:"center",color:"#64748b",fontFamily:"system-ui, sans-serif"},children:[e.jsx("div",{style:{fontSize:"3rem",marginBottom:"1rem"},children:"🚧"}),e.jsx("h3",{style:{fontSize:"1.5rem",fontWeight:"700",color:"#1e293b",marginBottom:"0.5rem"},children:t}),e.jsx("p",{style:{fontSize:"1rem"},children:"This metaphor is coming soon. Stay tuned!"})]}),oi=()=>{const[t,n]=i.useState("activity"),a=()=>{switch(t){case"activity":return e.jsx(Pr,{});case"coinchange":return e.jsx(Nr,{});case"knapsack":return e.jsx(_r,{});case"huffman":return e.jsx(Or,{});case"practice":return e.jsx(ni,{});default:return e.jsx(si,{name:Rt.find(d=>d.id===t)?.label})}};return e.jsx("div",{style:ke.shell,children:e.jsxs("div",{style:ke.contentWrapper,children:[e.jsxs("div",{style:ke.heroSection,children:[e.jsx("h1",{style:ke.heroTitle,children:"Greedy Algorithms"}),e.jsx("p",{style:ke.heroSubtitle,children:"Greedy algorithms solve problems by making the best possible decision at each step. They choose the locally optimal option in the hope that it leads to a globally optimal solution."})]}),e.jsx("div",{style:ke.topBar,children:e.jsx("div",{style:ke.tabs,children:Rt.map(d=>e.jsxs("button",{style:{...ke.tab,color:t===d.id?"#0f172a":"#64748b",opacity:t===d.id?1:.65,fontWeight:t===d.id?"700":"500"},onClick:()=>n(d.id),children:[d.label,t===d.id&&e.jsx(q.div,{layoutId:"activeTabUnderlineGreedy",style:ke.activeUnderline,transition:{type:"spring",bounce:.2,duration:.5}})]},d.id))})}),e.jsx("div",{style:ke.content,children:e.jsx(X,{mode:"wait",children:e.jsx(q.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},exit:{opacity:0},transition:{duration:.2,ease:"easeOut"},children:a()},t)})})]})})},ke={shell:{width:"100%",minHeight:"100vh",backgroundColor:"#fff",fontFamily:"'Inter', system-ui, -apple-system, sans-serif"},contentWrapper:{maxWidth:"1100px",margin:"0 auto",padding:"0 1.5rem"},heroSection:{textAlign:"center",padding:"3rem 0 2rem 0"},heroTitle:{fontSize:"3rem",fontWeight:"900",color:"#0f172a",marginBottom:"0.75rem",letterSpacing:"-1.5px",lineHeight:"1.1"},heroSubtitle:{fontSize:"1.1rem",color:"#475569",maxWidth:"700px",margin:"0 auto",lineHeight:"1.6",opacity:.8},topBar:{display:"flex",justifyContent:"center",borderBottom:"1px solid #f1f5f9",marginBottom:"2rem",position:"sticky",top:"72px",backgroundColor:"rgba(255,255,255,0.8)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",zIndex:100,padding:"0.75rem 0",scrollMarginTop:"80px"},tabs:{display:"flex",gap:"0.5rem",padding:"0 1rem",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",maskImage:"linear-gradient(to right, transparent, black 5%, black 95%, transparent)",WebkitMaskImage:"linear-gradient(to right, transparent, black 5%, black 95%, transparent)"},tab:{padding:"0.6rem 1.2rem",background:"none",border:"none",fontSize:"0.875rem",cursor:"pointer",transition:"all 0.2s ease",display:"flex",alignItems:"center",gap:"10px",whiteSpace:"nowrap",borderRadius:"8px",position:"relative"},activeUnderline:{position:"absolute",bottom:"-0.5rem",left:"20%",right:"20%",height:"2px",backgroundColor:"#3b82f6",borderRadius:"2px"},content:{minHeight:"600px",marginBottom:"3rem"}},ai=()=>{const[t,n]=i.useState(6),[a,d]=i.useState([]),[o,x]=i.useState("Welcome! Place N queens on the board so no two attack each other."),[u,b]=i.useState(!1),[C,R]=i.useState(!1),[I,j]=i.useState({}),[A,r]=i.useState("javascript"),c=i.useRef(!1),{showFeedback:p}=le(),[l,y]=i.useState(!0),B=i.useRef([]),H=i.useRef(0),M=i.useCallback(g=>{d(Array.from({length:g},()=>Array(g).fill(0))),j({}),x('Welcome! Click "Start Simulation" to watch the backtracking algorithm or click cells to try yourself.'),b(!1),R(!1),B.current=[],H.current=0,c.current=!1},[]);i.useEffect(()=>{M(t)},[t,M]);const T=(g,f,F)=>{for(let w=0;w<f;w++)if(g[w][F]===1)return!1;for(let w=f-1,W=F-1;w>=0&&W>=0;w--,W--)if(g[w][W]===1)return!1;for(let w=f-1,W=F+1;w>=0&&W<g.length;w--,W++)if(g[w][W]===1)return!1;return!0},$=g=>{const f=[],F=Array.from({length:g},()=>Array(g).fill(0)),w={},W=P=>{if(P===g){const N=F.map(te=>[...te]),U={...w};for(let te=0;te<g;te++)for(let Ie=0;Ie<g;Ie++)N[te][Ie]===1&&(U[`${te}-${Ie}`]="green");return f.push({board:N,colors:U,msg:`✅ Solution found! All ${g} queens placed safely.`,feedback:{msg:"Success! All queens are safe 🏰",type:"success"}}),!0}for(let N=0;N<g;N++)if(w[`${P}-${N}`]="yellow",f.push({board:F.map(U=>[...U]),colors:{...w},msg:`Trying queen at row ${P+1}, column ${N+1}...`}),T(F,P,N)){if(F[P][N]=1,w[`${P}-${N}`]="green",f.push({board:F.map(U=>[...U]),colors:{...w},msg:`✅ Placed queen at (${P+1}, ${N+1}). Moving to next row.`,feedback:{msg:"Queen placed! 👑"}}),W(P+1))return!0;F[P][N]=0,w[`${P}-${N}`]="blue",f.push({board:F.map(U=>[...U]),colors:{...w},msg:`↩️ Backtracking from (${P+1}, ${N+1}). Trying next column.`,feedback:{msg:"Dead end... back up! 🔄",type:"info"}})}else w[`${P}-${N}`]="red",f.push({board:F.map(U=>[...U]),colors:{...w},msg:`❌ Conflict at (${P+1}, ${N+1}). Cannot place here.`}),w[`${P}-${N}`]=void 0;return!1};return W(0),f},v=g=>{const f=B.current[g];f&&(d(f.board),j(f.colors),x(f.msg),f.feedback&&p(f.feedback.msg,f.feedback.type||"info"))},D=()=>{c.current=!1;const g=$(t);B.current=g,H.current=0,b(!0),R(!1),v(0)};i.useEffect(()=>{if(!u||C)return;if(H.current>=B.current.length-1){b(!1);return}const g=setTimeout(()=>{c.current||(H.current+=1,v(H.current),H.current>=B.current.length-1&&b(!1))},350);return()=>clearTimeout(g)},[u,C,a]);const z=()=>{if(B.current.length===0){const g=$(t);B.current=g,H.current=0,R(!0),v(0);return}H.current<B.current.length-1&&(H.current+=1,v(H.current))},E=()=>{c.current=!0,M(t)},h=(g,f)=>{if(u)return;const F=a.map(W=>[...W]),w={...I};F[g][f]===1?(F[g][f]=0,w[`${g}-${f}`]=void 0,x(`Removed queen from (${g+1}, ${f+1}).`)):T(F,g,f)?F[g].includes(1)?(w[`${g}-${f}`]="red",x(`❌ Row ${g+1} already has a queen!`),setTimeout(()=>{j(W=>{const P={...W};return P[`${g}-${f}`]=void 0,P})},600)):(F[g][f]=1,w[`${g}-${f}`]="green",x(`✅ Placed queen at (${g+1}, ${f+1}).`)):(w[`${g}-${f}`]="red",x(`❌ Conflict at (${g+1}, ${f+1})!`),setTimeout(()=>{j(W=>{const P={...W};return P[`${g}-${f}`]=void 0,P})},600)),d(F),j(w)},s=(g,f)=>{const F=I[`${g}-${f}`];return F==="green"?"#DCFCE7":F==="red"?"#FEE2E2":F==="yellow"?"#FEF9C3":F==="blue"?"#DBEAFE":(g+f)%2===0?"#F8FAFC":"#E2E8F0"},m=(g,f)=>{const F=I[`${g}-${f}`];return F==="green"?"2px solid #22C55E":F==="red"?"2px solid #EF4444":F==="yellow"?"2px solid #FACC15":F==="blue"?"2px solid #3B82F6":"1px solid #CBD5E1"},k={python:`def solve_nqueens(n):
    board = [[0] * n for _ in range(n)]
    
    def is_safe(row, col):
        for i in range(row):
            if board[i][col] == 1:
                return False
        i, j = row - 1, col - 1
        while i >= 0 and j >= 0:
            if board[i][j] == 1: return False
            i -= 1; j -= 1
        i, j = row - 1, col + 1
        while i >= 0 and j < n:
            if board[i][j] == 1: return False
            i -= 1; j += 1
        return True
    
    def backtrack(row):
        if row == n:
            return True
        for col in range(n):
            if is_safe(row, col):
                board[row][col] = 1
                if backtrack(row + 1):
                    return True
                board[row][col] = 0  # Backtrack
        return False
    
    backtrack(0)
    return board`,javascript:`function solveNQueens(n) {
    const board = Array.from({length: n},
        () => Array(n).fill(0));
    
    function isSafe(row, col) {
        for (let i = 0; i < row; i++)
            if (board[i][col]) return false;
        for (let i = row-1, j = col-1; i >= 0 && j >= 0; i--, j--)
            if (board[i][j]) return false;
        for (let i = row-1, j = col+1; i >= 0 && j < n; i--, j++)
            if (board[i][j]) return false;
        return true;
    }
    
    function backtrack(row) {
        if (row === n) return true;
        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row][col] = 1;
                if (backtrack(row + 1)) return true;
                board[row][col] = 0; // Backtrack
            }
        }
        return false;
    }
    
    backtrack(0);
    return board;
}`,cpp:`bool isSafe(vector<vector<int>>& board,
    int row, int col, int n) {
    for (int i = 0; i < row; i++)
        if (board[i][col]) return false;
    for (int i=row-1, j=col-1; i>=0 && j>=0; i--, j--)
        if (board[i][j]) return false;
    for (int i=row-1, j=col+1; i>=0 && j<n; i--, j++)
        if (board[i][j]) return false;
    return true;
}

bool backtrack(vector<vector<int>>& board,
    int row, int n) {
    if (row == n) return true;
    for (int col = 0; col < n; col++) {
        if (isSafe(board, row, col, n)) {
            board[row][col] = 1;
            if (backtrack(board, row + 1, n))
                return true;
            board[row][col] = 0; // Backtrack
        }
    }
    return false;
}`},S=t<=6?52:t===7?46:40;return e.jsxs("div",{style:de.container,children:[e.jsxs("div",{style:de.card,children:[e.jsx("h3",{style:de.cardTitle,children:"N-Queens — The Safe Castle 🏰"}),e.jsx("p",{style:de.cardDesc,children:"Place N queens on a chessboard so that no two queens attack each other. The algorithm uses backtracking to try placing queens row by row, undoing choices that lead to conflicts."}),e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center",marginBottom:"20px",flexWrap:"wrap"},children:[e.jsx("span",{style:{fontWeight:"700",color:"#1E293B",fontSize:"0.95rem"},children:"Board Size:"}),[4,5,6,7,8].map(g=>e.jsxs("button",{onClick:()=>n(g),style:{padding:"6px 14px",borderRadius:"8px",border:"none",cursor:"pointer",fontWeight:"700",fontSize:"0.9rem",transition:"all 0.2s",background:t===g?"#4F46E5":"#F1F5F9",color:t===g?"#fff":"#64748B"},children:[g,"×",g]},g))]}),e.jsx("div",{style:de.messageBox,children:o}),e.jsx("div",{style:{display:"flex",justifyContent:"center",marginBottom:"20px"},children:e.jsx("div",{style:{display:"inline-grid",gridTemplateColumns:`repeat(${t}, ${S}px)`,gap:"0px",borderRadius:"12px",overflow:"hidden",boxShadow:"0 4px 16px rgba(0,0,0,0.08)"},children:a.map((g,f)=>g.map((F,w)=>e.jsx(q.div,{onClick:()=>h(f,w),whileHover:{scale:1.08},whileTap:{scale:.95},animate:{backgroundColor:s(f,w)},transition:{duration:.2},className:I[`${f}-${w}`]==="yellow"||I[`${f}-${w}`]==="green"?"pulse-glow":"",style:{width:S,height:S,display:"flex",alignItems:"center",justifyContent:"center",cursor:u?"default":"pointer",border:m(f,w),fontSize:S>44?"1.6rem":"1.3rem",userSelect:"none",boxShadow:I[`${f}-${w}`]==="green"?"0 0 10px rgba(34, 197, 94, 0.3)":"none"},children:F===1?"♛":""},`${f}-${w}`)))})}),e.jsxs("div",{style:de.legend,children:[e.jsxs("div",{style:de.legendItem,children:[e.jsx("div",{style:{...de.colorBox,background:"#DCFCE7",border:"2px solid #22C55E"}})," Valid"]}),e.jsxs("div",{style:de.legendItem,children:[e.jsx("div",{style:{...de.colorBox,background:"#FEE2E2",border:"2px solid #EF4444"}})," Conflict"]}),e.jsxs("div",{style:de.legendItem,children:[e.jsx("div",{style:{...de.colorBox,background:"#FEF9C3",border:"2px solid #FACC15"}})," Current"]}),e.jsxs("div",{style:de.legendItem,children:[e.jsx("div",{style:{...de.colorBox,background:"#DBEAFE",border:"2px solid #3B82F6"}})," Backtracked"]})]}),e.jsxs("div",{style:de.controls,children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx("button",{onClick:()=>{D(),y(!1)},disabled:u,style:de.primaryBtn,children:"▶ Solve the Puzzle 🧩"}),l&&!u&&e.jsx("div",{className:"tooltip-hint",style:{bottom:"110%",left:"50%"},children:"Let's find a safe spot! ✨"})]}),e.jsx("button",{onClick:()=>{z(),y(!1)},disabled:u,style:de.secondaryBtn,children:"⏭ Take a Step"}),e.jsx("button",{onClick:E,style:de.dangerBtn,children:"↺ Clear Board"})]})]}),e.jsxs("div",{style:de.card,children:[e.jsxs("div",{style:de.codeHeader,children:[e.jsx("h3",{style:{margin:0},children:"Solution Code"}),e.jsx("div",{style:de.langSelector,children:["python","javascript","cpp"].map(g=>e.jsx("button",{onClick:()=>r(g),style:{...de.langBtn,background:A===g?"#4F46E5":"transparent",color:A===g?"#fff":"#64748B"},children:g==="cpp"?"C++":g.charAt(0).toUpperCase()+g.slice(1)},g))})]}),e.jsx("pre",{style:de.pre,children:e.jsx("code",{children:k[A]})})]})]})},de={container:{display:"flex",flexDirection:"column",gap:"2rem",padding:"1rem"},card:{background:"white",borderRadius:"16px",padding:"28px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)"},cardTitle:{margin:"0 0 10px 0",fontSize:"1.5rem",fontWeight:"800",color:"#1E293B"},cardDesc:{margin:"0 0 20px 0",color:"#64748B",lineHeight:"1.6"},messageBox:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",marginBottom:"24px",minHeight:"56px",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:"1.5"},legend:{display:"flex",gap:"20px",justifyContent:"center",marginBottom:"20px",flexWrap:"wrap"},legendItem:{display:"flex",alignItems:"center",gap:"8px",fontSize:"0.9rem",color:"#64748B"},colorBox:{width:"16px",height:"16px",borderRadius:"4px"},controls:{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap"},primaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer",fontSize:"0.95rem"},secondaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer",fontSize:"0.95rem"},dangerBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer",fontSize:"0.95rem"},codeHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",flexWrap:"wrap",gap:"12px"},langSelector:{display:"flex",gap:"8px",background:"#F1F5F9",padding:"4px",borderRadius:"10px"},langBtn:{border:"none",padding:"4px 12px",borderRadius:"6px",fontSize:"0.85rem",fontWeight:"600",cursor:"pointer",transition:"all 0.2s"},pre:{background:"#0F172A",color:"#E2E8F0",padding:"20px",borderRadius:"12px",overflowX:"auto",fontSize:"0.9rem",lineHeight:"1.6",fontFamily:"monospace",margin:0}},Ze=[[5,3,0,0,7,0,0,0,0],[6,0,0,1,9,5,0,0,0],[0,9,8,0,0,0,0,6,0],[8,0,0,0,6,0,0,0,3],[4,0,0,8,0,3,0,0,1],[7,0,0,0,2,0,0,0,6],[0,6,0,0,0,0,2,8,0],[0,0,0,4,1,9,0,0,5],[0,0,0,0,8,0,0,7,9]],li=()=>{const[t,n]=i.useState(Ze.map(E=>[...E])),[a,d]=i.useState(()=>Ze.map(E=>E.map(h=>h!==0))),[o,x]=i.useState({}),[u,b]=i.useState("A classic Sudoku puzzle. Watch the backtracking solver fill it step by step!"),[C,R]=i.useState(!1),[I,j]=i.useState("javascript"),A=i.useRef(!1),{showFeedback:r}=le(),[c,p]=i.useState(!0),l=i.useRef([]),y=i.useRef(0),B=(E,h,s,m)=>{for(let g=0;g<9;g++)if(E[h][g]===m)return!1;for(let g=0;g<9;g++)if(E[g][s]===m)return!1;const k=Math.floor(h/3)*3,S=Math.floor(s/3)*3;for(let g=k;g<k+3;g++)for(let f=S;f<S+3;f++)if(E[g][f]===m)return!1;return!0},H=()=>{const E=[],h=Ze.map(m=>[...m]),s=()=>{for(let m=0;m<9;m++)for(let k=0;k<9;k++)if(h[m][k]===0){E.push({grid:h.map(S=>[...S]),highlight:`${m}-${k}`,color:"yellow",msg:`Finding empty cell at (${m+1}, ${k+1})...`});for(let S=1;S<=9;S++)if(B(h,m,k,S)){if(h[m][k]=S,E.push({grid:h.map(g=>[...g]),highlight:`${m}-${k}`,color:"green",msg:`✅ Placed ${S} at (${m+1}, ${k+1}).`,feedback:{msg:"Number placed! 📝"}}),s())return!0;h[m][k]=0,E.push({grid:h.map(g=>[...g]),highlight:`${m}-${k}`,color:"red",msg:`↩️ Backtrack: removed ${S} from (${m+1}, ${k+1}).`,feedback:{msg:"Conflict found... backing up. 🔄",type:"info"}})}return!1}return E.push({grid:h.map(m=>[...m]),highlight:null,color:null,msg:"🎉 Sudoku solved successfully!",feedback:{msg:"Puzzle solved! You're a logic master 🏆",type:"success"}}),!0};return s(),E},M=E=>{const h=l.current[E];h&&(n(h.grid),x(h.highlight?{[h.highlight]:h.color}:{}),b(h.msg),h.feedback&&r(h.feedback.msg,h.feedback.type||"info"))},T=()=>{A.current=!1;const E=H();l.current=E,y.current=0,R(!0),M(0)};i.useEffect(()=>{if(!C)return;if(y.current>=l.current.length-1){R(!1);return}const E=setTimeout(()=>{A.current||(y.current+=1,M(y.current),y.current>=l.current.length-1&&R(!1))},120);return()=>clearTimeout(E)},[C,t]);const $=()=>{if(l.current.length===0){const E=H();l.current=E,y.current=0,M(0);return}y.current<l.current.length-1&&(y.current+=1,M(y.current))},v=()=>{A.current=!0,n(Ze.map(E=>[...E])),x({}),b("A classic Sudoku puzzle. Watch the backtracking solver fill it step by step!"),R(!1),l.current=[],y.current=0},D=(E,h)=>{const s=o[`${E}-${h}`];if(s==="green")return"#DCFCE7";if(s==="red")return"#FEE2E2";if(s==="yellow")return"#FEF9C3";const m=Math.floor(E/3),k=Math.floor(h/3);return(m+k)%2===0?"#F8FAFC":"#EEF2FF"},z={python:`def solve_sudoku(board):
    def is_valid(row, col, num):
        for i in range(9):
            if board[row][i] == num: return False
            if board[i][col] == num: return False
        r0, c0 = 3 * (row // 3), 3 * (col // 3)
        for i in range(r0, r0+3):
            for j in range(c0, c0+3):
                if board[i][j] == num: return False
        return True
    
    def backtrack():
        for r in range(9):
            for c in range(9):
                if board[r][c] == 0:
                    for num in range(1, 10):
                        if is_valid(r, c, num):
                            board[r][c] = num
                            if backtrack():
                                return True
                            board[r][c] = 0
                    return False
        return True
    
    backtrack()
    return board`,javascript:`function solveSudoku(board) {
    function isValid(row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num) return false;
            if (board[i][col] === num) return false;
        }
        const r0 = Math.floor(row/3)*3;
        const c0 = Math.floor(col/3)*3;
        for (let i = r0; i < r0+3; i++)
            for (let j = c0; j < c0+3; j++)
                if (board[i][j] === num) return false;
        return true;
    }
    
    function backtrack() {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (board[r][c] === 0) {
                    for (let n = 1; n <= 9; n++) {
                        if (isValid(r, c, n)) {
                            board[r][c] = n;
                            if (backtrack()) return true;
                            board[r][c] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    backtrack();
}`,cpp:`void solveSudoku(vector<vector<char>>& board) {
    function<bool()> backtrack = [&]() -> bool {
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') {
                    for (char n = '1'; n <= '9'; n++) {
                        if (isValid(board, r, c, n)) {
                            board[r][c] = n;
                            if (backtrack()) return true;
                            board[r][c] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };
    backtrack();
}`};return e.jsxs("div",{style:me.container,children:[e.jsxs("div",{style:me.card,children:[e.jsx("h3",{style:me.cardTitle,children:"Sudoku Solver — Logic Puzzle Master"}),e.jsx("p",{style:me.cardDesc,children:"Fill a Sudoku grid so that every row, column, and 3×3 box contains digits 1–9. The backtracking algorithm finds empty cells, tries valid numbers, and undoes choices when stuck."}),e.jsx("div",{style:me.messageBox,children:u}),e.jsx("div",{style:{display:"flex",justifyContent:"center",marginBottom:"20px"},children:e.jsx("div",{style:{display:"inline-grid",gridTemplateColumns:"repeat(9, 42px)",gap:"0px",borderRadius:"12px",overflow:"hidden",boxShadow:"0 4px 16px rgba(0,0,0,0.08)",border:"3px solid #1E293B"},children:t.map((E,h)=>E.map((s,m)=>e.jsx(q.div,{animate:{backgroundColor:D(h,m)},transition:{duration:.15},className:o[`${h}-${m}`]?"pulse-glow":"",style:{width:42,height:42,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.05rem",fontWeight:a[h][m]?"900":"600",color:a[h][m]?"#1E293B":"#4F46E5",borderRight:(m+1)%3===0&&m<8?"3px solid #1E293B":"1px solid #CBD5E1",borderBottom:(h+1)%3===0&&h<8?"3px solid #1E293B":"1px solid #CBD5E1",userSelect:"none",boxShadow:o[`${h}-${m}`]==="green"?"0 0 10px rgba(79, 70, 229, 0.4)":"none"},children:s!==0?s:""},`${h}-${m}`)))})}),e.jsxs("div",{style:me.legend,children:[e.jsxs("div",{style:me.legendItem,children:[e.jsx("div",{style:{...me.colorBox,background:"#FEF9C3",border:"2px solid #FACC15"}})," Current Cell"]}),e.jsxs("div",{style:me.legendItem,children:[e.jsx("div",{style:{...me.colorBox,background:"#DCFCE7",border:"2px solid #22C55E"}})," Valid Number"]}),e.jsxs("div",{style:me.legendItem,children:[e.jsx("div",{style:{...me.colorBox,background:"#FEE2E2",border:"2px solid #EF4444"}})," Invalid / Backtrack"]})]}),e.jsxs("div",{style:me.controls,children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx("button",{onClick:()=>{T(),p(!1)},disabled:C,style:me.primaryBtn,children:"▶ Solve the Board! 🏆"}),c&&!C&&e.jsx("div",{className:"tooltip-hint",style:{bottom:"110%",left:"50%"},children:"Let's solve it! ✨"})]}),e.jsx("button",{onClick:()=>{$(),p(!1)},disabled:C,style:me.secondaryBtn,children:"⏭ Step Through"}),e.jsx("button",{onClick:v,style:me.dangerBtn,children:"↺ Clear All"})]})]}),e.jsxs("div",{style:me.card,children:[e.jsxs("div",{style:me.codeHeader,children:[e.jsx("h3",{style:{margin:0},children:"Solution Code"}),e.jsx("div",{style:me.langSelector,children:["python","javascript","cpp"].map(E=>e.jsx("button",{onClick:()=>j(E),style:{...me.langBtn,background:I===E?"#4F46E5":"transparent",color:I===E?"#fff":"#64748B"},children:E==="cpp"?"C++":E.charAt(0).toUpperCase()+E.slice(1)},E))})]}),e.jsx("pre",{style:me.pre,children:e.jsx("code",{children:z[I]})})]})]})},me={container:{display:"flex",flexDirection:"column",gap:"2rem",padding:"1rem"},card:{background:"white",borderRadius:"16px",padding:"28px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)"},cardTitle:{margin:"0 0 10px 0",fontSize:"1.5rem",fontWeight:"800",color:"#1E293B"},cardDesc:{margin:"0 0 20px 0",color:"#64748B",lineHeight:"1.6"},messageBox:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",marginBottom:"24px",minHeight:"56px",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:"1.5"},legend:{display:"flex",gap:"20px",justifyContent:"center",marginBottom:"20px",flexWrap:"wrap"},legendItem:{display:"flex",alignItems:"center",gap:"8px",fontSize:"0.9rem",color:"#64748B"},colorBox:{width:"16px",height:"16px",borderRadius:"4px"},controls:{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap"},primaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer",fontSize:"0.95rem"},secondaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer",fontSize:"0.95rem"},dangerBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer",fontSize:"0.95rem"},codeHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",flexWrap:"wrap",gap:"12px"},langSelector:{display:"flex",gap:"8px",background:"#F1F5F9",padding:"4px",borderRadius:"10px"},langBtn:{border:"none",padding:"4px 12px",borderRadius:"6px",fontSize:"0.85rem",fontWeight:"600",cursor:"pointer",transition:"all 0.2s"},pre:{background:"#0F172A",color:"#E2E8F0",padding:"20px",borderRadius:"12px",overflowX:"auto",fontSize:"0.9rem",lineHeight:"1.6",fontFamily:"monospace",margin:0}},$e=[[0,1,0,0,0,0,0,0],[0,1,0,1,1,1,1,0],[0,0,0,0,0,0,1,0],[0,1,1,1,0,1,1,0],[0,0,0,1,0,0,0,0],[1,1,0,1,1,1,0,1],[0,0,0,0,0,1,0,0],[0,1,1,1,0,0,1,0]],ot=$e.length,et=$e[0].length,It=[[0,1],[1,0],[0,-1],[-1,0]],di=()=>{const[t,n]=i.useState({}),[a,d]=i.useState("Navigate from the top-left 🟢 to the bottom-right 🏁. The algorithm explores paths and backtracks at dead ends."),[o,x]=i.useState(!1),[u,b]=i.useState("javascript"),C=i.useRef(!1),{showFeedback:R}=le(),[I,j]=i.useState(!0),A=i.useRef([]),r=i.useRef(0),c=()=>{const v=[],D={},z=[],E=(h,s)=>{if(h<0||h>=ot||s<0||s>=et||$e[h][s]===1||D[`${h}-${s}`])return!1;D[`${h}-${s}`]=!0,z.push([h,s]);const m={};for(const[S,g]of z)m[`${S}-${g}`]="yellow";for(const S of Object.keys(D))z.some(([g,f])=>`${g}-${f}`===S)||(m[S]="blue");if(v.push({states:{...m},msg:`Moving to (${h+1}, ${s+1})...`,current:`${h}-${s}`}),h===ot-1&&s===et-1){const S={};for(const[g,f]of z)S[`${g}-${f}`]="green";for(const g of Object.keys(D))z.some(([f,F])=>`${f}-${F}`===g)||(S[g]="blue");return v.push({states:{...S},msg:"🎉 Path found! Reached the goal!",feedback:{msg:"Success! Exit reached ✨",type:"success"}}),!0}for(let S=0;S<4;S++){const g=h+It[S][0],f=s+It[S][1];if(E(g,f))return!0}z.pop();const k={};for(const[S,g]of z)k[`${S}-${g}`]="yellow";for(const S of Object.keys(D))z.some(([g,f])=>`${g}-${f}`===S)||(k[S]="blue");return k[`${h}-${s}`]="red",v.push({states:{...k},msg:`↩️ Dead end at (${h+1}, ${s+1}). Backtracking...`,current:`${h}-${s}`,feedback:{msg:"Trapped! Backtracking... 🔄",type:"info"}}),!1};return E(0,0),v},p=v=>{const D=A.current[v];D&&(n(D.states),d(D.msg),D.feedback&&R(D.feedback.msg,D.feedback.type||"info"))},l=()=>{C.current=!1;const v=c();A.current=v,r.current=0,x(!0),p(0)};i.useEffect(()=>{if(!o)return;if(r.current>=A.current.length-1){x(!1);return}const v=setTimeout(()=>{C.current||(r.current+=1,p(r.current),r.current>=A.current.length-1&&x(!1))},400);return()=>clearTimeout(v)},[o,t]);const y=()=>{if(A.current.length===0){const v=c();A.current=v,r.current=0,p(0);return}r.current<A.current.length-1&&(r.current+=1,p(r.current))},B=()=>{C.current=!0,n({}),d("Navigate from the top-left 🟢 to the bottom-right 🏁. The algorithm explores paths and backtracks at dead ends."),x(!1),A.current=[],r.current=0},H=(v,D)=>{if($e[v][D]===1)return"#1E293B";const z=t[`${v}-${D}`];return z==="green"?"#DCFCE7":z==="red"?"#FEE2E2":z==="yellow"?"#FEF9C3":z==="blue"?"#DBEAFE":"#F8FAFC"},M=(v,D)=>{if($e[v][D]===1)return"1px solid #0F172A";const z=t[`${v}-${D}`];return z==="green"?"2px solid #22C55E":z==="red"?"2px solid #EF4444":z==="yellow"?"2px solid #FACC15":z==="blue"?"2px solid #3B82F6":"1px solid #E2E8F0"},T={python:`def find_path(maze, start, end):
    rows, cols = len(maze), len(maze[0])
    visited = set()
    path = []
    
    def backtrack(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return False
        if maze[r][c] == 1 or (r, c) in visited:
            return False
        
        visited.add((r, c))
        path.append((r, c))
        
        if (r, c) == end:
            return True
        
        # Try all 4 directions
        for dr, dc in [(0,1),(1,0),(0,-1),(-1,0)]:
            if backtrack(r + dr, c + dc):
                return True
        
        path.pop()  # Backtrack
        return False
    
    backtrack(start[0], start[1])
    return path`,javascript:`function findPath(maze, start, end) {
    const rows = maze.length, cols = maze[0].length;
    const visited = new Set();
    const path = [];
    
    function backtrack(r, c) {
        if (r < 0 || r >= rows ||
            c < 0 || c >= cols) return false;
        if (maze[r][c] === 1 ||
            visited.has(\`\${r}-\${c}\`)) return false;
        
        visited.add(\`\${r}-\${c}\`);
        path.push([r, c]);
        
        if (r === end[0] && c === end[1])
            return true;
        
        // Try all 4 directions
        const dirs = [[0,1],[1,0],[0,-1],[-1,0]];
        for (const [dr, dc] of dirs) {
            if (backtrack(r+dr, c+dc)) return true;
        }
        
        path.pop(); // Backtrack
        return false;
    }
    
    backtrack(start[0], start[1]);
    return path;
}`,cpp:`bool findPath(vector<vector<int>>& maze,
    int r, int c, int er, int ec,
    vector<vector<bool>>& visited,
    vector<pair<int,int>>& path) {
    
    int rows = maze.size(), cols = maze[0].size();
    if (r < 0 || r >= rows || c < 0 || c >= cols)
        return false;
    if (maze[r][c] == 1 || visited[r][c])
        return false;
    
    visited[r][c] = true;
    path.push_back({r, c});
    
    if (r == er && c == ec) return true;
    
    int dr[] = {0,1,0,-1};
    int dc[] = {1,0,-1,0};
    
    for (int d = 0; d < 4; d++) {
        if (findPath(maze, r+dr[d], c+dc[d],
            er, ec, visited, path))
            return true;
    }
    
    path.pop_back(); // Backtrack
    return false;
}`},$=50;return e.jsxs("div",{style:ce.container,children:[e.jsxs("div",{style:ce.card,children:[e.jsx("h3",{style:ce.cardTitle,children:"Maze Path Finder — Escape the Labyrinth"}),e.jsx("p",{style:ce.cardDesc,children:"Find a path from start (top-left) to exit (bottom-right) using backtracking. The algorithm explores each direction, marks visited cells, and backtracks at dead ends."}),e.jsx("div",{style:ce.messageBox,children:a}),e.jsx("div",{style:{display:"flex",justifyContent:"center",marginBottom:"20px"},children:e.jsx("div",{style:{display:"inline-grid",gridTemplateColumns:`repeat(${et}, ${$}px)`,gap:"0px",borderRadius:"12px",overflow:"hidden",boxShadow:"0 4px 16px rgba(0,0,0,0.1)",border:"3px solid #1E293B"},children:$e.map((v,D)=>v.map((z,E)=>e.jsx(q.div,{animate:{backgroundColor:H(D,E)},transition:{duration:.2},className:t[`${D}-${E}`]==="yellow"||t[`${D}-${E}`]==="green"?"pulse-glow":"",style:{width:$,height:$,display:"flex",alignItems:"center",justifyContent:"center",border:M(D,E),fontSize:"1.2rem",userSelect:"none",color:$e[D][E]===1?"#475569":"#1E293B",fontWeight:"700",boxShadow:t[`${D}-${E}`]==="green"?"0 0 10px rgba(34, 197, 94, 0.4)":"none"},children:D===0&&E===0?"🟢":D===ot-1&&E===et-1?"🏁":$e[D][E]===1?"🧱":""},`${D}-${E}`)))})}),e.jsxs("div",{style:ce.legend,children:[e.jsxs("div",{style:ce.legendItem,children:[e.jsx("div",{style:{...ce.colorBox,background:"#FEF9C3",border:"2px solid #FACC15"}})," Current Path"]}),e.jsxs("div",{style:ce.legendItem,children:[e.jsx("div",{style:{...ce.colorBox,background:"#DBEAFE",border:"2px solid #3B82F6"}})," Visited"]}),e.jsxs("div",{style:ce.legendItem,children:[e.jsx("div",{style:{...ce.colorBox,background:"#DCFCE7",border:"2px solid #22C55E"}})," Correct Path"]}),e.jsxs("div",{style:ce.legendItem,children:[e.jsx("div",{style:{...ce.colorBox,background:"#FEE2E2",border:"2px solid #EF4444"}})," Dead End"]})]}),e.jsxs("div",{style:ce.controls,children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx("button",{onClick:()=>{l(),j(!1)},disabled:o,style:ce.primaryBtn,children:"▶ Find the Exit! 🏁"}),I&&!o&&e.jsx("div",{className:"tooltip-hint",style:{bottom:"110%",left:"50%"},children:"Let's escape the maze! ✨"})]}),e.jsx("button",{onClick:()=>{y(),j(!1)},disabled:o,style:ce.secondaryBtn,children:"⏭ Take a Step"}),e.jsx("button",{onClick:B,style:ce.dangerBtn,children:"↺ Reset Maze"})]})]}),e.jsxs("div",{style:ce.card,children:[e.jsxs("div",{style:ce.codeHeader,children:[e.jsx("h3",{style:{margin:0},children:"Solution Code"}),e.jsx("div",{style:ce.langSelector,children:["python","javascript","cpp"].map(v=>e.jsx("button",{onClick:()=>b(v),style:{...ce.langBtn,background:u===v?"#4F46E5":"transparent",color:u===v?"#fff":"#64748B"},children:v==="cpp"?"C++":v.charAt(0).toUpperCase()+v.slice(1)},v))})]}),e.jsx("pre",{style:ce.pre,children:e.jsx("code",{children:T[u]})})]})]})},ce={container:{display:"flex",flexDirection:"column",gap:"2rem",padding:"1rem"},card:{background:"white",borderRadius:"16px",padding:"28px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)"},cardTitle:{margin:"0 0 10px 0",fontSize:"1.5rem",fontWeight:"800",color:"#1E293B"},cardDesc:{margin:"0 0 20px 0",color:"#64748B",lineHeight:"1.6"},messageBox:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",marginBottom:"24px",minHeight:"56px",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:"1.5"},legend:{display:"flex",gap:"20px",justifyContent:"center",marginBottom:"20px",flexWrap:"wrap"},legendItem:{display:"flex",alignItems:"center",gap:"8px",fontSize:"0.9rem",color:"#64748B"},colorBox:{width:"16px",height:"16px",borderRadius:"4px"},controls:{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap"},primaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer",fontSize:"0.95rem"},secondaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer",fontSize:"0.95rem"},dangerBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer",fontSize:"0.95rem"},codeHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",flexWrap:"wrap",gap:"12px"},langSelector:{display:"flex",gap:"8px",background:"#F1F5F9",padding:"4px",borderRadius:"10px"},langBtn:{border:"none",padding:"4px 12px",borderRadius:"6px",fontSize:"0.85rem",fontWeight:"600",cursor:"pointer",transition:"all 0.2s"},pre:{background:"#0F172A",color:"#E2E8F0",padding:"20px",borderRadius:"12px",overflowX:"auto",fontSize:"0.9rem",lineHeight:"1.6",fontFamily:"monospace",margin:0}},ci=t=>new Promise(n=>setTimeout(n,t)),pi=[{id:"nqueens",title:"N-Queens",difficulty:"Hard",tag:"♛",description:"Place N queens on an N×N chessboard so that no two queens threaten each other. Return all distinct solutions.",example:'n = 4 => [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]',algorithm:"Place queens row by row. For each row, try every column. If no conflict found, recurse to the next row. Backtrack when all columns conflict.",python:`def solveNQueens(n):
    result = []
    board = [['.' for _ in range(n)] for _ in range(n)]
    
    def is_safe(r, c):
        for i in range(r):
            if board[i][c] == 'Q': return False
        i, j = r-1, c-1
        while i >= 0 and j >= 0:
            if board[i][j] == 'Q': return False
            i -= 1; j -= 1
        i, j = r-1, c+1
        while i >= 0 and j < n:
            if board[i][j] == 'Q': return False
            i -= 1; j += 1
        return True
    
    def backtrack(row):
        if row == n:
            result.append([''.join(r) for r in board])
            return
        for col in range(n):
            if is_safe(row, col):
                board[row][col] = 'Q'
                backtrack(row + 1)
                board[row][col] = '.'
    
    backtrack(0)
    return result`,javascript:`function solveNQueens(n) {
    const result = [];
    const board = Array.from({length: n},
        () => Array(n).fill('.'));
    
    function isSafe(r, c) {
        for (let i = 0; i < r; i++)
            if (board[i][c] === 'Q') return false;
        for (let i=r-1,j=c-1; i>=0 && j>=0; i--,j--)
            if (board[i][j] === 'Q') return false;
        for (let i=r-1,j=c+1; i>=0 && j<n; i--,j++)
            if (board[i][j] === 'Q') return false;
        return true;
    }
    
    function backtrack(row) {
        if (row === n) {
            result.push(board.map(r => r.join('')));
            return;
        }
        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row][col] = 'Q';
                backtrack(row + 1);
                board[row][col] = '.';
            }
        }
    }
    backtrack(0);
    return result;
}`,cpp:`vector<vector<string>> solveNQueens(int n) {
    vector<vector<string>> res;
    vector<string> board(n, string(n, '.'));
    
    function<void(int)> bt = [&](int row) {
        if (row == n) {
            res.push_back(board); return;
        }
        for (int c = 0; c < n; c++) {
            if (isSafe(board, row, c, n)) {
                board[row][c] = 'Q';
                bt(row + 1);
                board[row][c] = '.';
            }
        }
    };
    bt(0);
    return res;
}`},{id:"sudoku",title:"Sudoku Solver",difficulty:"Hard",tag:"🔢",description:"Write a program to solve a Sudoku puzzle by filling the empty cells. Each row, column, and 3×3 sub-box must contain digits 1-9.",example:"Fill the 9×9 grid following Sudoku rules",algorithm:"Find the first empty cell. Try digits 1-9, checking row/column/box constraints. Recurse on the next empty cell. Backtrack if no digit works.",python:`def solveSudoku(board):
    def is_valid(r, c, num):
        for i in range(9):
            if board[r][i] == num: return False
            if board[i][c] == num: return False
        r0, c0 = 3*(r//3), 3*(c//3)
        for i in range(r0, r0+3):
            for j in range(c0, c0+3):
                if board[i][j] == num: return False
        return True
    
    def backtrack():
        for r in range(9):
            for c in range(9):
                if board[r][c] == '.':
                    for num in '123456789':
                        if is_valid(r, c, num):
                            board[r][c] = num
                            if backtrack(): return True
                            board[r][c] = '.'
                    return False
        return True
    backtrack()`,javascript:`function solveSudoku(board) {
    function isValid(r, c, num) {
        for (let i = 0; i < 9; i++) {
            if (board[r][i] === num) return false;
            if (board[i][c] === num) return false;
        }
        const r0 = Math.floor(r/3)*3;
        const c0 = Math.floor(c/3)*3;
        for (let i=r0; i<r0+3; i++)
            for (let j=c0; j<c0+3; j++)
                if (board[i][j] === num) return false;
        return true;
    }
    function backtrack() {
        for (let r = 0; r < 9; r++)
            for (let c = 0; c < 9; c++) {
                if (board[r][c] === '.') {
                    for (let n=1; n<=9; n++) {
                        const ch = String(n);
                        if (isValid(r, c, ch)) {
                            board[r][c] = ch;
                            if (backtrack()) return true;
                            board[r][c] = '.';
                        }
                    }
                    return false;
                }
            }
        return true;
    }
    backtrack();
}`,cpp:`void solveSudoku(vector<vector<char>>& board) {
    auto isValid = [&](int r, int c, char ch) {
        for (int i = 0; i < 9; i++) {
            if (board[r][i] == ch) return false;
            if (board[i][c] == ch) return false;
        }
        int r0=3*(r/3), c0=3*(c/3);
        for (int i=r0; i<r0+3; i++)
            for (int j=c0; j<c0+3; j++)
                if (board[i][j] == ch) return false;
        return true;
    };
    function<bool()> bt = [&]() {
        for (int r=0;r<9;r++) for (int c=0;c<9;c++) {
            if (board[r][c]=='.') {
                for (char ch='1';ch<='9';ch++) {
                    if (isValid(r,c,ch)) {
                        board[r][c]=ch;
                        if (bt()) return true;
                        board[r][c]='.';
                    }
                }
                return false;
            }
        }
        return true;
    };
    bt();
}`},{id:"ratmaze",title:"Rat in a Maze",difficulty:"Medium",tag:"🐀",description:"Given an N×N maze with 0s (walls) and 1s (paths), find all paths from (0,0) to (N-1,N-1). The rat can move in 4 directions.",example:"maze = [[1,0,0],[1,1,0],[0,1,1]] => Path exists",algorithm:"Start at (0,0). Try each direction. Mark cells as visited. If you reach the destination, save the path. Backtrack to explore all possibilities.",python:`def ratInMaze(maze, n):
    result = []
    visited = [[False]*n for _ in range(n)]
    path = []
    
    def solve(r, c):
        if r==n-1 and c==n-1:
            path.append((r,c))
            result.append(path[:])
            path.pop()
            return
        if r<0 or r>=n or c<0 or c>=n: return
        if maze[r][c]==0 or visited[r][c]: return
        
        visited[r][c] = True
        path.append((r,c))
        for dr,dc in [(0,1),(1,0),(0,-1),(-1,0)]:
            solve(r+dr, c+dc)
        path.pop()
        visited[r][c] = False
    
    solve(0, 0)
    return result`,javascript:`function ratInMaze(maze, n) {
    const result = [];
    const visited = Array.from({length: n},
        () => Array(n).fill(false));
    const path = [];
    
    function solve(r, c) {
        if (r === n-1 && c === n-1) {
            path.push([r,c]);
            result.push([...path]);
            path.pop(); return;
        }
        if (r<0||r>=n||c<0||c>=n) return;
        if (!maze[r][c] || visited[r][c]) return;
        visited[r][c] = true;
        path.push([r,c]);
        for (const [dr,dc] of [[0,1],[1,0],[0,-1],[-1,0]])
            solve(r+dr, c+dc);
        path.pop();
        visited[r][c] = false;
    }
    solve(0, 0);
    return result;
}`,cpp:`void solve(vector<vector<int>>& maze, int r, int c,
    int n, vector<vector<bool>>& vis,
    vector<pair<int,int>>& path,
    vector<vector<pair<int,int>>>& res) {
    if (r==n-1 && c==n-1) {
        path.push_back({r,c});
        res.push_back(path);
        path.pop_back(); return;
    }
    if (r<0||r>=n||c<0||c>=n) return;
    if (!maze[r][c] || vis[r][c]) return;
    vis[r][c]=true; path.push_back({r,c});
    int dr[]={0,1,0,-1}, dc[]={1,0,-1,0};
    for (int d=0;d<4;d++)
        solve(maze,r+dr[d],c+dc[d],n,vis,path,res);
    path.pop_back(); vis[r][c]=false;
}`},{id:"parens",title:"Generate Parentheses",difficulty:"Medium",tag:"🔗",description:"Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.",example:'n = 3 => ["((()))","(()())","(())()","()(())","()()()"]',algorithm:'At each step, add "(" if open count < n, or ")" if close count < open count. When length reaches 2n, add to result.',python:`def generateParenthesis(n):
    result = []
    
    def backtrack(s, open_count, close_count):
        if len(s) == 2 * n:
            result.append(s)
            return
        if open_count < n:
            backtrack(s + '(', open_count + 1, close_count)
        if close_count < open_count:
            backtrack(s + ')', open_count, close_count + 1)
    
    backtrack('', 0, 0)
    return result`,javascript:`function generateParenthesis(n) {
    const result = [];
    function backtrack(s, open, close) {
        if (s.length === 2 * n) {
            result.push(s); return;
        }
        if (open < n)
            backtrack(s + '(', open + 1, close);
        if (close < open)
            backtrack(s + ')', open, close + 1);
    }
    backtrack('', 0, 0);
    return result;
}`,cpp:`vector<string> generateParenthesis(int n) {
    vector<string> res;
    function<void(string, int, int)> bt =
        [&](string s, int op, int cl) {
        if (s.size() == 2*n) {
            res.push_back(s); return;
        }
        if (op < n) bt(s+'(', op+1, cl);
        if (cl < op) bt(s+')', op, cl+1);
    };
    bt("", 0, 0);
    return res;
}`},{id:"permutations",title:"Permutations",difficulty:"Medium",tag:"🔀",description:"Given an array of distinct integers, return all possible permutations in any order.",example:"[1,2,3] => [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",algorithm:"Use a visited array. At each step, pick an unused element, add it, recurse, then remove it (backtrack).",python:`def permute(nums):
    result = []
    path = []
    used = [False] * len(nums)
    
    def backtrack():
        if len(path) == len(nums):
            result.append(path[:])
            return
        for i in range(len(nums)):
            if not used[i]:
                used[i] = True
                path.append(nums[i])
                backtrack()
                path.pop()
                used[i] = False
    
    backtrack()
    return result`,javascript:`function permute(nums) {
    const result = [];
    const path = [];
    const used = Array(nums.length).fill(false);
    
    function backtrack() {
        if (path.length === nums.length) {
            result.push([...path]); return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (!used[i]) {
                used[i] = true;
                path.push(nums[i]);
                backtrack();
                path.pop();
                used[i] = false;
            }
        }
    }
    backtrack();
    return result;
}`,cpp:`vector<vector<int>> permute(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> path;
    vector<bool> used(nums.size(), false);
    function<void()> bt = [&]() {
        if (path.size() == nums.size()) {
            res.push_back(path); return;
        }
        for (int i=0; i<nums.size(); i++) {
            if (!used[i]) {
                used[i]=true; path.push_back(nums[i]);
                bt();
                path.pop_back(); used[i]=false;
            }
        }
    };
    bt();
    return res;
}`},{id:"combsum",title:"Combination Sum",difficulty:"Medium",tag:"➕",description:"Given an array of distinct integers candidates and a target, return all unique combinations that sum to target. Numbers may be reused.",example:"candidates = [2,3,6,7], target = 7 => [[2,2,3],[7]]",algorithm:"Sort candidates. For each candidate, if it does not exceed the remaining target, include it and recurse with updated target. Skip to avoid duplicates.",python:`def combinationSum(candidates, target):
    result = []
    candidates.sort()
    
    def backtrack(start, path, remaining):
        if remaining == 0:
            result.append(path[:])
            return
        for i in range(start, len(candidates)):
            if candidates[i] > remaining:
                break
            path.append(candidates[i])
            backtrack(i, path, remaining - candidates[i])
            path.pop()
    
    backtrack(0, [], target)
    return result`,javascript:`function combinationSum(candidates, target) {
    const result = [];
    candidates.sort((a,b) => a-b);
    
    function backtrack(start, path, remaining) {
        if (remaining === 0) {
            result.push([...path]); return;
        }
        for (let i = start; i < candidates.length; i++) {
            if (candidates[i] > remaining) break;
            path.push(candidates[i]);
            backtrack(i, path, remaining - candidates[i]);
            path.pop();
        }
    }
    backtrack(0, [], target);
    return result;
}`,cpp:`vector<vector<int>> combinationSum(
    vector<int>& cands, int target) {
    vector<vector<int>> res;
    vector<int> path;
    sort(cands.begin(), cands.end());
    function<void(int,int)> bt = [&](int s, int rem) {
        if (rem == 0) { res.push_back(path); return; }
        for (int i=s; i<cands.size(); i++) {
            if (cands[i] > rem) break;
            path.push_back(cands[i]);
            bt(i, rem - cands[i]);
            path.pop_back();
        }
    };
    bt(0, target);
    return res;
}`},{id:"wordsearch",title:"Word Search",difficulty:"Medium",tag:"🔤",description:"Given an m×n board and a word, find if the word exists in the grid by moving to adjacent cells (no cell used twice).",example:'board = [["A","B"],["C","D"]], word = "ABDC" => true',algorithm:"From every cell matching the first character, DFS in 4 directions. Mark cells visited during search. Backtrack (unmark) when returning.",python:`def exist(board, word):
    rows, cols = len(board), len(board[0])
    
    def dfs(r, c, idx):
        if idx == len(word): return True
        if r<0 or r>=rows or c<0 or c>=cols:
            return False
        if board[r][c] != word[idx]: return False
        
        temp = board[r][c]
        board[r][c] = '#'  # mark visited
        
        for dr, dc in [(0,1),(1,0),(0,-1),(-1,0)]:
            if dfs(r+dr, c+dc, idx+1):
                return True
        
        board[r][c] = temp  # backtrack
        return False
    
    for r in range(rows):
        for c in range(cols):
            if dfs(r, c, 0): return True
    return False`,javascript:`function exist(board, word) {
    const rows = board.length, cols = board[0].length;
    function dfs(r, c, idx) {
        if (idx === word.length) return true;
        if (r<0||r>=rows||c<0||c>=cols) return false;
        if (board[r][c] !== word[idx]) return false;
        
        const temp = board[r][c];
        board[r][c] = '#';
        
        for (const [dr,dc] of [[0,1],[1,0],[0,-1],[-1,0]])
            if (dfs(r+dr, c+dc, idx+1)) return true;
        
        board[r][c] = temp; // backtrack
        return false;
    }
    for (let r=0; r<rows; r++)
        for (let c=0; c<cols; c++)
            if (dfs(r, c, 0)) return true;
    return false;
}`,cpp:`bool exist(vector<vector<char>>& board,
    string word) {
    int rows=board.size(), cols=board[0].size();
    function<bool(int,int,int)> dfs =
        [&](int r, int c, int idx) -> bool {
        if (idx == word.size()) return true;
        if (r<0||r>=rows||c<0||c>=cols) return false;
        if (board[r][c] != word[idx]) return false;
        char tmp = board[r][c];
        board[r][c] = '#';
        int dr[]={0,1,0,-1}, dc[]={1,0,-1,0};
        for (int d=0; d<4; d++)
            if (dfs(r+dr[d],c+dc[d],idx+1))
                return true;
        board[r][c] = tmp;
        return false;
    };
    for (int r=0; r<rows; r++)
        for (int c=0; c<cols; c++)
            if (dfs(r,c,0)) return true;
    return false;
}`},{id:"palindrome",title:"Palindrome Partitioning",difficulty:"Hard",tag:"🪞",description:"Given a string s, partition it such that every substring of the partition is a palindrome. Return all possible palindrome partitionings.",example:'"aab" => [["a","a","b"],["aa","b"]]',algorithm:"At each index, try every possible substring starting there. If it is a palindrome, add it and recurse on the rest. Backtrack when done.",python:`def partition(s):
    result = []
    path = []
    
    def is_palindrome(sub):
        return sub == sub[::-1]
    
    def backtrack(start):
        if start == len(s):
            result.append(path[:])
            return
        for end in range(start + 1, len(s) + 1):
            sub = s[start:end]
            if is_palindrome(sub):
                path.append(sub)
                backtrack(end)
                path.pop()
    
    backtrack(0)
    return result`,javascript:`function partition(s) {
    const result = [];
    const path = [];
    function isPalin(str) {
        let l = 0, r = str.length - 1;
        while (l < r) {
            if (str[l] !== str[r]) return false;
            l++; r--;
        }
        return true;
    }
    function backtrack(start) {
        if (start === s.length) {
            result.push([...path]); return;
        }
        for (let end = start+1; end <= s.length; end++) {
            const sub = s.slice(start, end);
            if (isPalin(sub)) {
                path.push(sub);
                backtrack(end);
                path.pop();
            }
        }
    }
    backtrack(0);
    return result;
}`,cpp:`vector<vector<string>> partition(string s) {
    vector<vector<string>> res;
    vector<string> path;
    auto isPalin = [](const string& s) {
        int l=0, r=s.size()-1;
        while (l<r) if (s[l++]!=s[r--]) return false;
        return true;
    };
    function<void(int)> bt = [&](int i) {
        if (i == s.size()) {
            res.push_back(path); return;
        }
        for (int j=i+1; j<=s.size(); j++) {
            string sub = s.substr(i, j-i);
            if (isPalin(sub)) {
                path.push_back(sub);
                bt(j);
                path.pop_back();
            }
        }
    };
    bt(0);
    return res;
}`}],ui=({title:t,steps:n,initState:a})=>{const[d,o]=i.useState(0),[x,u]=i.useState(!1),[b,C]=i.useState(!1),[R,I]=i.useState(a),j=i.useRef(!1),A=()=>{j.current=!0,setTimeout(()=>{j.current=!1},100),o(0),u(!1),C(!1),I(a)},r=async()=>{j.current=!1,C(!0),u(!1);for(let l=0;l<n.length;l++){if(j.current)return;o(l),I(n[l].state),await ci(900)}u(!0),C(!1),o(n.length-1)},c=()=>{if(x||b)return;const l=Math.min(d+1,n.length-1);o(l),I(n[l].state),l===n.length-1&&u(!0)},p=n[d];return e.jsxs("div",{style:Ae.wrap,children:[e.jsx("div",{style:Ae.desc,children:t}),e.jsxs("div",{style:Ae.vizArea,children:[e.jsx("div",{style:{display:"flex",gap:"6px",alignItems:"flex-end",justifyContent:"center",flexWrap:"wrap",marginBottom:"12px"},children:R.map((l,y)=>e.jsx("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},children:e.jsx("div",{style:{...Ae.cell,backgroundColor:l.color||"#F1F5F9",border:`2px solid ${l.border||"#cbd5e1"}`,minWidth:l.label?"50px":"40px",fontSize:l.label?"0.7rem":"0.9rem"},children:l.label||l.val})},y))}),p&&e.jsx("div",{style:Ae.msg,children:p.msg})]}),e.jsxs("div",{style:Ae.controls,children:[e.jsx("button",{onClick:r,disabled:b,style:Ae.btn("#4F46E5"),children:"▶ Start Animation"}),e.jsx("button",{onClick:c,disabled:b||x,style:Ae.btn("#0891b2"),children:"⏭ Next Step"}),e.jsx("button",{onClick:A,style:Ae.btn("#ef4444"),children:"↺ Reset"})]})]})},mi=[{msg:"Try placing queen at row 0, col 0",state:[{label:"Q",color:"#FEF9C3",border:"#FACC15"},{val:"·"},{val:"·"},{val:"·"}]},{msg:"✅ Safe! Try row 1. Col 0 conflict, col 1 conflict",state:[{label:"Q",color:"#DCFCE7",border:"#22C55E"},{val:"·"},{val:"·",color:"#FEE2E2",border:"#EF4444"},{val:"·"}]},{msg:"✅ Place queen at (1, 2). Move to row 2",state:[{label:"Q",color:"#DCFCE7",border:"#22C55E"},{val:"·"},{label:"Q",color:"#DCFCE7",border:"#22C55E"},{val:"·"}]},{msg:"❌ No valid col in row 2. Backtrack!",state:[{label:"Q",color:"#DCFCE7",border:"#22C55E"},{val:"·"},{label:"Q",color:"#DBEAFE",border:"#3B82F6"},{val:"·"}]},{msg:"✅ Found solution: [1,3,0,2]",state:[{val:"·"},{label:"Q",color:"#DCFCE7",border:"#22C55E"},{val:"·"},{label:"Q",color:"#DCFCE7",border:"#22C55E"}]}],hi=[{msg:"Find empty cell at (0,2). Try 1...",state:[{val:"5"},{val:"3"},{val:"?",color:"#FEF9C3",border:"#FACC15"},{val:"6"},{val:"7"}]},{msg:"1 invalid (row conflict). Try 2...",state:[{val:"5"},{val:"3"},{val:"1",color:"#FEE2E2",border:"#EF4444"},{val:"6"},{val:"7"}]},{msg:"✅ 4 is valid! Place it.",state:[{val:"5"},{val:"3"},{val:"4",color:"#DCFCE7",border:"#22C55E"},{val:"6"},{val:"7"}]},{msg:"Move to next empty cell...",state:[{val:"5"},{val:"3"},{val:"4",color:"#DCFCE7",border:"#22C55E"},{val:"6"},{val:"7",color:"#FEF9C3",border:"#FACC15"}]}],fi=[{msg:"Start at (0,0). Try moving right.",state:[{label:"🐀",color:"#FEF9C3",border:"#FACC15"},{val:"→"},{val:"·"},{val:"·"}]},{msg:"Move to (0,1). Wall! Backtrack.",state:[{label:"🐀",color:"#DCFCE7",border:"#22C55E"},{val:"🧱",color:"#FEE2E2",border:"#EF4444"},{val:"·"},{val:"·"}]},{msg:"Try down. Move to (1,0).",state:[{label:"✓",color:"#DCFCE7",border:"#22C55E"},{val:"·"},{val:"·"},{label:"🐀",color:"#FEF9C3",border:"#FACC15"}]},{msg:"✅ Reached destination!",state:[{label:"✓",color:"#DCFCE7",border:"#22C55E"},{val:"·"},{val:"·"},{label:"🏁",color:"#DCFCE7",border:"#22C55E"}]}],gi=[{msg:'Start: "". Open < 3, add "("',state:[{label:"(",color:"#FEF9C3",border:"#FACC15"}]},{msg:'"((" — open still < 3, add "("',state:[{label:"(",color:"#DCFCE7",border:"#22C55E"},{label:"(",color:"#FEF9C3",border:"#FACC15"}]},{msg:'"(((" — open = 3. Only ")" allowed',state:[{label:"(",color:"#DCFCE7",border:"#22C55E"},{label:"(",color:"#DCFCE7",border:"#22C55E"},{label:"(",color:"#DCFCE7",border:"#22C55E"},{label:")",color:"#FEF9C3",border:"#FACC15"}]},{msg:'✅ "((())) " — complete!',state:"((()))".split("").map(t=>({label:t,color:"#DCFCE7",border:"#22C55E"}))}],xi=[{msg:"Pick 1 first. Remaining: [2,3]",state:[{val:1,color:"#FEF9C3",border:"#FACC15"},{val:2},{val:3}]},{msg:"[1,2,3] — permutation found!",state:[{val:1,color:"#DCFCE7",border:"#22C55E"},{val:2,color:"#DCFCE7",border:"#22C55E"},{val:3,color:"#DCFCE7",border:"#22C55E"}]},{msg:"Backtrack. Try [1,3,2]",state:[{val:1,color:"#DCFCE7",border:"#22C55E"},{val:3,color:"#FEF9C3",border:"#FACC15"},{val:2,color:"#FEF9C3",border:"#FACC15"}]},{msg:"✅ [1,3,2] — another permutation!",state:[{val:1,color:"#DCFCE7",border:"#22C55E"},{val:3,color:"#DCFCE7",border:"#22C55E"},{val:2,color:"#DCFCE7",border:"#22C55E"}]}],bi=[{msg:"Target=7. Try candidate 2.",state:[{val:2,color:"#FEF9C3",border:"#FACC15"},{val:3},{val:6},{val:7}]},{msg:"[2,2,2] sum=6. Add one more 2? 8 > 7. Try 3.",state:[{val:2,color:"#DCFCE7",border:"#22C55E"},{val:2,color:"#DCFCE7",border:"#22C55E"},{val:3,color:"#FEF9C3",border:"#FACC15"}]},{msg:"✅ [2,2,3] sum=7!",state:[{val:2,color:"#DCFCE7",border:"#22C55E"},{val:2,color:"#DCFCE7",border:"#22C55E"},{val:3,color:"#DCFCE7",border:"#22C55E"}]},{msg:"Backtrack. Try [7]. ✅ Sum=7!",state:[{val:7,color:"#DCFCE7",border:"#22C55E"}]}],yi=[{msg:'Search "ABC". Start at (0,0)=A ✅',state:[{label:"A",color:"#FEF9C3",border:"#FACC15"},{label:"B"},{label:"C"},{label:"D"}]},{msg:"Move right to (0,1)=B ✅",state:[{label:"A",color:"#DCFCE7",border:"#22C55E"},{label:"B",color:"#FEF9C3",border:"#FACC15"},{label:"C"},{label:"D"}]},{msg:"Move right to (0,2)=C ✅ Found!",state:[{label:"A",color:"#DCFCE7",border:"#22C55E"},{label:"B",color:"#DCFCE7",border:"#22C55E"},{label:"C",color:"#DCFCE7",border:"#22C55E"},{label:"D"}]}],ji=[{msg:'"aab": Try "a" — palindrome ✅',state:[{label:"a",color:"#FEF9C3",border:"#FACC15"},{label:"a"},{label:"b"}]},{msg:'"a","a" — both palindromes ✅',state:[{label:"a",color:"#DCFCE7",border:"#22C55E"},{label:"a",color:"#FEF9C3",border:"#FACC15"},{label:"b"}]},{msg:'"a","a","b" all palindromes ✅',state:[{label:"a",color:"#DCFCE7",border:"#22C55E"},{label:"a",color:"#DCFCE7",border:"#22C55E"},{label:"b",color:"#DCFCE7",border:"#22C55E"}]},{msg:'Try "aa" — palindrome! "b" ✅',state:[{label:"aa",color:"#DCFCE7",border:"#22C55E"},{label:"b",color:"#DCFCE7",border:"#22C55E"}]}],vi={nqueens:{title:"N-Queens Backtracking",steps:mi},sudoku:{title:"Sudoku Cell-by-Cell",steps:hi},ratmaze:{title:"Rat in Maze DFS",steps:fi},parens:{title:"Generate Parentheses",steps:gi},permutations:{title:"Permutations Builder",steps:xi},combsum:{title:"Combination Sum Search",steps:bi},wordsearch:{title:"Word Search DFS",steps:yi},palindrome:{title:"Palindrome Partitioning",steps:ji}},Si=({id:t})=>{const n=vi[t];return n?e.jsx(ui,{title:n.title,steps:n.steps,initState:n.steps[0].state}):null},Wt=t=>{switch(t){case"Easy":return"#22C55E";case"Medium":return"#F59E0B";case"Hard":return"#EF4444";default:return"#64748B"}},wi=()=>{const[t,n]=i.useState(null),[a,d]=i.useState("javascript");return e.jsx("div",{className:"bt-container",children:e.jsxs("div",{className:"bt-split-layout",children:[e.jsxs("div",{className:"bt-left-panel",children:[e.jsxs("div",{style:{marginBottom:"20px"},children:[e.jsx("h3",{style:{margin:"0 0 8px 0",fontSize:"1.5rem",color:"#1E293B",fontWeight:"800"},children:"Practice Problems"}),e.jsx("p",{style:{margin:0,color:"#64748B",fontSize:"1rem",lineHeight:"1.5"},children:"Master Backtracking with these classic coding interview questions."})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"16px",overflowY:"auto"},children:pi.map(o=>e.jsxs(q.div,{onClick:()=>{n(o),d("javascript")},whileHover:{scale:1.02,y:-2},whileTap:{scale:.98},style:{background:"white",borderRadius:"14px",padding:"16px",boxShadow:"0 4px 10px rgba(0,0,0,0.05)",cursor:"pointer",border:t?.id===o.id?"2px solid #4F46E5":"2px solid transparent",transition:"border 0.2s ease",display:"flex",flexDirection:"column",gap:"10px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("h4",{style:{margin:0,color:"#1E293B",fontSize:"1.1rem",fontWeight:"bold"},children:[o.tag," ",o.title]}),e.jsx("span",{style:{background:Wt(o.difficulty)+"20",color:Wt(o.difficulty),padding:"4px 10px",borderRadius:"999px",fontSize:"0.8rem",fontWeight:"700"},children:o.difficulty})]}),e.jsx("p",{style:{margin:0,color:"#64748B",fontSize:"0.9rem",lineHeight:"1.5",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"},children:o.description})]},o.id))})]}),e.jsx("div",{className:"bt-right-panel",children:e.jsx(X,{mode:"wait",children:t?e.jsxs(q.div,{initial:{opacity:0,x:20},animate:{opacity:1,x:0},exit:{opacity:0,x:-20},transition:{duration:.3},className:"bt-solution-viewer",children:[e.jsxs("div",{style:{borderBottom:"2px solid #F1F5F9",paddingBottom:"20px",marginBottom:"20px"},children:[e.jsxs("h2",{style:{margin:"0 0 10px 0",fontSize:"1.8rem",color:"#1E293B",fontWeight:"800"},children:[t.tag," ",t.title]}),e.jsx("p",{style:{margin:"0 0 16px 0",color:"#475569",fontSize:"1.05rem",lineHeight:"1.6"},children:t.description}),e.jsxs("div",{style:{background:"#F8FAFC",padding:"12px 16px",borderRadius:"8px",borderLeft:"4px solid #4F46E5"},children:[e.jsx("span",{style:{fontWeight:"bold",color:"#1E293B"},children:"Example: "}),e.jsx("code",{style:{color:"#4F46E5",fontFamily:"monospace",fontSize:"0.95rem"},children:t.example})]})]}),e.jsxs("div",{style:{marginBottom:"24px"},children:[e.jsx("h3",{style:{margin:"0 0 16px 0",fontSize:"1.3rem",color:"#1E293B"},children:"Visualization & Animation"}),e.jsx("div",{style:{background:"#F8FAFC",padding:"24px",borderRadius:"16px",border:"1px solid #E2E8F0",boxShadow:"inset 0 2px 4px rgba(0,0,0,0.02)"},children:e.jsx(Si,{id:t.id})})]}),e.jsxs("div",{style:{marginBottom:"24px"},children:[e.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"1.3rem",color:"#1E293B"},children:"Algorithm Approach"}),e.jsxs("div",{style:{background:"#EEF2FF",color:"#312E81",padding:"16px",borderRadius:"12px",fontSize:"1rem",lineHeight:"1.6"},children:["💡 ",t.algorithm]})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",flexWrap:"wrap",gap:"8px"},children:[e.jsx("h3",{style:{margin:0,fontSize:"1.3rem",color:"#1E293B"},children:"Solution Code"}),e.jsx("div",{style:{display:"flex",gap:"8px",background:"#F1F5F9",padding:"4px",borderRadius:"10px"},children:["python","javascript","cpp"].map(o=>e.jsx("button",{onClick:()=>d(o),style:{padding:"6px 14px",borderRadius:"6px",border:"none",fontWeight:"600",cursor:"pointer",transition:"all 0.2s",fontSize:"0.85rem",background:a===o?"#fff":"transparent",color:a===o?"#4F46E5":"#64748B",boxShadow:a===o?"0 2px 4px rgba(0,0,0,0.05)":"none"},children:o==="cpp"?"C++":o.charAt(0).toUpperCase()+o.slice(1)},o))})]}),e.jsx("pre",{style:{background:"#0F172A",color:"#E2E8F0",padding:"20px",borderRadius:"12px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",margin:0,fontFamily:'"Fira Code", monospace',boxShadow:"inset 0 2px 4px rgba(0,0,0,0.1)"},children:e.jsx("code",{children:t[a]})})]})]},t.id):e.jsxs(q.div,{initial:{opacity:0},animate:{opacity:1},style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",color:"#94A3B8"},children:[e.jsx("div",{style:{fontSize:"4rem",marginBottom:"16px"},children:"↩️"}),e.jsx("h3",{style:{margin:0},children:"Select a problem to view its solution"})]})})})]})})},Ae={wrap:{display:"flex",flexDirection:"column",gap:"12px"},desc:{fontSize:"0.9rem",color:"#64748B",lineHeight:"1.6",backgroundColor:"#F1F5F9",borderRadius:"10px",padding:"10px 14px"},vizArea:{backgroundColor:"#F8FAFC",border:"1px solid #E2E8F0",borderRadius:"14px",padding:"20px",display:"flex",flexDirection:"column",gap:"12px",alignItems:"center",minHeight:"120px"},cell:{width:"40px",height:"40px",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"900",fontSize:"0.9rem",color:"#1E293B",transition:"background-color 0.3s, outline 0.2s"},msg:{backgroundColor:"#1E293B",color:"#fff",padding:"8px 16px",borderRadius:"10px",fontSize:"0.88rem",fontWeight:"700",textAlign:"center"},controls:{display:"flex",gap:"8px",justifyContent:"center",flexWrap:"wrap"},btn:t=>({padding:"8px 16px",borderRadius:"10px",border:"none",backgroundColor:t,color:"#fff",fontWeight:"700",cursor:"pointer",fontSize:"0.9rem"})},Tt=[{id:"nqueens",label:"N-Queens"},{id:"sudoku",label:"Sudoku Solver"},{id:"maze",label:"Maze Path Finder"},{id:"practice",label:"Practice Problems"}],Ci=({name:t})=>e.jsxs("div",{style:{padding:"3rem",textAlign:"center",color:"#64748b",fontFamily:"system-ui, sans-serif"},children:[e.jsx("div",{style:{fontSize:"3rem",marginBottom:"1rem"},children:"🚧"}),e.jsx("h3",{style:{fontSize:"1.5rem",fontWeight:"700",color:"#1e293b",marginBottom:"0.5rem"},children:t}),e.jsx("p",{style:{fontSize:"1rem"},children:"This metaphor is coming soon. Stay tuned!"})]}),ki=()=>{const[t,n]=i.useState("nqueens"),a=()=>{switch(t){case"nqueens":return e.jsx(ai,{});case"sudoku":return e.jsx(li,{});case"maze":return e.jsx(di,{});case"practice":return e.jsx(wi,{});default:return e.jsx(Ci,{name:Tt.find(d=>d.id===t)?.label})}};return e.jsx("div",{style:Fe.shell,children:e.jsxs("div",{style:Fe.contentWrapper,children:[e.jsxs("div",{style:Fe.heroSection,children:[e.jsx("h1",{style:Fe.heroTitle,children:"Backtracking"}),e.jsx("p",{style:Fe.heroSubtitle,children:"Backtracking algorithms explore all possible solutions to a problem by trying different choices and undoing them if they lead to a dead end."})]}),e.jsx("div",{style:Fe.topBar,children:e.jsx("div",{style:Fe.tabs,children:Tt.map(d=>e.jsxs("button",{style:{...Fe.tab,color:t===d.id?"#0f172a":"#64748b",opacity:t===d.id?1:.65,fontWeight:t===d.id?"700":"500"},onClick:()=>n(d.id),children:[d.label,t===d.id&&e.jsx(q.div,{layoutId:"activeTabUnderlineBT",style:Fe.activeUnderline,transition:{type:"spring",bounce:.2,duration:.5}})]},d.id))})}),e.jsx("div",{style:Fe.content,children:e.jsx(X,{mode:"wait",children:e.jsx(q.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},exit:{opacity:0},transition:{duration:.2,ease:"easeOut"},children:a()},t)})})]})})},Fe={shell:{width:"100%",minHeight:"100vh",backgroundColor:"#fff",fontFamily:"'Inter', system-ui, -apple-system, sans-serif"},contentWrapper:{maxWidth:"1100px",margin:"0 auto",padding:"0 1.5rem"},heroSection:{textAlign:"center",padding:"3rem 0 2rem 0"},heroTitle:{fontSize:"3rem",fontWeight:"900",color:"#0f172a",marginBottom:"0.75rem",letterSpacing:"-1.5px",lineHeight:"1.1"},heroSubtitle:{fontSize:"1.1rem",color:"#475569",maxWidth:"700px",margin:"0 auto",lineHeight:"1.6",opacity:.8},topBar:{display:"flex",justifyContent:"center",borderBottom:"1px solid #f1f5f9",marginBottom:"2rem",position:"sticky",top:"72px",backgroundColor:"rgba(255,255,255,0.8)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",zIndex:100,padding:"0.75rem 0",scrollMarginTop:"80px"},tabs:{display:"flex",gap:"0.5rem",padding:"0 1rem",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",maskImage:"linear-gradient(to right, transparent, black 5%, black 95%, transparent)",WebkitMaskImage:"linear-gradient(to right, transparent, black 5%, black 95%, transparent)"},tab:{padding:"0.6rem 1.2rem",background:"none",border:"none",fontSize:"0.875rem",cursor:"pointer",transition:"all 0.2s ease",display:"flex",alignItems:"center",gap:"10px",whiteSpace:"nowrap",borderRadius:"8px",position:"relative"},activeUnderline:{position:"absolute",bottom:"-0.5rem",left:"20%",right:"20%",height:"2px",backgroundColor:"#3b82f6",borderRadius:"2px"},content:{minHeight:"600px",marginBottom:"3rem"}},$t=[8,3,5,2,7,4],Fi=()=>{const[t,n]=i.useState([]),[a,d]=i.useState(-1),[o,x]=i.useState(!1),[u,b]=i.useState("A factory that processes tasks by splitting them into smaller ones, solving each, then combining."),[C,R]=i.useState("javascript"),{showFeedback:I}=le(),[j,A]=i.useState(!0),r=i.useRef(!1),c=()=>{const $=[],v=[...$t],D=(E,h,s,m,k)=>{$.push({type:"merge-start",arr:[...E],l:h,m:s,r:m,depth:k,msg:`Merging [${E.slice(h,s+1)}] and [${E.slice(s+1,m+1)}]`});const S=E.slice(h,s+1),g=E.slice(s+1,m+1);let f=0,F=0,w=h;for(;f<S.length&&F<g.length;)S[f]<=g[F]?E[w++]=S[f++]:E[w++]=g[F++];for(;f<S.length;)E[w++]=S[f++];for(;F<g.length;)E[w++]=g[F++];$.push({type:"merge-done",arr:[...E],l:h,r:m,depth:k,msg:`✅ Merged → [${E.slice(h,m+1)}]`,feedback:{msg:"Successfully combined! 🧩"}})},z=(E,h,s,m)=>{if(h>=s){$.push({type:"base",arr:[...E],l:h,r:s,depth:m,msg:`Base case: [${E[h]}]`});return}const k=Math.floor((h+s)/2);$.push({type:"divide",arr:[...E],l:h,m:k,r:s,depth:m,msg:`Divide [${E.slice(h,s+1)}] → [${E.slice(h,k+1)}] | [${E.slice(k+1,s+1)}]`,feedback:{msg:"Dividing task... ⚔️"}}),z(E,h,k,m+1),z(E,k+1,s,m+1),D(E,h,k,s,m)};return z(v,0,v.length-1,0),$.push({type:"done",arr:[...v],l:0,r:v.length-1,depth:0,msg:"🎉 Array fully sorted!",feedback:{msg:"Success! Factory completed all tasks 🚀",type:"success"}}),$},p=()=>{r.current=!1;const $=c();n($),d(0),x(!0)};i.useEffect(()=>{if(!o||a<0)return;if(a>=t.length-1){x(!1);return}const $=setTimeout(()=>{r.current||d(v=>{const D=v+1;return D>=t.length-1&&x(!1),D})},900);return()=>clearTimeout($)},[o,a,t.length]),i.useEffect(()=>{a>=0&&t[a]&&b(t[a].msg)},[a]);const l=()=>{if(t.length===0){const $=c();n($),d(0);return}a<t.length-1&&d($=>$+1)},y=()=>{r.current=!0,n([]),d(-1),x(!1),b("A factory that processes tasks by splitting them into smaller ones, solving each, then combining.")},B=a>=0?t[a]:null,H=B?B.arr:$t,M=$=>{if(!B)return{bg:"#F1F5F9",border:"#CBD5E1"};const{type:v,l:D,r:z,m:E}=B;return v==="done"?{bg:"#DCFCE7",border:"#22C55E"}:v==="base"&&$===D?{bg:"#DCFCE7",border:"#22C55E"}:v==="divide"&&$>=D&&$<=z?$<=E?{bg:"#FEF9C3",border:"#FACC15"}:{bg:"#FEF9C3",border:"#F59E0B"}:v==="merge-start"&&$>=D&&$<=z?{bg:"#DBEAFE",border:"#3B82F6"}:v==="merge-done"&&$>=D&&$<=z?{bg:"#DCFCE7",border:"#22C55E"}:{bg:"#F1F5F9",border:"#CBD5E1"}},T={python:`def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,javascript:`function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
        if (left[i] <= right[j])
            result.push(left[i++]);
        else
            result.push(right[j++]);
    }
    return [...result, ...left.slice(i),
            ...right.slice(j)];
}`,cpp:`void merge(vector<int>& arr, int l, int m, int r) {
    vector<int> left(arr.begin()+l, arr.begin()+m+1);
    vector<int> right(arr.begin()+m+1, arr.begin()+r+1);
    int i=0, j=0, k=l;
    while (i<left.size() && j<right.size()) {
        if (left[i] <= right[j])
            arr[k++] = left[i++];
        else
            arr[k++] = right[j++];
    }
    while (i<left.size()) arr[k++] = left[i++];
    while (j<right.size()) arr[k++] = right[j++];
}

void mergeSort(vector<int>& arr, int l, int r) {
    if (l >= r) return;
    int m = l + (r-l)/2;
    mergeSort(arr, l, m);
    mergeSort(arr, m+1, r);
    merge(arr, l, m, r);
}`};return e.jsxs("div",{style:he.container,children:[e.jsxs("div",{style:he.card,children:[e.jsx("h3",{style:he.cardTitle,children:"Merge Sort — Divide and Combine Factory"}),e.jsx("p",{style:he.cardDesc,children:"A factory that processes large tasks by splitting them into smaller tasks. Each smaller task is solved individually and then combined to produce the final result."}),e.jsx("div",{style:he.messageBox,children:u}),e.jsx("div",{style:{display:"flex",justifyContent:"center",gap:"8px",marginBottom:"20px",flexWrap:"wrap"},children:H.map(($,v)=>{const D=M(v);return e.jsx(q.div,{animate:{backgroundColor:D.bg,borderColor:D.border},transition:{duration:.3},className:B&&B.type!=="done"&&v>=B.l&&v<=B.r?"pulse-glow":"",style:{width:52,height:52,borderRadius:"12px",border:`3px solid ${D.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",fontWeight:"900",color:"#1E293B",boxShadow:D.bg==="#DCFCE7"?"0 0 10px rgba(34, 197, 94, 0.3)":"0 2px 8px rgba(0,0,0,0.06)"},children:$},v)})}),B&&B.type==="divide"&&e.jsxs(q.div,{initial:{opacity:0,y:-10},animate:{opacity:1,y:0},style:{display:"flex",justifyContent:"center",gap:"30px",marginBottom:"16px"},children:[e.jsxs("div",{style:{background:"#FEF9C3",padding:"8px 16px",borderRadius:"10px",border:"2px solid #FACC15",fontWeight:"700",fontSize:"0.9rem"},children:["Left: [",B.arr.slice(B.l,B.m+1).join(", "),"]"]}),e.jsx("div",{style:{display:"flex",alignItems:"center",fontSize:"1.2rem",color:"#94A3B8"},children:"↔"}),e.jsxs("div",{style:{background:"#FEF9C3",padding:"8px 16px",borderRadius:"10px",border:"2px solid #F59E0B",fontWeight:"700",fontSize:"0.9rem"},children:["Right: [",B.arr.slice(B.m+1,B.r+1).join(", "),"]"]})]}),e.jsxs("div",{style:he.legend,children:[e.jsxs("div",{style:he.legendItem,children:[e.jsx("div",{style:{...he.colorBox,background:"#FEF9C3",border:"2px solid #FACC15"}})," Dividing"]}),e.jsxs("div",{style:he.legendItem,children:[e.jsx("div",{style:{...he.colorBox,background:"#DBEAFE",border:"2px solid #3B82F6"}})," Merging"]}),e.jsxs("div",{style:he.legendItem,children:[e.jsx("div",{style:{...he.colorBox,background:"#DCFCE7",border:"2px solid #22C55E"}})," Sorted"]})]}),e.jsxs("div",{style:he.controls,children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx("button",{onClick:()=>{p(),A(!1)},disabled:o,style:he.primaryBtn,children:"▶ Process Tasks! ⚙️"}),j&&!o&&e.jsx("div",{className:"tooltip-hint",style:{bottom:"110%",left:"50%"},children:"Let's divide and conquer! ✨"})]}),e.jsx("button",{onClick:()=>{l(),A(!1)},disabled:o,style:he.secondaryBtn,children:"⏭ Next Stage"}),e.jsx("button",{onClick:y,style:he.dangerBtn,children:"↺ Reset Factory"})]})]}),e.jsxs("div",{style:he.card,children:[e.jsxs("div",{style:he.codeHeader,children:[e.jsx("h3",{style:{margin:0},children:"Solution Code"}),e.jsx("div",{style:he.langSelector,children:["python","javascript","cpp"].map($=>e.jsx("button",{onClick:()=>R($),style:{...he.langBtn,background:C===$?"#4F46E5":"transparent",color:C===$?"#fff":"#64748B"},children:$==="cpp"?"C++":$.charAt(0).toUpperCase()+$.slice(1)},$))})]}),e.jsx("pre",{style:he.pre,children:e.jsx("code",{children:T[C]})})]})]})},he={container:{display:"flex",flexDirection:"column",gap:"2rem",padding:"1rem"},card:{background:"white",borderRadius:"16px",padding:"28px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)"},cardTitle:{margin:"0 0 10px 0",fontSize:"1.5rem",fontWeight:"800",color:"#1E293B"},cardDesc:{margin:"0 0 20px 0",color:"#64748B",lineHeight:"1.6"},messageBox:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",marginBottom:"24px",minHeight:"56px",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:"1.5"},legend:{display:"flex",gap:"20px",justifyContent:"center",marginBottom:"20px",flexWrap:"wrap"},legendItem:{display:"flex",alignItems:"center",gap:"8px",fontSize:"0.9rem",color:"#64748B"},colorBox:{width:"16px",height:"16px",borderRadius:"4px"},controls:{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap"},primaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer",fontSize:"0.95rem"},secondaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer",fontSize:"0.95rem"},dangerBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer",fontSize:"0.95rem"},codeHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",flexWrap:"wrap",gap:"12px"},langSelector:{display:"flex",gap:"8px",background:"#F1F5F9",padding:"4px",borderRadius:"10px"},langBtn:{border:"none",padding:"4px 12px",borderRadius:"6px",fontSize:"0.85rem",fontWeight:"600",cursor:"pointer",transition:"all 0.2s"},pre:{background:"#0F172A",color:"#E2E8F0",padding:"20px",borderRadius:"12px",overflowX:"auto",fontSize:"0.9rem",lineHeight:"1.6",fontFamily:"monospace",margin:0}},at=[9,4,7,3,8,2,6],Bi=()=>{const[t,n]=i.useState([]),[a,d]=i.useState(-1),[o,x]=i.useState(!1),[u,b]=i.useState("Quick Sort organizes data by selecting a pivot and partitioning around it."),[C,R]=i.useState("javascript"),{showFeedback:I}=le(),[j,A]=i.useState(!0),r=i.useRef(!1),c=()=>{const v=[],D=[...at],z=(s,m,k)=>{const S=s[k];v.push({arr:[...s],pivot:k,range:[m,k],comparing:-1,sorted:[],msg:`Pivot = ${S} (index ${k}). Partition [${s.slice(m,k+1)}].`,feedback:{msg:`New pivot: ${S} 🎯`}});let g=m;for(let f=m;f<k;f++)v.push({arr:[...s],pivot:k,range:[m,k],comparing:f,sorted:[],msg:`Compare ${s[f]} with pivot ${S}.`}),s[f]<S&&([s[g],s[f]]=[s[f],s[g]],g!==f&&v.push({arr:[...s],pivot:k,range:[m,k],comparing:-1,swapped:[g,f],sorted:[],msg:`Swap ${s[f]} ↔ ${s[g]}.`,feedback:{msg:"Found smaller element! Swapping... 🔄"}}),g++);return[s[g],s[k]]=[s[k],s[g]],v.push({arr:[...s],pivot:g,range:[m,k],comparing:-1,sorted:[g],msg:`✅ Pivot ${S} placed at index ${g}.`,feedback:{msg:"Pivot settled! ⚓"}}),g},E=(s,m,k,S)=>{if(m>=k){m===k&&S.add(m);return}const g=z(s,m,k);S.add(g),E(s,m,g-1,S),E(s,g+1,k,S)},h=new Set;return E(D,0,D.length-1,h),v.push({arr:[...D],pivot:-1,range:[0,D.length-1],comparing:-1,sorted:Array.from({length:D.length},(s,m)=>m),msg:"🎉 Array fully sorted!",feedback:{msg:"Success! All elements organized 🚀",type:"success"}}),v},p=()=>{r.current=!1;const v=c();n(v),d(0),x(!0)};i.useEffect(()=>{if(!o||a<0)return;if(a>=t.length-1){x(!1);return}const v=setTimeout(()=>{r.current||d(D=>{const z=D+1;return z>=t.length-1&&x(!1),z})},800);return()=>clearTimeout(v)},[o,a,t.length]),i.useEffect(()=>{a>=0&&t[a]&&(b(t[a].msg),t[a].feedback&&I(t[a].feedback.msg,t[a].feedback.type||"info"))},[a]);const l=()=>{if(t.length===0){const v=c();n(v),d(0);return}a<t.length-1&&d(v=>v+1)},y=()=>{r.current=!0,n([]),d(-1),x(!1),b("Quick Sort organizes data by selecting a pivot and partitioning around it.")},B=a>=0?t[a]:null,H=B?B.arr:at,M=Math.max(...at),T=v=>{if(!B)return{bg:"#94A3B8",border:"#64748B"};const{pivot:D,comparing:z,sorted:E,swapped:h}=B;return E&&E.includes(v)?{bg:"#22C55E",border:"#16A34A"}:v===D?{bg:"#A855F7",border:"#7C3AED"}:h&&h.includes(v)?{bg:"#EF4444",border:"#DC2626"}:v===z?{bg:"#FACC15",border:"#EAB308"}:{bg:"#94A3B8",border:"#64748B"}},$={python:`def quick_sort(arr, lo, hi):
    if lo >= hi:
        return
    pivot_idx = partition(arr, lo, hi)
    quick_sort(arr, lo, pivot_idx - 1)
    quick_sort(arr, pivot_idx + 1, hi)

def partition(arr, lo, hi):
    pivot = arr[hi]
    i = lo
    for j in range(lo, hi):
        if arr[j] < pivot:
            arr[i], arr[j] = arr[j], arr[i]
            i += 1
    arr[i], arr[hi] = arr[hi], arr[i]
    return i`,javascript:`function quickSort(arr, lo = 0, hi = arr.length - 1) {
    if (lo >= hi) return;
    const pivotIdx = partition(arr, lo, hi);
    quickSort(arr, lo, pivotIdx - 1);
    quickSort(arr, pivotIdx + 1, hi);
}

function partition(arr, lo, hi) {
    const pivot = arr[hi];
    let i = lo;
    for (let j = lo; j < hi; j++) {
        if (arr[j] < pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            i++;
        }
    }
    [arr[i], arr[hi]] = [arr[hi], arr[i]];
    return i;
}`,cpp:`int partition(vector<int>& arr, int lo, int hi) {
    int pivot = arr[hi];
    int i = lo;
    for (int j = lo; j < hi; j++) {
        if (arr[j] < pivot) {
            swap(arr[i], arr[j]);
            i++;
        }
    }
    swap(arr[i], arr[hi]);
    return i;
}

void quickSort(vector<int>& arr, int lo, int hi) {
    if (lo >= hi) return;
    int p = partition(arr, lo, hi);
    quickSort(arr, lo, p - 1);
    quickSort(arr, p + 1, hi);
}`};return e.jsxs("div",{style:pe.container,children:[e.jsxs("div",{style:pe.card,children:[e.jsx("h3",{style:pe.cardTitle,children:"Quick Sort — Pivot Organizer"}),e.jsx("p",{style:pe.cardDesc,children:"Quick Sort organizes data by selecting a pivot element and placing smaller elements to its left and larger elements to its right, recursively sorting both partitions."}),e.jsx("div",{style:pe.messageBox,children:u}),e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"flex-end",gap:"10px",marginBottom:"24px",minHeight:"180px",padding:"0 20px"},children:H.map((v,D)=>{const z=T(D),E=v/M*150;return e.jsx(q.div,{animate:{height:E,backgroundColor:z.bg},transition:{duration:.3},className:B&&(D===B.pivot||B.swapped&&B.swapped.includes(D))?"pulse-glow":"",style:{width:44,borderRadius:"8px 8px 4px 4px",border:`2px solid ${z.border}`,display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:"6px",fontSize:"0.9rem",fontWeight:"900",color:"white",boxShadow:z.bg==="#22C55E"?"0 0 10px rgba(34, 197, 94, 0.4)":"0 2px 8px rgba(0,0,0,0.1)"},children:v},D)})}),e.jsxs("div",{style:pe.legend,children:[e.jsxs("div",{style:pe.legendItem,children:[e.jsx("div",{style:{...pe.colorBox,background:"#A855F7",border:"2px solid #7C3AED"}})," Pivot"]}),e.jsxs("div",{style:pe.legendItem,children:[e.jsx("div",{style:{...pe.colorBox,background:"#FACC15",border:"2px solid #EAB308"}})," Comparing"]}),e.jsxs("div",{style:pe.legendItem,children:[e.jsx("div",{style:{...pe.colorBox,background:"#EF4444",border:"2px solid #DC2626"}})," Swapped"]}),e.jsxs("div",{style:pe.legendItem,children:[e.jsx("div",{style:{...pe.colorBox,background:"#22C55E",border:"2px solid #16A34A"}})," Sorted"]})]}),e.jsxs("div",{style:pe.controls,children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx("button",{onClick:()=>{p(),A(!1)},disabled:o,style:pe.primaryBtn,children:"▶ Organize Data! 📊"}),j&&!o&&e.jsx("div",{className:"tooltip-hint",style:{bottom:"110%",left:"50%"},children:"Let's find the pivots! ✨"})]}),e.jsx("button",{onClick:()=>{l(),A(!1)},disabled:o,style:pe.secondaryBtn,children:"⏭ Next Step"}),e.jsx("button",{onClick:y,style:pe.dangerBtn,children:"↺ Reset"})]})]}),e.jsxs("div",{style:pe.card,children:[e.jsxs("div",{style:pe.codeHeader,children:[e.jsx("h3",{style:{margin:0},children:"Solution Code"}),e.jsx("div",{style:pe.langSelector,children:["python","javascript","cpp"].map(v=>e.jsx("button",{onClick:()=>R(v),style:{...pe.langBtn,background:C===v?"#4F46E5":"transparent",color:C===v?"#fff":"#64748B"},children:v==="cpp"?"C++":v.charAt(0).toUpperCase()+v.slice(1)},v))})]}),e.jsx("pre",{style:pe.pre,children:e.jsx("code",{children:$[C]})})]})]})},pe={container:{display:"flex",flexDirection:"column",gap:"2rem",padding:"1rem"},card:{background:"white",borderRadius:"16px",padding:"28px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)"},cardTitle:{margin:"0 0 10px 0",fontSize:"1.5rem",fontWeight:"800",color:"#1E293B"},cardDesc:{margin:"0 0 20px 0",color:"#64748B",lineHeight:"1.6"},messageBox:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",marginBottom:"24px",minHeight:"56px",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:"1.5"},legend:{display:"flex",gap:"20px",justifyContent:"center",marginBottom:"20px",flexWrap:"wrap"},legendItem:{display:"flex",alignItems:"center",gap:"8px",fontSize:"0.9rem",color:"#64748B"},colorBox:{width:"16px",height:"16px",borderRadius:"4px"},controls:{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap"},primaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer",fontSize:"0.95rem"},secondaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer",fontSize:"0.95rem"},dangerBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer",fontSize:"0.95rem"},codeHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",flexWrap:"wrap",gap:"12px"},langSelector:{display:"flex",gap:"8px",background:"#F1F5F9",padding:"4px",borderRadius:"10px"},langBtn:{border:"none",padding:"4px 12px",borderRadius:"6px",fontSize:"0.85rem",fontWeight:"600",cursor:"pointer",transition:"all 0.2s"},pre:{background:"#0F172A",color:"#E2E8F0",padding:"20px",borderRadius:"12px",overflowX:"auto",fontSize:"0.9rem",lineHeight:"1.6",fontFamily:"monospace",margin:0}},Dt=[{x:50,y:180},{x:120,y:60},{x:180,y:200},{x:250,y:90},{x:300,y:160},{x:80,y:120},{x:220,y:130},{x:340,y:50},{x:160,y:30},{x:280,y:220}],Mt=(t,n)=>Math.sqrt((t.x-n.x)**2+(t.y-n.y)**2),Ei=()=>{const[t,n]=i.useState([]),[a,d]=i.useState(-1),[o,x]=i.useState(!1),[u,b]=i.useState("A radar system scanning aircraft positions. Find the closest pair using divide-and-conquer."),[C,R]=i.useState("javascript"),{showFeedback:I}=le(),[j,A]=i.useState(!0),r=i.useRef(!1),c=400,p=260,l=()=>{const v=[],D=[...Dt].sort((h,s)=>h.x-s.x),z=(h,s)=>{const m=h.length;if(m<=3){let W=1/0,P=null;for(let N=0;N<m;N++)for(let U=N+1;U<m;U++){const te=Mt(h[N],h[U]);v.push({points:D,checking:[h[N],h[U]],divLine:null,closest:P,depth:s,msg:`Brute force: dist(${N},${U}) = ${te.toFixed(1)}`,feedback:{msg:"Scanning pairs... 📡"}}),te<W&&(W=te,P=[h[N],h[U]])}return{dist:W,pair:P}}const k=Math.floor(m/2),S=h[k].x;v.push({points:D,checking:null,divLine:S,closest:null,depth:s,msg:`Divide at x = ${S}. Left: ${k} points, Right: ${m-k} points.`,feedback:{msg:"Dividing search area... ⚔️"}});const g=z(h.slice(0,k),s+1),f=z(h.slice(k),s+1);let F=g.dist<f.dist?g:f;v.push({points:D,checking:null,divLine:S,closest:F.pair,depth:s,msg:`Best so far: ${F.dist.toFixed(1)}. Now check strip near dividing line.`});const w=h.filter(W=>Math.abs(W.x-S)<F.dist);w.sort((W,P)=>W.y-P.y);for(let W=0;W<w.length;W++)for(let P=W+1;P<w.length&&w[P].y-w[W].y<F.dist;P++){const N=Mt(w[W],w[P]);v.push({points:D,checking:[w[W],w[P]],divLine:S,closest:F.pair,depth:s,msg:`Strip check: dist = ${N.toFixed(1)}`}),N<F.dist&&(F={dist:N,pair:[w[W],w[P]]})}return F},E=z(D,0);return v.push({points:D,checking:null,divLine:null,closest:E.pair,depth:0,msg:`🎉 Closest pair found! Distance = ${E.dist.toFixed(2)}`,feedback:{msg:"Success! Closest aircraft detected ✈️",type:"success"}}),v},y=()=>{r.current=!1;const v=l();n(v),d(0),x(!0)};i.useEffect(()=>{if(!o||a<0)return;if(a>=t.length-1){x(!1);return}const v=setTimeout(()=>{r.current||d(D=>{const z=D+1;return z>=t.length-1&&x(!1),z})},700);return()=>clearTimeout(v)},[o,a,t.length]),i.useEffect(()=>{a>=0&&t[a]&&(b(t[a].msg),t[a].feedback&&I(t[a].feedback.msg,t[a].feedback.type||"info"))},[a]);const B=()=>{if(t.length===0){y(),x(!1);return}a<t.length-1&&d(v=>v+1)},H=()=>{r.current=!0,n([]),d(-1),x(!1),b("A radar system scanning aircraft positions. Find the closest pair using divide-and-conquer.")},M=a>=0?t[a]:null,T=(v,D)=>D&&D.some(z=>z.x===v.x&&z.y===v.y),$={python:`import math

def closest_pair(points):
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
    return d`,javascript:`function closestPair(points) {
    points.sort((a, b) => a[0] - b[0]);
    return closest(points);
}

function closest(pts) {
    const n = pts.length;
    if (n <= 3) return bruteForce(pts);
    
    const mid = Math.floor(n / 2);
    const midX = pts[mid][0];
    
    const dl = closest(pts.slice(0, mid));
    const dr = closest(pts.slice(mid));
    let d = Math.min(dl, dr);
    
    const strip = pts
        .filter(p => Math.abs(p[0] - midX) < d)
        .sort((a, b) => a[1] - b[1]);
    
    for (let i = 0; i < strip.length; i++) {
        for (let j = i+1; j < strip.length &&
             strip[j][1] - strip[i][1] < d; j++) {
            d = Math.min(d, dist(strip[i], strip[j]));
        }
    }
    return d;
}`,cpp:`double closestPair(vector<pair<int,int>>& pts) {
    sort(pts.begin(), pts.end());
    return closest(pts, 0, pts.size()-1);
}

double closest(vector<pair<int,int>>& pts,
    int l, int r) {
    if (r - l < 3) return bruteForce(pts, l, r);
    
    int mid = (l + r) / 2;
    int midX = pts[mid].first;
    
    double dl = closest(pts, l, mid);
    double dr = closest(pts, mid+1, r);
    double d = min(dl, dr);
    
    vector<pair<int,int>> strip;
    for (int i = l; i <= r; i++)
        if (abs(pts[i].first - midX) < d)
            strip.push_back(pts[i]);
    
    sort(strip.begin(), strip.end(),
        [](auto& a, auto& b) {
            return a.second < b.second;
        });
    
    for (int i = 0; i < strip.size(); i++)
        for (int j = i+1; j < strip.size() &&
             strip[j].second-strip[i].second < d; j++)
            d = min(d, dist(strip[i], strip[j]));
    return d;
}`};return e.jsxs("div",{style:fe.container,children:[e.jsxs("div",{style:fe.card,children:[e.jsx("h3",{style:fe.cardTitle,children:"Closest Pair of Points — Radar Detection System"}),e.jsx("p",{style:fe.cardDesc,children:"Imagine a radar system scanning aircraft positions. The goal is to find the closest pair of aircraft in the sky using an efficient divide-and-conquer strategy."}),e.jsx("div",{style:fe.messageBox,children:u}),e.jsx("div",{style:{display:"flex",justifyContent:"center",marginBottom:"20px"},children:e.jsxs("svg",{width:c,height:p,style:{background:"#F8FAFC",borderRadius:"12px",border:"1px solid #E2E8F0",boxShadow:"0 4px 12px rgba(0,0,0,0.05)"},children:[[0,1,2,3,4].map(v=>e.jsx("line",{x1:v*100,y1:0,x2:v*100,y2:p,stroke:"#E2E8F0",strokeDasharray:"4,4"},`v${v}`)),[0,1,2].map(v=>e.jsx("line",{x1:0,y1:v*100,x2:c,y2:v*100,stroke:"#E2E8F0",strokeDasharray:"4,4"},`h${v}`)),M?.divLine!=null&&e.jsx("line",{x1:M.divLine,y1:0,x2:M.divLine,y2:p,stroke:"#EF4444",strokeWidth:2,strokeDasharray:"6,4"}),M?.checking&&e.jsx("line",{x1:M.checking[0].x,y1:M.checking[0].y,x2:M.checking[1].x,y2:M.checking[1].y,stroke:"#FACC15",strokeWidth:2,strokeDasharray:"4,4"}),M?.closest&&e.jsx("line",{x1:M.closest[0].x,y1:M.closest[0].y,x2:M.closest[1].x,y2:M.closest[1].y,stroke:"#22C55E",strokeWidth:3}),Dt.map((v,D)=>{let z="#3B82F6",E=6;return M&&(T(v,M.checking)?(z="#FACC15",E=8):T(v,M.closest)&&(z="#22C55E",E=8)),e.jsx("circle",{cx:v.x,cy:v.y,r:E,fill:z,stroke:"white",strokeWidth:2,className:T(v,M?.checking)||T(v,M?.closest)?"pulse-glow":"",children:e.jsx("animate",{attributeName:"r",from:E+2,to:E,dur:"0.3s"})},D)})]})}),e.jsxs("div",{style:fe.legend,children:[e.jsxs("div",{style:fe.legendItem,children:[e.jsx("div",{style:{...fe.colorBox,background:"#FACC15",border:"2px solid #EAB308"}})," Current Pair"]}),e.jsxs("div",{style:fe.legendItem,children:[e.jsx("div",{style:{...fe.colorBox,background:"#22C55E",border:"2px solid #16A34A"}})," Closest Pair"]}),e.jsxs("div",{style:fe.legendItem,children:[e.jsx("div",{style:{...fe.colorBox,background:"#3B82F6",border:"2px solid #2563EB"}})," Checked"]})]}),e.jsxs("div",{style:fe.controls,children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx("button",{onClick:()=>{y(),A(!1)},disabled:o,style:fe.primaryBtn,children:"▶ Scan for Pairs! 📡"}),j&&!o&&e.jsx("div",{className:"tooltip-hint",style:{bottom:"110%",left:"50%"},children:"Let's find the closest planes! ✨"})]}),e.jsx("button",{onClick:()=>{B(),A(!1)},disabled:o,style:fe.secondaryBtn,children:"⏭ Next Scan"}),e.jsx("button",{onClick:H,style:fe.dangerBtn,children:"↺ Reset Radar"})]})]}),e.jsxs("div",{style:fe.card,children:[e.jsxs("div",{style:fe.codeHeader,children:[e.jsx("h3",{style:{margin:0},children:"Solution Code"}),e.jsx("div",{style:fe.langSelector,children:["python","javascript","cpp"].map(v=>e.jsx("button",{onClick:()=>R(v),style:{...fe.langBtn,background:C===v?"#4F46E5":"transparent",color:C===v?"#fff":"#64748B"},children:v==="cpp"?"C++":v.charAt(0).toUpperCase()+v.slice(1)},v))})]}),e.jsx("pre",{style:fe.pre,children:e.jsx("code",{children:$[C]})})]})]})},fe={container:{display:"flex",flexDirection:"column",gap:"2rem",padding:"1rem"},card:{background:"white",borderRadius:"16px",padding:"28px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)"},cardTitle:{margin:"0 0 10px 0",fontSize:"1.5rem",fontWeight:"800",color:"#1E293B"},cardDesc:{margin:"0 0 20px 0",color:"#64748B",lineHeight:"1.6"},messageBox:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",marginBottom:"24px",minHeight:"56px",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:"1.5"},legend:{display:"flex",gap:"20px",justifyContent:"center",marginBottom:"20px",flexWrap:"wrap"},legendItem:{display:"flex",alignItems:"center",gap:"8px",fontSize:"0.9rem",color:"#64748B"},colorBox:{width:"16px",height:"16px",borderRadius:"4px"},controls:{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap"},primaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer",fontSize:"0.95rem"},secondaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer",fontSize:"0.95rem"},dangerBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer",fontSize:"0.95rem"},codeHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",flexWrap:"wrap",gap:"12px"},langSelector:{display:"flex",gap:"8px",background:"#F1F5F9",padding:"4px",borderRadius:"10px"},langBtn:{border:"none",padding:"4px 12px",borderRadius:"6px",fontSize:"0.85rem",fontWeight:"600",cursor:"pointer",transition:"all 0.2s"},pre:{background:"#0F172A",color:"#E2E8F0",padding:"20px",borderRadius:"12px",overflowX:"auto",fontSize:"0.9rem",lineHeight:"1.6",fontFamily:"monospace",margin:0}},Ge=[2,-3,4,-1,5,-2,3,-4,6],zi=()=>{const[t,n]=i.useState([]),[a,d]=i.useState(-1),[o,x]=i.useState(!1),[u,b]=i.useState("Track daily profit/loss. Find consecutive days that produce maximum total profit using divide-and-conquer."),[C,R]=i.useState("javascript"),{showFeedback:I}=le(),[j,A]=i.useState(!0),r=i.useRef(!1),c=()=>{const $=[],v=[...Ge],D=(h,s,m,k)=>{let S=-1/0,g=0,f=m;for(let W=m;W>=s;W--)g+=h[W],g>S&&(S=g,f=W);let F=-1/0;g=0;let w=m+1;for(let W=m+1;W<=k;W++)g+=h[W],g>F&&(F=g,w=W);return{sum:S+F,lo:f,hi:w}},z=(h,s,m,k)=>{if(s===m)return $.push({highlight:[s],best:[s,s],bestVal:h[s],phase:"base",msg:`Base case: arr[${s}] = ${h[s]}`}),{sum:h[s],lo:s,hi:s};const S=Math.floor((s+m)/2);$.push({highlight:Array.from({length:m-s+1},(W,P)=>s+P),divLine:S,best:null,bestVal:null,phase:"divide",msg:`Divide [${s}..${m}] at mid=${S}`,feedback:{msg:"Dividing profit range... 📈"}});const g=z(h,s,S),f=z(h,S+1,m),F=D(h,s,S,m);$.push({highlight:Array.from({length:F.hi-F.lo+1},(W,P)=>F.lo+P),best:null,bestVal:F.sum,phase:"crossing",msg:`Crossing subarray [${F.lo}..${F.hi}] sum = ${F.sum}`,feedback:{msg:"Checking overlapping days... 🔄"}});let w;return g.sum>=f.sum&&g.sum>=F.sum?w=g:f.sum>=g.sum&&f.sum>=F.sum?w=f:w=F,$.push({highlight:Array.from({length:w.hi-w.lo+1},(W,P)=>w.lo+P),best:[w.lo,w.hi],bestVal:w.sum,phase:"combine",msg:`✅ Best in [${s}..${m}]: sum = ${w.sum} at [${w.lo}..${w.hi}]`}),w};z(v,0,v.length-1);const E=z(v,0,v.length-1);return $.push({highlight:Array.from({length:E.hi-E.lo+1},(h,s)=>E.lo+s),best:[E.lo,E.hi],bestVal:E.sum,phase:"done",msg:`🎉 Maximum subarray sum = ${E.sum}!`,feedback:{msg:"Success! Maximum profit found 💰",type:"success"}}),$},p=()=>{r.current=!1;const $=c();n($),d(0),x(!0)};i.useEffect(()=>{if(!o||a<0)return;if(a>=t.length-1){x(!1);return}const $=setTimeout(()=>{r.current||d(v=>{const D=v+1;return D>=t.length-1&&x(!1),D})},900);return()=>clearTimeout($)},[o,a,t.length]),i.useEffect(()=>{a>=0&&t[a]&&(b(t[a].msg),t[a].feedback&&I(t[a].feedback.msg,t[a].feedback.type||"info"))},[a]);const l=()=>{if(t.length===0){p(),x(!1);return}a<t.length-1&&d($=>$+1)},y=()=>{r.current=!0,n([]),d(-1),x(!1),b("Track daily profit/loss. Find consecutive days that produce maximum total profit using divide-and-conquer.")},B=a>=0?t[a]:null,H=Math.max(...Ge.map(Math.abs)),M=$=>{if(!B)return{bg:Ge[$]>=0?"#94A3B8":"#F87171",border:"#64748B"};const{highlight:v,best:D,phase:z}=B;return z==="done"&&D&&$>=D[0]&&$<=D[1]?{bg:"#22C55E",border:"#16A34A"}:z==="combine"&&D&&$>=D[0]&&$<=D[1]?{bg:"#22C55E",border:"#16A34A"}:z==="crossing"&&v&&v.includes($)?{bg:"#3B82F6",border:"#2563EB"}:v&&v.includes($)?{bg:"#FACC15",border:"#EAB308"}:{bg:Ge[$]>=0?"#CBD5E1":"#FECACA",border:"#94A3B8"}},T={python:`def maxSubArray(nums):
    def helper(lo, hi):
        if lo == hi:
            return nums[lo]
        mid = (lo + hi) // 2
        
        left_max = helper(lo, mid)
        right_max = helper(mid + 1, hi)
        
        # Max crossing subarray
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
        
        cross = left_sum + right_sum
        return max(left_max, right_max, cross)
    
    return helper(0, len(nums) - 1)`,javascript:`function maxSubArray(nums) {
    function helper(lo, hi) {
        if (lo === hi) return nums[lo];
        const mid = Math.floor((lo + hi) / 2);
        
        const leftMax = helper(lo, mid);
        const rightMax = helper(mid + 1, hi);
        
        // Max crossing subarray
        let leftSum = -Infinity, s = 0;
        for (let i = mid; i >= lo; i--) {
            s += nums[i];
            leftSum = Math.max(leftSum, s);
        }
        
        let rightSum = -Infinity;
        s = 0;
        for (let i = mid + 1; i <= hi; i++) {
            s += nums[i];
            rightSum = Math.max(rightSum, s);
        }
        
        const cross = leftSum + rightSum;
        return Math.max(leftMax, rightMax, cross);
    }
    return helper(0, nums.length - 1);
}`,cpp:`int maxCrossing(vector<int>& a, int lo, int mid, int hi) {
    int leftSum = INT_MIN, s = 0;
    for (int i = mid; i >= lo; i--) {
        s += a[i];
        leftSum = max(leftSum, s);
    }
    int rightSum = INT_MIN;
    s = 0;
    for (int i = mid+1; i <= hi; i++) {
        s += a[i];
        rightSum = max(rightSum, s);
    }
    return leftSum + rightSum;
}

int maxSubArray(vector<int>& a, int lo, int hi) {
    if (lo == hi) return a[lo];
    int mid = (lo + hi) / 2;
    int left = maxSubArray(a, lo, mid);
    int right = maxSubArray(a, mid+1, hi);
    int cross = maxCrossing(a, lo, mid, hi);
    return max({left, right, cross});
}`};return e.jsxs("div",{style:ge.container,children:[e.jsxs("div",{style:ge.card,children:[e.jsx("h3",{style:ge.cardTitle,children:"Maximum Subarray — Profit Analyzer"}),e.jsx("p",{style:ge.cardDesc,children:"Imagine tracking daily profit and loss for a business. The goal is to find the consecutive days that produce the maximum total profit using the divide-and-conquer approach."}),e.jsx("div",{style:ge.messageBox,children:u}),e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",gap:"6px",marginBottom:"24px",minHeight:"200px",padding:"0 10px"},children:Ge.map(($,v)=>{const D=M(v),z=Math.max(8,Math.abs($)/H*80),E=$<0;return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},children:[!E&&e.jsxs(q.div,{animate:{height:z,backgroundColor:D.bg},transition:{duration:.3},className:B&&B.highlight&&B.highlight.includes(v)?"pulse-glow":"",style:{width:36,borderRadius:"6px 6px 2px 2px",border:`2px solid ${D.border}`,display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:"4px",fontSize:"0.8rem",fontWeight:"900",color:"#1E293B",boxShadow:D.bg==="#22C55E"?"0 0 10px rgba(34, 197, 94, 0.4)":"none"},children:["+",$]}),e.jsx("div",{style:{width:36,height:"2px",background:"#64748B"}}),E&&e.jsx(q.div,{animate:{height:z,backgroundColor:D.bg},transition:{duration:.3},className:B&&B.highlight&&B.highlight.includes(v)?"pulse-glow":"",style:{width:36,borderRadius:"2px 2px 6px 6px",border:`2px solid ${D.border}`,display:"flex",alignItems:"flex-end",justifyContent:"center",paddingBottom:"4px",fontSize:"0.8rem",fontWeight:"900",color:"#991B1B",boxShadow:D.bg==="#22C55E"?"0 0 10px rgba(34, 197, 94, 0.4)":"none"},children:$}),e.jsxs("span",{style:{fontSize:"0.7rem",color:"#94A3B8",fontWeight:"700"},children:["Day ",v+1]})]},v)})}),B?.bestVal!=null&&e.jsxs(q.div,{initial:{opacity:0},animate:{opacity:1},style:{textAlign:"center",marginBottom:"16px",padding:"10px",background:"#EEF2FF",borderRadius:"10px",fontWeight:"700",color:"#4F46E5"},children:["Current best sum: ",B.bestVal]}),e.jsxs("div",{style:ge.legend,children:[e.jsxs("div",{style:ge.legendItem,children:[e.jsx("div",{style:{...ge.colorBox,background:"#FACC15",border:"2px solid #EAB308"}})," Current Segment"]}),e.jsxs("div",{style:ge.legendItem,children:[e.jsx("div",{style:{...ge.colorBox,background:"#3B82F6",border:"2px solid #2563EB"}})," Crossing"]}),e.jsxs("div",{style:ge.legendItem,children:[e.jsx("div",{style:{...ge.colorBox,background:"#22C55E",border:"2px solid #16A34A"}})," Best Subarray"]})]}),e.jsxs("div",{style:ge.controls,children:[e.jsxs("div",{style:{position:"relative"},children:[e.jsx("button",{onClick:()=>{p(),A(!1)},disabled:o,style:ge.primaryBtn,children:"▶ Calculate Profit! 💰"}),j&&!o&&e.jsx("div",{className:"tooltip-hint",style:{bottom:"110%",left:"50%"},children:"Let's find the peak! ✨"})]}),e.jsx("button",{onClick:()=>{l(),A(!1)},disabled:o,style:ge.secondaryBtn,children:"⏭ Next Segment"}),e.jsx("button",{onClick:y,style:ge.dangerBtn,children:"↺ Restart Tracking"})]})]}),e.jsxs("div",{style:ge.card,children:[e.jsxs("div",{style:ge.codeHeader,children:[e.jsx("h3",{style:{margin:0},children:"Solution Code"}),e.jsx("div",{style:ge.langSelector,children:["python","javascript","cpp"].map($=>e.jsx("button",{onClick:()=>R($),style:{...ge.langBtn,background:C===$?"#4F46E5":"transparent",color:C===$?"#fff":"#64748B"},children:$==="cpp"?"C++":$.charAt(0).toUpperCase()+$.slice(1)},$))})]}),e.jsx("pre",{style:ge.pre,children:e.jsx("code",{children:T[C]})})]})]})},ge={container:{display:"flex",flexDirection:"column",gap:"2rem",padding:"1rem"},card:{background:"white",borderRadius:"16px",padding:"28px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)"},cardTitle:{margin:"0 0 10px 0",fontSize:"1.5rem",fontWeight:"800",color:"#1E293B"},cardDesc:{margin:"0 0 20px 0",color:"#64748B",lineHeight:"1.6"},messageBox:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",marginBottom:"24px",minHeight:"56px",display:"flex",alignItems:"center",justifyContent:"center",lineHeight:"1.5"},legend:{display:"flex",gap:"20px",justifyContent:"center",marginBottom:"20px",flexWrap:"wrap"},legendItem:{display:"flex",alignItems:"center",gap:"8px",fontSize:"0.9rem",color:"#64748B"},colorBox:{width:"16px",height:"16px",borderRadius:"4px"},controls:{display:"flex",gap:"12px",justifyContent:"center",flexWrap:"wrap"},primaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer",fontSize:"0.95rem"},secondaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer",fontSize:"0.95rem"},dangerBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer",fontSize:"0.95rem"},codeHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",flexWrap:"wrap",gap:"12px"},langSelector:{display:"flex",gap:"8px",background:"#F1F5F9",padding:"4px",borderRadius:"10px"},langBtn:{border:"none",padding:"4px 12px",borderRadius:"6px",fontSize:"0.85rem",fontWeight:"600",cursor:"pointer",transition:"all 0.2s"},pre:{background:"#0F172A",color:"#E2E8F0",padding:"20px",borderRadius:"12px",overflowX:"auto",fontSize:"0.9rem",lineHeight:"1.6",fontFamily:"monospace",margin:0}},Ai=t=>new Promise(n=>setTimeout(n,t)),Ri=[{id:"max-subarray",title:"Maximum Subarray",difficulty:"Medium",tag:"📊",description:"Find the contiguous subarray within an array that has the largest sum. Use D&C: divide, find max in left/right halves, and max crossing subarray.",example:"[-2,1,-3,4,-1,2,1,-5,4] => 6 (subarray [4,-1,2,1])",algorithm:"Divide the array at the midpoint. Recursively find the max subarray in the left and right halves. Also compute the max crossing subarray spanning the midpoint. Return the max of all three.",python:`def maxSubArray(nums):
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
    return helper(0, len(nums) - 1)`,javascript:`function maxSubArray(nums) {
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
}`,cpp:`int maxSubArray(vector<int>& a, int lo, int hi) {
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
}`},{id:"merge-k-sorted",title:"Merge K Sorted Lists",difficulty:"Hard",tag:"🔗",description:"Merge k sorted linked lists into one sorted list. Use divide-and-conquer to repeatedly merge pairs of lists.",example:"lists = [[1,4,5],[1,3,4],[2,6]] => [1,1,2,3,4,4,5,6]",algorithm:"Pair up k lists and merge each pair. Repeat until one list remains. Each merge is O(n), and we do O(log k) rounds, giving O(n log k) total.",python:`def mergeKLists(lists):
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
    return lists[0]`,javascript:`function mergeKLists(lists) {
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
}`,cpp:`ListNode* mergeKLists(vector<ListNode*>& lists) {
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
}`},{id:"kth-smallest",title:"Kth Smallest Element",difficulty:"Medium",tag:"🎯",description:"Find the kth smallest element in an unsorted array using the QuickSelect algorithm (D&C variant of Quick Sort).",example:"nums=[3,2,1,5,6,4], k=2 => 2",algorithm:"Partition around a pivot. If pivot is at position k-1, return it. If k-1 is less, recurse left. Otherwise recurse right. Average O(n).",python:`def findKthSmallest(nums, k):
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
    
    return select(0, len(nums) - 1, k - 1)`,javascript:`function findKthSmallest(nums, k) {
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
}`,cpp:`int findKthSmallest(vector<int>& nums, int k) {
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
}`},{id:"closest-pair",title:"Closest Pair of Points",difficulty:"Hard",tag:"📍",description:"Given n points in 2D, find the pair with the smallest Euclidean distance using divide-and-conquer.",example:"points = [(2,3),(12,30),(40,50),(5,1),(12,10),(3,4)] => 1.41",algorithm:"Sort points by x. Divide at midpoint. Recursively find closest pair in each half. Then check the strip within min distance of the dividing line.",python:`def closest_pair(points):
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
    return d`,javascript:`function closestPair(points) {
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
}`,cpp:`double closestPair(vector<pair<int,int>>& pts,
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
}`},{id:"count-inversions",title:"Count Inversions",difficulty:"Hard",tag:"🔄",description:"Count the number of inversions in an array (pairs where i < j but arr[i] > arr[j]). Use modified merge sort.",example:"arr=[2,4,1,3,5] => 3 inversions: (2,1),(4,1),(4,3)",algorithm:"Modified merge sort: while merging, when a right element is placed before remaining left elements, add the count of remaining left elements to inversions.",python:`def countInversions(arr):
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
    return result, inv`,javascript:`function countInversions(arr) {
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
}`,cpp:`long long mergeCount(vector<int>& arr,
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
}`},{id:"skyline",title:"Skyline Problem",difficulty:"Hard",tag:"🏙️",description:"Given building dimensions [left, right, height], compute the city skyline contour using divide-and-conquer.",example:"buildings=[[2,9,10],[3,7,15],[5,12,12]] => contour points",algorithm:"Divide buildings into two halves. Recursively compute each skyline. Merge two skylines by sweeping left-to-right, tracking the max height at each x.",python:`def getSkyline(buildings):
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
    return result`,javascript:`function getSkyline(buildings) {
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
}`,cpp:`vector<vector<int>> getSkyline(
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
}`},{id:"median-sorted",title:"Median of Two Sorted Arrays",difficulty:"Hard",tag:"📐",description:"Find the median of two sorted arrays in O(log(min(m,n))) time using binary search (a D&C approach).",example:"nums1=[1,3], nums2=[2] => 2.0",algorithm:"Binary search on the smaller array. Partition both arrays such that left halves combined have the correct number of elements, and max(left) ≤ min(right).",python:`def findMedian(nums1, nums2):
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
        else: lo = i + 1`,javascript:`function findMedian(nums1, nums2) {
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
}`,cpp:`double findMedian(vector<int>& a, vector<int>& b) {
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
}`},{id:"karatsuba",title:"Karatsuba Multiplication",difficulty:"Hard",tag:"✖️",description:"Multiply two large numbers faster than O(n²) using Karatsuba's divide-and-conquer method with only 3 recursive multiplications.",example:"1234 × 5678 = 7006652",algorithm:"Split each number into two halves. Compute three products: ac, bd, and (a+b)(c+d). Combine: ac×10^n + ((a+b)(c+d) - ac - bd)×10^(n/2) + bd.",python:`def karatsuba(x, y):
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
           (z1 - z2 - z0) * 10**m + z0`,javascript:`function karatsuba(x, y) {
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
}`,cpp:`long long karatsuba(long long x, long long y) {
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
}`}],Ii=({title:t,steps:n,initState:a})=>{const[d,o]=i.useState(0),[x,u]=i.useState(!1),[b,C]=i.useState(!1),[R,I]=i.useState(a),j=i.useRef(!1),A=()=>{j.current=!0,setTimeout(()=>{j.current=!1},100),o(0),u(!1),C(!1),I(a)},r=async()=>{j.current=!1,C(!0),u(!1);for(let l=0;l<n.length;l++){if(j.current)return;o(l),I(n[l].state),await Ai(900)}u(!0),C(!1),o(n.length-1)},c=()=>{if(x||b)return;const l=Math.min(d+1,n.length-1);o(l),I(n[l].state),l===n.length-1&&u(!0)},p=n[d];return e.jsxs("div",{style:Re.wrap,children:[e.jsx("div",{style:Re.desc,children:t}),e.jsxs("div",{style:Re.vizArea,children:[e.jsx("div",{style:{display:"flex",gap:"6px",alignItems:"flex-end",justifyContent:"center",flexWrap:"wrap",marginBottom:"12px"},children:R.map((l,y)=>e.jsx("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},children:e.jsx("div",{style:{...Re.cell,backgroundColor:l.color||"#F1F5F9",border:`2px solid ${l.border||"#cbd5e1"}`,minWidth:l.label?"50px":"40px",fontSize:l.label?"0.7rem":"0.9rem"},children:l.label||l.val})},y))}),p&&e.jsx("div",{style:Re.msg,children:p.msg})]}),e.jsxs("div",{style:Re.controls,children:[e.jsx("button",{onClick:r,disabled:b,style:Re.btn("#4F46E5"),children:"▶ Start Animation"}),e.jsx("button",{onClick:c,disabled:b||x,style:Re.btn("#0891b2"),children:"⏭ Next Step"}),e.jsx("button",{onClick:A,style:Re.btn("#ef4444"),children:"↺ Reset"})]})]})},Wi=[{msg:"[-2,1,-3,4,-1,2]. Divide at mid=2.",state:[{val:-2},{val:1},{val:-3,color:"#FEF9C3",border:"#FACC15"},{val:4},{val:-1},{val:2}]},{msg:"Left half max = 1. Right half max = 5.",state:[{val:-2},{val:1,color:"#DBEAFE",border:"#3B82F6"},{val:-3},{val:4,color:"#DBEAFE",border:"#3B82F6"},{val:-1,color:"#DBEAFE",border:"#3B82F6"},{val:2,color:"#DBEAFE",border:"#3B82F6"}]},{msg:"Crossing: [1,-3,4,-1,2] = 3. Max = 5 ✅",state:[{val:-2},{val:1},{val:-3},{val:4,color:"#DCFCE7",border:"#22C55E"},{val:-1,color:"#DCFCE7",border:"#22C55E"},{val:2,color:"#DCFCE7",border:"#22C55E"}]}],Ti=[{msg:"Lists: [1,4,5] [1,3,4] [2,6]. Pair up.",state:[{label:"[1,4,5]"},{label:"[1,3,4]"},{label:"[2,6]"}]},{msg:"Merge pair → [1,1,3,4,4,5]. Merge with [2,6].",state:[{label:"[1,1,3,4,4,5]",color:"#DBEAFE",border:"#3B82F6"},{label:"[2,6]",color:"#FEF9C3",border:"#FACC15"}]},{msg:"✅ [1,1,2,3,4,4,5,6]",state:[{label:"[1,1,2,3,4,4,5,6]",color:"#DCFCE7",border:"#22C55E"}]}],$i=[{msg:"[3,2,1,5,6,4], k=2. Pivot=4. Partition.",state:[{val:3},{val:2},{val:1},{val:5},{val:6},{val:4,color:"#EDE9FE",border:"#8B5CF6"}]},{msg:"After partition: [3,2,1,4,6,5]. Pivot at idx 3. k=2 < 3 → go left.",state:[{val:3,color:"#FEF9C3",border:"#FACC15"},{val:2,color:"#FEF9C3",border:"#FACC15"},{val:1,color:"#FEF9C3",border:"#FACC15"},{val:4,color:"#DCFCE7",border:"#22C55E"},{val:6},{val:5}]},{msg:"✅ Found: 2nd smallest = 2",state:[{val:1},{val:2,color:"#DCFCE7",border:"#22C55E"},{val:3},{val:4},{val:5},{val:6}]}],Di=[{msg:"Points sorted by x. Divide at midpoint.",state:[{label:"(2,3)"},{label:"(3,4)"},{label:"|",color:"#FEE2E2",border:"#EF4444"},{label:"(5,1)"},{label:"(12,10)"}]},{msg:"Left closest=1.41 Right closest=7.07",state:[{label:"(2,3)",color:"#DBEAFE",border:"#3B82F6"},{label:"(3,4)",color:"#DBEAFE",border:"#3B82F6"},{label:"|"},{label:"(5,1)",color:"#DBEAFE",border:"#3B82F6"},{label:"(12,10)"}]},{msg:"✅ Closest pair: (2,3)-(3,4), dist=1.41",state:[{label:"(2,3)",color:"#DCFCE7",border:"#22C55E"},{label:"(3,4)",color:"#DCFCE7",border:"#22C55E"},{label:"|"},{label:"(5,1)"},{label:"(12,10)"}]}],Mi=[{msg:"[2,4,1,3,5]. Divide → [2,4] [1,3,5].",state:[{val:2},{val:4,color:"#FEF9C3",border:"#FACC15"},{val:1},{val:3},{val:5}]},{msg:"Merge [2,4]+[1,3,5]: 1 before 2 → +2 inv.",state:[{val:1,color:"#DBEAFE",border:"#3B82F6"},{val:2},{val:3,color:"#DBEAFE",border:"#3B82F6"},{val:4},{val:5}]},{msg:"✅ Total inversions = 3: (2,1),(4,1),(4,3)",state:[{val:1,color:"#DCFCE7",border:"#22C55E"},{val:2,color:"#DCFCE7",border:"#22C55E"},{val:3,color:"#DCFCE7",border:"#22C55E"},{val:4,color:"#DCFCE7",border:"#22C55E"},{val:5,color:"#DCFCE7",border:"#22C55E"}]}],qi=[{msg:"Buildings: [2,9,10],[3,7,15],[5,12,12]. Divide.",state:[{label:"B1",color:"#FEF9C3",border:"#FACC15"},{label:"B2"},{label:"B3"}]},{msg:"Left skyline: [2,10][9,0]. Right: [3,15][7,12][12,0].",state:[{label:"L",color:"#DBEAFE",border:"#3B82F6"},{label:"R",color:"#DBEAFE",border:"#3B82F6"}]},{msg:"✅ Merged: [2,10][3,15][7,12][9,10][12,0]",state:[{label:"[2,10]",color:"#DCFCE7",border:"#22C55E"},{label:"[3,15]",color:"#DCFCE7",border:"#22C55E"},{label:"[7,12]",color:"#DCFCE7",border:"#22C55E"},{label:"[12,0]",color:"#DCFCE7",border:"#22C55E"}]}],Hi=[{msg:"A=[1,3], B=[2]. Binary search on smaller array A.",state:[{label:"A:[1,3]"},{label:"B:[2]"}]},{msg:"Partition A at i=1, B at j=1. L=[1,2] R=[3].",state:[{val:1,color:"#DBEAFE",border:"#3B82F6"},{val:2,color:"#DBEAFE",border:"#3B82F6"},{val:3,color:"#FEF9C3",border:"#FACC15"}]},{msg:"✅ Median = max(left) = 2.0",state:[{val:1},{val:2,color:"#DCFCE7",border:"#22C55E"},{val:3}]}],Pi=[{msg:"1234 × 5678. Split: a=12,b=34,c=56,d=78.",state:[{label:"12"},{label:"34",color:"#FEF9C3",border:"#FACC15"},{label:"×"},{label:"56"},{label:"78",color:"#FEF9C3",border:"#FACC15"}]},{msg:"z0=34×78=2652, z2=12×56=672, z1=46×134=6164",state:[{label:"z0=2652",color:"#DBEAFE",border:"#3B82F6"},{label:"z2=672",color:"#DBEAFE",border:"#3B82F6"},{label:"z1=6164",color:"#DBEAFE",border:"#3B82F6"}]},{msg:"✅ Result = 672×10⁴ + 2840×10² + 2652 = 7006652",state:[{label:"7006652",color:"#DCFCE7",border:"#22C55E"}]}],Ni={"max-subarray":{title:"Maximum Subarray D&C",steps:Wi},"merge-k-sorted":{title:"Merge K Sorted Lists",steps:Ti},"kth-smallest":{title:"QuickSelect",steps:$i},"closest-pair":{title:"Closest Pair D&C",steps:Di},"count-inversions":{title:"Count Inversions (Merge Sort)",steps:Mi},skyline:{title:"Skyline Merge",steps:qi},"median-sorted":{title:"Median Binary Search",steps:Hi},karatsuba:{title:"Karatsuba Multiplication",steps:Pi}},Li=({id:t})=>{const n=Ni[t];return n?e.jsx(Ii,{title:n.title,steps:n.steps,initState:n.steps[0].state}):null},qt=t=>{switch(t){case"Easy":return"#22C55E";case"Medium":return"#F59E0B";case"Hard":return"#EF4444";default:return"#64748B"}},_i=()=>{const[t,n]=i.useState(null),[a,d]=i.useState("javascript");return e.jsx("div",{className:"dc-container",children:e.jsxs("div",{className:"dc-split-layout",children:[e.jsxs("div",{className:"dc-left-panel",children:[e.jsxs("div",{style:{marginBottom:"20px"},children:[e.jsx("h3",{style:{margin:"0 0 8px 0",fontSize:"1.5rem",color:"#1E293B",fontWeight:"800"},children:"Practice Problems"}),e.jsx("p",{style:{margin:0,color:"#64748B",fontSize:"1rem",lineHeight:"1.5"},children:"Master Divide and Conquer with these classic coding challenges."})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"16px",overflowY:"auto"},children:Ri.map(o=>e.jsxs(q.div,{onClick:()=>{n(o),d("javascript")},whileHover:{scale:1.02,y:-2},whileTap:{scale:.98},style:{background:"white",borderRadius:"14px",padding:"16px",boxShadow:"0 4px 10px rgba(0,0,0,0.05)",cursor:"pointer",border:t?.id===o.id?"2px solid #4F46E5":"2px solid transparent",transition:"border 0.2s ease",display:"flex",flexDirection:"column",gap:"10px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("h4",{style:{margin:0,color:"#1E293B",fontSize:"1.1rem",fontWeight:"bold"},children:[o.tag," ",o.title]}),e.jsx("span",{style:{background:qt(o.difficulty)+"20",color:qt(o.difficulty),padding:"4px 10px",borderRadius:"999px",fontSize:"0.8rem",fontWeight:"700"},children:o.difficulty})]}),e.jsx("p",{style:{margin:0,color:"#64748B",fontSize:"0.9rem",lineHeight:"1.5",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"},children:o.description})]},o.id))})]}),e.jsx("div",{className:"dc-right-panel",children:e.jsx(X,{mode:"wait",children:t?e.jsxs(q.div,{initial:{opacity:0,x:20},animate:{opacity:1,x:0},exit:{opacity:0,x:-20},transition:{duration:.3},className:"dc-solution-viewer",children:[e.jsxs("div",{style:{borderBottom:"2px solid #F1F5F9",paddingBottom:"20px",marginBottom:"20px"},children:[e.jsxs("h2",{style:{margin:"0 0 10px 0",fontSize:"1.8rem",color:"#1E293B",fontWeight:"800"},children:[t.tag," ",t.title]}),e.jsx("p",{style:{margin:"0 0 16px 0",color:"#475569",fontSize:"1.05rem",lineHeight:"1.6"},children:t.description}),e.jsxs("div",{style:{background:"#F8FAFC",padding:"12px 16px",borderRadius:"8px",borderLeft:"4px solid #4F46E5"},children:[e.jsx("span",{style:{fontWeight:"bold",color:"#1E293B"},children:"Example: "}),e.jsx("code",{style:{color:"#4F46E5",fontFamily:"monospace",fontSize:"0.95rem"},children:t.example})]})]}),e.jsxs("div",{style:{marginBottom:"24px"},children:[e.jsx("h3",{style:{margin:"0 0 16px 0",fontSize:"1.3rem",color:"#1E293B"},children:"Visualization & Animation"}),e.jsx("div",{style:{background:"#F8FAFC",padding:"24px",borderRadius:"16px",border:"1px solid #E2E8F0",boxShadow:"inset 0 2px 4px rgba(0,0,0,0.02)"},children:e.jsx(Li,{id:t.id})})]}),e.jsxs("div",{style:{marginBottom:"24px"},children:[e.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"1.3rem",color:"#1E293B"},children:"Algorithm Approach"}),e.jsxs("div",{style:{background:"#EEF2FF",color:"#312E81",padding:"16px",borderRadius:"12px",fontSize:"1rem",lineHeight:"1.6"},children:["💡 ",t.algorithm]})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",flexWrap:"wrap",gap:"8px"},children:[e.jsx("h3",{style:{margin:0,fontSize:"1.3rem",color:"#1E293B"},children:"Solution Code"}),e.jsx("div",{style:{display:"flex",gap:"8px",background:"#F1F5F9",padding:"4px",borderRadius:"10px"},children:["python","javascript","cpp"].map(o=>e.jsx("button",{onClick:()=>d(o),style:{padding:"6px 14px",borderRadius:"6px",border:"none",fontWeight:"600",cursor:"pointer",transition:"all 0.2s",fontSize:"0.85rem",background:a===o?"#fff":"transparent",color:a===o?"#4F46E5":"#64748B",boxShadow:a===o?"0 2px 4px rgba(0,0,0,0.05)":"none"},children:o==="cpp"?"C++":o.charAt(0).toUpperCase()+o.slice(1)},o))})]}),e.jsx("pre",{style:{background:"#0F172A",color:"#E2E8F0",padding:"20px",borderRadius:"12px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",margin:0,fontFamily:'"Fira Code", monospace',boxShadow:"inset 0 2px 4px rgba(0,0,0,0.1)"},children:e.jsx("code",{children:t[a]})})]})]},t.id):e.jsxs(q.div,{initial:{opacity:0},animate:{opacity:1},style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",color:"#94A3B8"},children:[e.jsx("div",{style:{fontSize:"4rem",marginBottom:"16px"},children:"⚔️"}),e.jsx("h3",{style:{margin:0},children:"Select a problem to view its solution"})]})})})]})})},Re={wrap:{display:"flex",flexDirection:"column",gap:"12px"},desc:{fontSize:"0.9rem",color:"#64748B",lineHeight:"1.6",backgroundColor:"#F1F5F9",borderRadius:"10px",padding:"10px 14px"},vizArea:{backgroundColor:"#F8FAFC",border:"1px solid #E2E8F0",borderRadius:"14px",padding:"20px",display:"flex",flexDirection:"column",gap:"12px",alignItems:"center",minHeight:"120px"},cell:{width:"40px",height:"40px",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"900",fontSize:"0.9rem",color:"#1E293B",transition:"background-color 0.3s"},msg:{backgroundColor:"#1E293B",color:"#fff",padding:"8px 16px",borderRadius:"10px",fontSize:"0.88rem",fontWeight:"700",textAlign:"center"},controls:{display:"flex",gap:"8px",justifyContent:"center",flexWrap:"wrap"},btn:t=>({padding:"8px 16px",borderRadius:"10px",border:"none",backgroundColor:t,color:"#fff",fontWeight:"700",cursor:"pointer",fontSize:"0.9rem"})},Ht=[{id:"mergesort",label:"Merge Sort"},{id:"quicksort",label:"Quick Sort"},{id:"closest",label:"Closest Pair of Points"},{id:"maxsub",label:"Maximum Subarray"},{id:"practice",label:"D&C Practice Problems"}],Oi=({name:t})=>e.jsxs("div",{style:{padding:"3rem",textAlign:"center",color:"#64748b",fontFamily:"system-ui, sans-serif"},children:[e.jsx("div",{style:{fontSize:"3rem",marginBottom:"1rem"},children:"🚧"}),e.jsx("h3",{style:{fontSize:"1.5rem",fontWeight:"700",color:"#1e293b",marginBottom:"0.5rem"},children:t}),e.jsx("p",{style:{fontSize:"1rem"},children:"This metaphor is coming soon. Stay tuned!"})]}),Vi=()=>{const[t,n]=i.useState("mergesort"),a=()=>{switch(t){case"mergesort":return e.jsx(Fi,{});case"quicksort":return e.jsx(Bi,{});case"closest":return e.jsx(Ei,{});case"maxsub":return e.jsx(zi,{});case"practice":return e.jsx(_i,{});default:return e.jsx(Oi,{name:Ht.find(d=>d.id===t)?.label})}};return e.jsx("div",{style:Be.shell,children:e.jsxs("div",{style:Be.contentWrapper,children:[e.jsxs("div",{style:Be.heroSection,children:[e.jsx("h1",{style:Be.heroTitle,children:"Divide & Conquer"}),e.jsx("p",{style:Be.heroSubtitle,children:"Divide and Conquer is an algorithmic strategy where a problem is divided into smaller subproblems, solved independently, and then combined to form the final solution."})]}),e.jsx("div",{style:Be.topBar,children:e.jsx("div",{style:Be.tabs,children:Ht.map(d=>e.jsxs("button",{style:{...Be.tab,color:t===d.id?"#0f172a":"#64748b",opacity:t===d.id?1:.65,fontWeight:t===d.id?"700":"500"},onClick:()=>n(d.id),children:[d.label,t===d.id&&e.jsx(q.div,{layoutId:"activeTabUnderlineDC",style:Be.activeUnderline,transition:{type:"spring",bounce:.2,duration:.5}})]},d.id))})}),e.jsx("div",{style:Be.content,children:e.jsx(X,{mode:"wait",children:e.jsx(q.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},exit:{opacity:0},transition:{duration:.2,ease:"easeOut"},children:a()},t)})})]})})},Be={shell:{width:"100%",minHeight:"100vh",backgroundColor:"#fff",fontFamily:"'Inter', system-ui, -apple-system, sans-serif"},contentWrapper:{maxWidth:"1100px",margin:"0 auto",padding:"0 1.5rem"},heroSection:{textAlign:"center",padding:"3rem 0 2rem 0"},heroTitle:{fontSize:"3rem",fontWeight:"900",color:"#0f172a",marginBottom:"0.75rem",letterSpacing:"-1.5px",lineHeight:"1.1"},heroSubtitle:{fontSize:"1.1rem",color:"#475569",maxWidth:"700px",margin:"0 auto",lineHeight:"1.6",opacity:.8},topBar:{display:"flex",justifyContent:"center",borderBottom:"1px solid #f1f5f9",marginBottom:"2rem",position:"sticky",top:"72px",backgroundColor:"rgba(255,255,255,0.8)",backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",zIndex:100,padding:"0.75rem 0",scrollMarginTop:"80px"},tabs:{display:"flex",gap:"0.5rem",padding:"0 1rem",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",maskImage:"linear-gradient(to right, transparent, black 5%, black 95%, transparent)",WebkitMaskImage:"linear-gradient(to right, transparent, black 5%, black 95%, transparent)"},tab:{padding:"0.6rem 1.2rem",background:"none",border:"none",fontSize:"0.875rem",cursor:"pointer",transition:"all 0.2s ease",display:"flex",alignItems:"center",gap:"10px",whiteSpace:"nowrap",borderRadius:"8px",position:"relative"},activeUnderline:{position:"absolute",bottom:"-0.5rem",left:"20%",right:"20%",height:"2px",backgroundColor:"#3b82f6",borderRadius:"2px"},content:{minHeight:"600px",marginBottom:"3rem"}},Pt=[{id:"sorting",label:"Sorting Algorithms",icon:"🔢",description:"Arrange elements in ascending or descending order. Covers Bubble, Selection, Insertion, Merge, Quick and Heap Sort.",difficulty:"Beginner–Advanced"},{id:"searching",label:"Searching Algorithms",icon:"🔍",description:"Find elements in arrays and trees efficiently. Covers Linear Search, Binary Search, BFS, and DFS.",difficulty:"Beginner"},{id:"dp",label:"Dynamic Programming",icon:"🧩",description:"Solve complex problems by breaking them into overlapping subproblems. Covers Fibonacci, Knapsack, LCS, and more.",difficulty:"Advanced"},{id:"greedy",label:"Greedy Algorithms",icon:"🏆",description:"Build solutions step-by-step by always picking the locally optimal choice. Covers interval scheduling, Huffman coding.",difficulty:"Intermediate"},{id:"divide",label:"Divide & Conquer",icon:"⚔️",description:"Divide problems into smaller subproblems, solve independently, then combine. Covers Merge Sort, Binary Search, and more.",difficulty:"Intermediate"},{id:"backtrack",label:"Backtracking",icon:"🔁",description:"Explore all possibilities and backtrack on encountering invalid states. Covers N-Queens, Sudoku, and permutations.",difficulty:"Advanced"}],Qi=({topic:t})=>e.jsx("div",{style:Me.wrap,children:e.jsxs("div",{style:Me.card,children:[e.jsx("span",{style:Me.icon,children:t.icon}),e.jsx("h3",{style:Me.name,children:t.label}),e.jsx("p",{style:Me.desc,children:t.description}),e.jsx("span",{style:{...Me.badge,backgroundColor:t.difficulty==="Beginner–Advanced"?"#ede9fe":t.difficulty==="Beginner"?"#dcfce7":t.difficulty==="Intermediate"?"#fef9c3":"#fee2e2",color:"#1e293b"},children:t.difficulty}),e.jsx("div",{style:Me.soon,children:"🚧 Coming Soon"})]})}),Me={wrap:{display:"flex",justifyContent:"center",padding:"2rem"},card:{background:"#fff",borderRadius:"16px",padding:"2.5rem",maxWidth:"600px",width:"100%",textAlign:"center",boxShadow:"0 4px 16px rgba(0,0,0,0.06)",border:"1px solid #e2e8f0"},icon:{fontSize:"3rem"},name:{fontSize:"1.5rem",fontWeight:"800",color:"#1e293b",margin:"0.75rem 0 0.5rem"},desc:{color:"#64748b",lineHeight:"1.6",marginBottom:"1rem"},badge:{display:"inline-block",padding:"4px 12px",borderRadius:"999px",fontWeight:"600",fontSize:"0.85rem",marginBottom:"1.5rem"},soon:{padding:"0.75rem 1.5rem",background:"#f1f5f9",borderRadius:"999px",display:"inline-block",fontWeight:"700",color:"#64748b",fontSize:"0.95rem"}},Yi=()=>{const[t,n]=i.useState(null);if(t){const d=Pt.find(o=>o.id===t);return e.jsxs("div",{style:je.container,children:[e.jsxs("button",{onClick:()=>n(null),style:je.backBtn,children:[e.jsx("span",{style:{fontSize:"1.1rem"},children:"←"})," Back to Algorithms"]}),e.jsx(X,{mode:"wait",children:e.jsx(q.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},transition:{duration:.25,ease:"easeOut"},children:t==="sorting"?e.jsx(or,{}):t==="searching"?e.jsx(jr,{}):t==="dp"?e.jsx(Hr,{}):t==="greedy"?e.jsx(oi,{}):t==="backtrack"?e.jsx(ki,{}):t==="divide"?e.jsx(Vi,{}):e.jsx(Qi,{topic:d})},t)})]})}const a=d=>{switch(d){case"Beginner":return{backgroundColor:"#f0fdf4",color:"#166534",border:"1px solid #dcfce7"};case"Beginner–Advanced":return{backgroundColor:"#f5f3ff",color:"#5b21b6",border:"1px solid #ede9fe"};case"Intermediate":return{backgroundColor:"#fffcf0",color:"#92400e",border:"1px solid #fef9c3"};case"Advanced":return{backgroundColor:"#fef2f2",color:"#991b1b",border:"1px solid #fee2e2"};default:return{backgroundColor:"#f8fafc",color:"#64748b",border:"1px solid #e2e8f0"}}};return e.jsxs("div",{style:je.container,children:[e.jsxs("div",{style:je.header,children:[e.jsx("h2",{style:je.mainTitle,children:"Algorithms Learning Path"}),e.jsx("p",{style:je.mainSub,children:"Master the foundational building blocks of efficient software. Explore essential algorithm families with interactive visualizations and step-by-step logic."})]}),e.jsx("div",{style:je.grid,children:Pt.map(d=>e.jsxs(q.div,{whileHover:{y:-4,boxShadow:"0 12px 24px -10px rgba(15, 23, 42, 0.1)"},whileTap:{scale:.98},transition:{duration:.25,cubicBezier:[.4,0,.2,1]},style:je.topicCard,onClick:()=>n(d.id),children:[e.jsxs("div",{style:je.cardHeader,children:[e.jsx("span",{style:je.topicIcon,children:d.icon}),e.jsx("span",{style:{...je.diffBadge,...a(d.difficulty)},children:d.difficulty})]}),e.jsx("h3",{style:je.topicName,children:d.label}),e.jsx("p",{style:je.topicDesc,children:d.description}),e.jsx("div",{style:je.cardFooter,children:e.jsx("span",{style:je.learnMore,children:"Explore Module →"})})]},d.id))})]})},je={container:{width:"100%",maxWidth:"1240px",margin:"0 auto",padding:"3rem 1.5rem",fontFamily:'"Outfit", "Inter", system-ui, sans-serif'},header:{textAlign:"center",marginBottom:"4rem",animation:"fadeInDown 0.8s ease-out"},mainTitle:{fontSize:"2.75rem",fontWeight:"900",color:"#0f172a",marginBottom:"1rem",letterSpacing:"-0.025em"},mainSub:{fontSize:"1.125rem",color:"#64748b",lineHeight:"1.7",maxWidth:"800px",margin:"0 auto"},grid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))",gap:"1.75rem"},topicCard:{backgroundColor:"#fff",borderRadius:"24px",padding:"2.25rem",border:"1px solid #f1f5f9",cursor:"pointer",display:"flex",flexDirection:"column",gap:"0.75rem",boxShadow:"0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)",position:"relative",overflow:"hidden"},cardHeader:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1rem"},topicIcon:{fontSize:"2.5rem",filter:"drop-shadow(0 4px 6px rgba(0,0,0,0.1))"},topicName:{fontSize:"1.5rem",fontWeight:"800",color:"#0f172a",margin:"0"},topicDesc:{fontSize:"0.975rem",color:"#64748b",lineHeight:"1.6",margin:"0 0 1rem 0"},diffBadge:{padding:"4px 12px",borderRadius:"12px",fontWeight:"700",fontSize:"0.75rem",textTransform:"uppercase",letterSpacing:"0.025em"},cardFooter:{marginTop:"auto",paddingTop:"1rem"},learnMore:{fontSize:"0.9rem",fontWeight:"700",color:"#3b82f6",transition:"all 0.2s ease"},backBtn:{background:"#0f172a",color:"#fff",padding:"0.75rem 1.5rem",borderRadius:"16px",fontWeight:"700",border:"none",cursor:"pointer",transition:"all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",fontSize:"0.95rem",marginBottom:"2.5rem",display:"inline-flex",alignItems:"center",gap:"10px",boxShadow:"0 10px 15px -3px rgba(15, 23, 42, 0.3)"}};export{Yi as default};
