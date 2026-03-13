import{j as e,m as I,A as ie}from"./proxy-B1ZhzaRo.js";import{r as o}from"./index-ALvCqmsg.js";import"./index-bvV3Sn6d.js";const Le=t=>new Promise(i=>setTimeout(i,t)),ct=()=>{const[t,i]=o.useState([5,3,8,2,6,4,7,1]),[l,u]=o.useState([]),[n,a]=o.useState([]),[c,S]=o.useState([]),[g,r]=o.useState(""),[p,d]=o.useState(!1),[w,F]=o.useState(!1),[y,h]=o.useState("python"),m=o.useRef(!1),f=Math.max(...t),x=()=>{m.current=!0,i([5,3,8,2,6,4,7,1]),u([]),a([]),S([]),r(""),d(!1),F(!1),setTimeout(()=>{m.current=!1},100)},R=async()=>{m.current=!1,d(!0),F(!1);let W=[5,3,8,2,6,4,7,1];const q=new Set,v=W.length;for(let s=0;s<v-1;s++){for(let b=0;b<v-s-1;b++){if(m.current)return;u([b,b+1]),r(`Comparing arr[${b}]=${W[b]} and arr[${b+1}]=${W[b+1]}`),await Le(700),W[b]>W[b+1]&&([W[b],W[b+1]]=[W[b+1],W[b]],a([b,b+1]),i([...W]),r(`Swapped! ${W[b]} ↔ ${W[b+1]}`),await Le(700),a([])),u([])}q.add(v-1-s),S(new Set([...q])),window.AppProgress&&window.AppProgress.markMetaphorCompleted("BubbleSort")}q.add(0),S(new Set([...q])),u([]),r("✓ Array is sorted!"),d(!1),F(!0)},T=o.useRef({arr:[5,3,8,2,6,4,7,1],i:0,j:0}),L=()=>{if(w||p)return;const W=T.current,q=W.arr.length;if(W.i>=q-1){r("✓ Array is sorted!"),F(!0),u([]),S(new Set(Array.from({length:q},(s,b)=>b))),window.AppProgress&&window.AppProgress.markMetaphorCompleted("BubbleSort");return}const v=W.j;if(u([v,v+1]),r(`Comparing arr[${v}]=${W.arr[v]} and arr[${v+1}]=${W.arr[v+1]}`),W.arr[v]>W.arr[v+1]&&([W.arr[v],W.arr[v+1]]=[W.arr[v+1],W.arr[v]],a([v,v+1]),setTimeout(()=>a([]),500)),i([...W.arr]),W.j++,W.j>=q-1-W.i){const s=new Set([...c,q-1-W.i]);S(s),W.i++,W.j=0}};return e.jsxs("div",{style:X.container,children:[e.jsxs("div",{style:X.header,children:[e.jsx("h2",{style:X.title,children:"Bubble Sort — Rising Bubbles 🫧"}),e.jsxs("div",{style:X.desc,children:[e.jsx("p",{children:"Imagine bubbles rising in water. The largest bubbles float upward with each pass."}),e.jsxs("p",{children:["Bubble Sort works the same way by repeatedly ",e.jsx("strong",{children:"swapping adjacent elements"})," that are out of order."]})]})]}),e.jsxs("div",{style:X.visualizer,children:[e.jsx("div",{style:X.barsContainer,children:t.map((W,q)=>{let v="#e2e8f0";return c.has&&c.has(q)&&(v="#4ade80"),n.includes(q)&&(v="#ef4444"),l.includes(q)&&(v="#fbbf24"),e.jsxs(I.div,{style:{...X.barWrap},layout:!0,transition:{type:"spring",stiffness:300,damping:30},children:[e.jsx("div",{style:{...X.bar,height:`${W/f*160+20}px`,backgroundColor:v}}),e.jsx("span",{style:X.barLabel,children:W})]},q)})}),e.jsx(ie,{children:g&&e.jsx(I.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0},style:X.messageBox,children:g})}),e.jsx("div",{style:X.legend,children:[["#fbbf24","Comparing"],["#ef4444","Swapping"],["#4ade80","Sorted"]].map(([W,q])=>e.jsxs("div",{style:X.legendItem,children:[e.jsx("div",{style:{...X.dot,backgroundColor:W}}),e.jsx("span",{children:q})]},q))})]}),e.jsxs("div",{style:X.controls,children:[e.jsx("button",{onClick:R,disabled:p,style:{...X.btn,backgroundColor:"#4f46e5"},children:"▶ Start Sorting"}),e.jsx("button",{onClick:L,disabled:p||w,style:{...X.btn,backgroundColor:"#0891b2"},children:"⏭ Next Step"}),e.jsx("button",{onClick:x,style:{...X.btn,backgroundColor:"#ef4444"},children:"↺ Reset"})]}),e.jsxs("div",{style:X.codeSection,children:[e.jsx("h3",{style:X.subTitle,children:"Bubble Sort Implementation"}),e.jsx("div",{style:X.langSelector,children:["python","javascript","cpp"].map(W=>e.jsx("button",{onClick:()=>h(W),style:{...X.langBtn,backgroundColor:y===W?"#4f46e5":"#f1f5f9",color:y===W?"#fff":"#64748b",border:y===W?"none":"1px solid #e2e8f0"},children:W==="cpp"?"C++":W.toUpperCase()},W))}),e.jsxs("pre",{style:X.codeBox,children:[y==="python"&&e.jsx("code",{children:`def bubble_sort(arr):
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
// Space: O(1)`})]})]}),e.jsxs("div",{style:X.quizSection,children:[e.jsx("h3",{style:X.subTitle,children:"Knowledge Check"}),e.jsx("div",{style:X.quizGrid,children:[{q:"What is Bubble Sort?",a:"A simple sorting algorithm that repeatedly compares adjacent elements and swaps them if they are in the wrong order."},{q:"What is the time complexity of Bubble Sort?",a:"O(n²) in the worst and average case. O(n) in the best case (already sorted, with early exit optimization)."},{q:"Why is it called Bubble Sort?",a:'Because larger elements "bubble up" to the end of the array with each pass, just like bubbles rising in water.'},{q:"When is Bubble Sort inefficient?",a:"For large datasets. Its O(n²) complexity makes it significantly slower than algorithms like Merge Sort or Quick Sort on real-world data."}].map((W,q)=>e.jsxs("div",{style:X.quizCard,children:[e.jsxs("p",{style:X.question,children:[e.jsxs("strong",{children:["Q",q+1,":"]})," ",W.q]}),e.jsx("p",{style:X.answer,children:W.a})]},q))})]})]})},X={container:{padding:"2rem",backgroundColor:"#fff",borderRadius:"32px",border:"1px solid #e2e8f0",boxShadow:"0 4px 6px -1px rgba(0,0,0,0.05)",fontFamily:"system-ui, sans-serif"},header:{textAlign:"center",marginBottom:"2rem"},title:{fontSize:"2rem",fontWeight:"900",color:"#1e293b",letterSpacing:"-0.025em",marginBottom:"1rem"},desc:{color:"#64748b",fontSize:"1.05rem",lineHeight:"1.7",maxWidth:"750px",margin:"0 auto"},visualizer:{backgroundColor:"#f8fafc",borderRadius:"24px",padding:"2rem",border:"1px solid #f1f5f9",display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem",marginBottom:"1.5rem"},barsContainer:{display:"flex",alignItems:"flex-end",gap:"10px",height:"200px",padding:"0 1rem"},barWrap:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},bar:{width:"40px",borderRadius:"6px 6px 0 0",transition:"background-color 0.3s",minHeight:"20px"},barLabel:{fontSize:"0.8rem",fontWeight:"700",color:"#475569"},messageBox:{backgroundColor:"#1e293b",color:"#fff",padding:"0.7rem 1.5rem",borderRadius:"12px",fontSize:"1rem",fontWeight:"700"},legend:{display:"flex",gap:"1.5rem",flexWrap:"wrap",justifyContent:"center"},legendItem:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.9rem",color:"#64748b",fontWeight:"600"},dot:{width:"12px",height:"12px",borderRadius:"50%"},controls:{display:"flex",justifyContent:"center",gap:"1rem",marginBottom:"2rem",flexWrap:"wrap"},btn:{padding:"0.75rem 1.5rem",borderRadius:"12px",border:"none",color:"#fff",fontWeight:"700",cursor:"pointer",fontSize:"1rem",transition:"opacity 0.2s",opacity:.9},codeSection:{marginBottom:"3rem"},subTitle:{fontSize:"1.5rem",fontWeight:"900",color:"#1e293b",marginBottom:"1.5rem",textAlign:"center"},langSelector:{display:"flex",justifyContent:"center",gap:"0.75rem",marginBottom:"1.25rem"},langBtn:{padding:"0.6rem 1.2rem",borderRadius:"10px",fontSize:"0.9rem",fontWeight:"700",cursor:"pointer",transition:"all 0.2s"},codeBox:{backgroundColor:"#0f172a",color:"#f8fafc",padding:"1.5rem",borderRadius:"20px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",fontFamily:"monospace",boxShadow:"inset 0 2px 4px rgba(0,0,0,0.1)"},quizSection:{marginTop:"2rem"},quizGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"1.5rem"},quizCard:{backgroundColor:"#f8fafc",padding:"1.5rem",borderRadius:"20px",border:"1px solid #f1f5f9"},question:{fontWeight:"700",color:"#1e293b",marginBottom:"0.75rem",fontSize:"1rem"},answer:{color:"#10b981",fontWeight:"600",lineHeight:"1.5",fontSize:"0.95rem"}},Se=t=>new Promise(i=>setTimeout(i,t)),we=[7,3,5,2,8,4,6,1],pt=()=>{const[t,i]=o.useState([...we]),[l,u]=o.useState([]),[n,a]=o.useState(null),[c,S]=o.useState([]),[g,r]=o.useState(new Set),[p,d]=o.useState(""),[w,F]=o.useState(!1),[y,h]=o.useState(!1),[m,f]=o.useState("python"),x=o.useRef(!1),R=Math.max(...t),T=()=>{x.current=!0,setTimeout(()=>{x.current=!1},100),i([...we]),u([]),a(null),S([]),r(new Set),d(""),F(!1),h(!1),W.current={arr:[...we],i:0,j:1,currentMin:0}},L=async()=>{x.current=!1,F(!0),h(!1);let s=[...we];const b=new Set,B=s.length;for(let C=0;C<B-1;C++){if(x.current)return;let E=C;a(E),d(`Pass ${C+1}: Looking for the smallest element from index ${C}`);for(let j=C+1;j<B;j++){if(x.current)return;u([j]),d(`Comparing arr[${j}]=${s[j]} with current min arr[${E}]=${s[E]}`),await Se(500),s[j]<s[E]&&(E=j,a(E),d(`New minimum found: arr[${E}]=${s[E]}`),await Se(400))}u([]),E!==C?(S([C,E]),d(`Swapping arr[${C}]=${s[C]} ↔ arr[${E}]=${s[E]}`),await Se(600),[s[C],s[E]]=[s[E],s[C]],i([...s]),S([])):(d(`arr[${C}]=${s[C]} is already in the correct position`),await Se(500)),b.add(C),r(new Set([...b])),a(null),await Se(300)}b.add(B-1),r(new Set([...b])),u([]),a(null),S([]),d("✓ Array is sorted!"),F(!1),h(!0),window.AppProgress&&window.AppProgress.markMetaphorCompleted("SelectionSort")},W=o.useRef({arr:[...we],i:0,j:1,currentMin:0}),q=()=>{if(y||w)return;const s=W.current,b=s.arr.length;if(s.i>=b-1){const B=new Set(Array.from({length:b},(C,E)=>E));r(B),u([]),a(null),d("✓ Array is sorted!"),h(!0),window.AppProgress&&window.AppProgress.markMetaphorCompleted("SelectionSort");return}s.j<b?(u([s.j]),a(s.currentMin),d(`Comparing arr[${s.j}]=${s.arr[s.j]} with min arr[${s.currentMin}]=${s.arr[s.currentMin]}`),s.arr[s.j]<s.arr[s.currentMin]&&(s.currentMin=s.j,a(s.currentMin)),s.j++):(s.currentMin!==s.i?(S([s.i,s.currentMin]),[s.arr[s.i],s.arr[s.currentMin]]=[s.arr[s.currentMin],s.arr[s.i]],i([...s.arr]),d(`Swapped! arr[${s.i}]=${s.arr[s.i]} placed in sorted position`),setTimeout(()=>S([]),500)):d(`arr[${s.i}]=${s.arr[s.i]} is already minimum, no swap needed`),r(B=>new Set([...B,s.i])),u([]),a(null),s.i++,s.j=s.i+1,s.currentMin=s.i)},v=s=>c.includes(s)?"#ef4444":s===n?"#3b82f6":l.includes(s)?"#fbbf24":g.has(s)?"#4ade80":"#e2e8f0";return e.jsxs("div",{style:G.container,children:[e.jsxs("div",{style:G.header,children:[e.jsx("h2",{style:G.title,children:"Selection Sort — Choosing the Smallest Card 🃏"}),e.jsxs("div",{style:G.desc,children:[e.jsx("p",{children:"Imagine sorting playing cards in your hand. You repeatedly look through the unsorted cards, pick the smallest one, and place it at the front."}),e.jsxs("p",{children:["Selection Sort works the same way — it ",e.jsx("strong",{children:"selects the smallest element"})," from the unsorted portion and swaps it into position."]})]})]}),e.jsxs("div",{style:G.visualizer,children:[e.jsx("div",{style:G.sortedLabel,children:g.size>0&&e.jsxs("span",{style:G.sortedPill,children:["✓ Sorted: first ",g.size," element",g.size>1?"s":""]})}),e.jsx("div",{style:G.barsContainer,children:t.map((s,b)=>e.jsxs(I.div,{style:G.barWrap,layout:!0,transition:{type:"spring",stiffness:300,damping:30},children:[e.jsx("div",{style:{...G.bar,height:`${s/R*160+20}px`,backgroundColor:v(b)}}),e.jsx("span",{style:G.barLabel,children:s})]},b))}),e.jsx(ie,{children:p&&e.jsx(I.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0},style:G.messageBox,children:p})}),e.jsx("div",{style:G.legend,children:[["#fbbf24","Scanning"],["#3b82f6","Current Min"],["#ef4444","Swapping"],["#4ade80","Sorted"]].map(([s,b])=>e.jsxs("div",{style:G.legendItem,children:[e.jsx("div",{style:{...G.dot,backgroundColor:s}}),e.jsx("span",{children:b})]},b))})]}),e.jsxs("div",{style:G.controls,children:[e.jsx("button",{onClick:L,disabled:w,style:{...G.btn,backgroundColor:"#4f46e5"},children:"▶ Start Sorting"}),e.jsx("button",{onClick:q,disabled:w||y,style:{...G.btn,backgroundColor:"#0891b2"},children:"⏭ Next Step"}),e.jsx("button",{onClick:T,style:{...G.btn,backgroundColor:"#ef4444"},children:"↺ Reset"})]}),e.jsxs("div",{style:G.codeSection,children:[e.jsx("h3",{style:G.subTitle,children:"Selection Sort Implementation"}),e.jsx("div",{style:G.langSelector,children:["python","javascript","cpp"].map(s=>e.jsx("button",{onClick:()=>f(s),style:{...G.langBtn,backgroundColor:m===s?"#4f46e5":"#f1f5f9",color:m===s?"#fff":"#64748b",border:m===s?"none":"1px solid #e2e8f0"},children:s==="cpp"?"C++":s.toUpperCase()},s))}),e.jsxs("pre",{style:G.codeBox,children:[m==="python"&&e.jsx("code",{children:`def selection_sort(arr):
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
# Swaps: O(n)  — at most n-1 swaps`}),m==="javascript"&&e.jsx("code",{children:`function selectionSort(arr) {
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
// Swaps: O(n)`}),m==="cpp"&&e.jsx("code",{children:`#include <vector>
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
// Swaps: O(n)`})]})]}),e.jsxs("div",{style:G.quizSection,children:[e.jsx("h3",{style:G.subTitle,children:"Knowledge Check"}),e.jsx("div",{style:G.quizGrid,children:[{q:"What is the main idea of Selection Sort?",a:"Repeatedly find the minimum element from the unsorted portion and place it at the beginning of the sorted portion."},{q:"How many swaps occur in Selection Sort?",a:"At most O(n) swaps — one swap per pass. This makes it more efficient than Bubble Sort in terms of write operations."},{q:"What is the time complexity of Selection Sort?",a:"O(n²) in all cases (best, average, and worst), because it always scans the entire unsorted portion for the minimum element."},{q:"Why is Selection Sort called a selection algorithm?",a:"Because in each pass, it selects (chooses) the smallest element from the remaining unsorted part and moves it to its correct position."}].map((s,b)=>e.jsxs("div",{style:G.quizCard,children:[e.jsxs("p",{style:G.question,children:[e.jsxs("strong",{children:["Q",b+1,":"]})," ",s.q]}),e.jsx("p",{style:G.answer,children:s.a})]},b))})]})]})},G={container:{padding:"2rem",backgroundColor:"#fff",borderRadius:"32px",border:"1px solid #e2e8f0",boxShadow:"0 4px 6px -1px rgba(0,0,0,0.05)",fontFamily:"system-ui, sans-serif"},header:{textAlign:"center",marginBottom:"2rem"},title:{fontSize:"2rem",fontWeight:"900",color:"#1e293b",letterSpacing:"-0.025em",marginBottom:"1rem"},desc:{color:"#64748b",fontSize:"1.05rem",lineHeight:"1.7",maxWidth:"750px",margin:"0 auto"},visualizer:{backgroundColor:"#f8fafc",borderRadius:"24px",padding:"2rem",border:"1px solid #f1f5f9",display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem",marginBottom:"1.5rem"},sortedLabel:{height:"28px",display:"flex",alignItems:"center"},sortedPill:{backgroundColor:"#dcfce7",color:"#15803d",fontWeight:"700",fontSize:"0.82rem",padding:"3px 12px",borderRadius:"999px",border:"1px solid #86efac"},barsContainer:{display:"flex",alignItems:"flex-end",gap:"10px",height:"200px",padding:"0 1rem"},barWrap:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},bar:{width:"40px",borderRadius:"6px 6px 0 0",transition:"background-color 0.3s",minHeight:"20px"},barLabel:{fontSize:"0.8rem",fontWeight:"700",color:"#475569"},messageBox:{backgroundColor:"#1e293b",color:"#fff",padding:"0.7rem 1.5rem",borderRadius:"12px",fontSize:"1rem",fontWeight:"700"},legend:{display:"flex",gap:"1.5rem",flexWrap:"wrap",justifyContent:"center"},legendItem:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.9rem",color:"#64748b",fontWeight:"600"},dot:{width:"12px",height:"12px",borderRadius:"50%"},controls:{display:"flex",justifyContent:"center",gap:"1rem",marginBottom:"2rem",flexWrap:"wrap"},btn:{padding:"0.75rem 1.5rem",borderRadius:"12px",border:"none",color:"#fff",fontWeight:"700",cursor:"pointer",fontSize:"1rem",opacity:.9},codeSection:{marginBottom:"3rem"},subTitle:{fontSize:"1.5rem",fontWeight:"900",color:"#1e293b",marginBottom:"1.5rem",textAlign:"center"},langSelector:{display:"flex",justifyContent:"center",gap:"0.75rem",marginBottom:"1.25rem"},langBtn:{padding:"0.6rem 1.2rem",borderRadius:"10px",fontSize:"0.9rem",fontWeight:"700",cursor:"pointer",transition:"all 0.2s"},codeBox:{backgroundColor:"#0f172a",color:"#f8fafc",padding:"1.5rem",borderRadius:"20px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",fontFamily:"monospace"},quizSection:{marginTop:"2rem"},quizGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"1.5rem"},quizCard:{backgroundColor:"#f8fafc",padding:"1.5rem",borderRadius:"20px",border:"1px solid #f1f5f9"},question:{fontWeight:"700",color:"#1e293b",marginBottom:"0.75rem",fontSize:"1rem"},answer:{color:"#10b981",fontWeight:"600",lineHeight:"1.5",fontSize:"0.95rem"}},qe=t=>new Promise(i=>setTimeout(i,t)),je=[8,3,5,2,7,4,6,1],ut=()=>{const[t,i]=o.useState([...je]),[l,u]=o.useState(null),[n,a]=o.useState(null),[c,S]=o.useState([]),[g,r]=o.useState(new Set([0])),[p,d]=o.useState(""),[w,F]=o.useState(!1),[y,h]=o.useState(!1),[m,f]=o.useState("python"),x=o.useRef(!1),R=Math.max(...je),T=()=>{x.current=!0,setTimeout(()=>{x.current=!1},100),i([...je]),u(null),a(null),S([]),r(new Set([0])),d(""),F(!1),h(!1),W.current={arr:[...je],i:1}},L=async()=>{x.current=!1,F(!0),h(!1);let s=[...je];const b=new Set([0]);for(let B=1;B<s.length;B++){if(x.current)return;const C=s[B];u(B),d(`Taking element ${C} at index ${B}`),await qe(600);let E=B-1;for(;E>=0&&s[E]>C;){if(x.current)return;a(E),S([E+1]),d(`${s[E]} > ${C}, shift ${s[E]} right`),s[E+1]=s[E],i([...s]),await qe(500),E--}s[E+1]=C,i([...s]),b.add(B),r(new Set([...b])),u(null),a(null),S([]),d(`Inserted ${C} at index ${E+1}`),await qe(400),window.AppProgress&&window.AppProgress.markMetaphorCompleted("InsertionSort")}d("✓ Array is sorted!"),F(!1),h(!0)},W=o.useRef({arr:[...je],i:1}),q=()=>{if(y||w)return;const s=W.current;if(s.i>=s.arr.length){d("✓ Array is sorted!"),h(!0),window.AppProgress&&window.AppProgress.markMetaphorCompleted("InsertionSort");return}const b=s.arr[s.i];let B=s.i-1;for(u(s.i),d(`Inserting ${b} into sorted portion`);B>=0&&s.arr[B]>b;)s.arr[B+1]=s.arr[B],B--;s.arr[B+1]=b,i([...s.arr]),r(C=>new Set([...C,s.i])),s.i++,u(null),a(null),S([])},v=s=>c.includes(s)?"#ef4444":s===n?"#3b82f6":s===l?"#fbbf24":g.has(s)?"#4ade80":"#e2e8f0";return e.jsxs("div",{style:K.container,children:[e.jsxs("div",{style:K.header,children:[e.jsx("h2",{style:K.title,children:"Insertion Sort — Organizing Cards in Hand 🃏"}),e.jsx("div",{style:K.desc,children:e.jsxs("p",{children:["Insertion Sort works like arranging playing cards in your hand. You pick one card at a time and ",e.jsx("strong",{children:"insert it into its correct position"})," among the already sorted cards."]})})]}),e.jsxs("div",{style:K.visualizer,children:[e.jsx("div",{style:K.sortedPillWrap,children:g.size>1&&e.jsxs("span",{style:K.sortedPill,children:["✓ Sorted: first ",g.size," element",g.size>1?"s":""]})}),e.jsx("div",{style:K.barsContainer,children:t.map((s,b)=>e.jsxs(I.div,{style:K.barWrap,layout:!0,transition:{type:"spring",stiffness:300,damping:30},children:[e.jsx("div",{style:{...K.bar,height:`${s/R*160+20}px`,backgroundColor:v(b)}}),e.jsx("span",{style:K.barLabel,children:s})]},b))}),e.jsx(ie,{children:p&&e.jsx(I.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0},style:K.messageBox,children:p})}),e.jsx("div",{style:K.legend,children:[["#fbbf24","Current"],["#3b82f6","Comparing"],["#ef4444","Shifting"],["#4ade80","Sorted"]].map(([s,b])=>e.jsxs("div",{style:K.legendItem,children:[e.jsx("div",{style:{...K.dot,backgroundColor:s}}),e.jsx("span",{children:b})]},b))})]}),e.jsxs("div",{style:K.controls,children:[e.jsx("button",{onClick:L,disabled:w,style:{...K.btn,backgroundColor:"#4f46e5"},children:"▶ Start Sorting"}),e.jsx("button",{onClick:q,disabled:w||y,style:{...K.btn,backgroundColor:"#0891b2"},children:"⏭ Next Step"}),e.jsx("button",{onClick:T,style:{...K.btn,backgroundColor:"#ef4444"},children:"↺ Reset"})]}),e.jsxs("div",{style:K.codeSection,children:[e.jsx("h3",{style:K.subTitle,children:"Insertion Sort Implementation"}),e.jsx("div",{style:K.langSelector,children:["python","javascript","cpp"].map(s=>e.jsx("button",{onClick:()=>f(s),style:{...K.langBtn,backgroundColor:m===s?"#4f46e5":"#f1f5f9",color:m===s?"#fff":"#64748b",border:m===s?"none":"1px solid #e2e8f0"},children:s==="cpp"?"C++":s.toUpperCase()},s))}),e.jsxs("pre",{style:K.codeBox,children:[m==="python"&&e.jsx("code",{children:`def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key
    return arr

# Time:  O(n²) worst/avg, O(n) best
# Space: O(1) — in-place`}),m==="javascript"&&e.jsx("code",{children:`function insertionSort(arr) {
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
// Space: O(1)`}),m==="cpp"&&e.jsx("code",{children:`void insertionSort(vector<int>& arr) {
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
// Space: O(1)`})]})]}),e.jsxs("div",{style:K.quizSection,children:[e.jsx("h3",{style:K.subTitle,children:"Knowledge Check"}),e.jsx("div",{style:K.quizGrid,children:[{q:"What idea does Insertion Sort follow?",a:"It builds the sorted array one element at a time by inserting each new element into its correct position among already-sorted elements."},{q:"Why is it efficient for nearly sorted arrays?",a:"Because only a few elements need to shift per insertion. In the best case (already sorted), it runs in O(n) with no shifts at all."},{q:"What is its worst-case time complexity?",a:"O(n²) — when the array is in reverse order, every element must be compared with and shifted past all sorted elements."},{q:"When is Insertion Sort preferred?",a:"For small datasets, nearly-sorted data, and online algorithms where elements arrive one at a time (since it sorts incrementally)."}].map((s,b)=>e.jsxs("div",{style:K.quizCard,children:[e.jsxs("p",{style:K.question,children:[e.jsxs("strong",{children:["Q",b+1,":"]})," ",s.q]}),e.jsx("p",{style:K.answer,children:s.a})]},b))})]})]})},K={container:{padding:"2rem",backgroundColor:"#fff",borderRadius:"32px",border:"1px solid #e2e8f0",boxShadow:"0 4px 6px -1px rgba(0,0,0,0.05)",fontFamily:"system-ui, sans-serif"},header:{textAlign:"center",marginBottom:"2rem"},title:{fontSize:"2rem",fontWeight:"900",color:"#1e293b",letterSpacing:"-0.025em",marginBottom:"1rem"},desc:{color:"#64748b",fontSize:"1.05rem",lineHeight:"1.7",maxWidth:"750px",margin:"0 auto"},visualizer:{backgroundColor:"#f8fafc",borderRadius:"24px",padding:"2rem",border:"1px solid #f1f5f9",display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem",marginBottom:"1.5rem"},sortedPillWrap:{height:"28px",display:"flex",alignItems:"center"},sortedPill:{backgroundColor:"#dcfce7",color:"#15803d",fontWeight:"700",fontSize:"0.82rem",padding:"3px 12px",borderRadius:"999px",border:"1px solid #86efac"},barsContainer:{display:"flex",alignItems:"flex-end",gap:"10px",height:"200px",padding:"0 1rem"},barWrap:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},bar:{width:"40px",borderRadius:"6px 6px 0 0",transition:"background-color 0.3s",minHeight:"20px"},barLabel:{fontSize:"0.8rem",fontWeight:"700",color:"#475569"},messageBox:{backgroundColor:"#1e293b",color:"#fff",padding:"0.7rem 1.5rem",borderRadius:"12px",fontSize:"1rem",fontWeight:"700"},legend:{display:"flex",gap:"1.5rem",flexWrap:"wrap",justifyContent:"center"},legendItem:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.9rem",color:"#64748b",fontWeight:"600"},dot:{width:"12px",height:"12px",borderRadius:"50%"},controls:{display:"flex",justifyContent:"center",gap:"1rem",marginBottom:"2rem",flexWrap:"wrap"},btn:{padding:"0.75rem 1.5rem",borderRadius:"12px",border:"none",color:"#fff",fontWeight:"700",cursor:"pointer",fontSize:"1rem",opacity:.9},codeSection:{marginBottom:"3rem"},subTitle:{fontSize:"1.5rem",fontWeight:"900",color:"#1e293b",marginBottom:"1.5rem",textAlign:"center"},langSelector:{display:"flex",justifyContent:"center",gap:"0.75rem",marginBottom:"1.25rem"},langBtn:{padding:"0.6rem 1.2rem",borderRadius:"10px",fontSize:"0.9rem",fontWeight:"700",cursor:"pointer",transition:"all 0.2s"},codeBox:{backgroundColor:"#0f172a",color:"#f8fafc",padding:"1.5rem",borderRadius:"20px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",fontFamily:"monospace"},quizSection:{marginTop:"2rem"},quizGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"1.5rem"},quizCard:{backgroundColor:"#f8fafc",padding:"1.5rem",borderRadius:"20px",border:"1px solid #f1f5f9"},question:{fontWeight:"700",color:"#1e293b",marginBottom:"0.75rem",fontSize:"1rem"},answer:{color:"#10b981",fontWeight:"600",lineHeight:"1.5",fontSize:"0.95rem"}},Ce=t=>new Promise(i=>setTimeout(i,t)),ze=[8,3,5,2,7,4,6,1],mt=()=>{const[t,i]=o.useState([...ze]),[l,u]=o.useState([]),[n,a]=o.useState([]),[c,S]=o.useState(new Set),[g,r]=o.useState(""),[p,d]=o.useState(!1),[w,F]=o.useState(!1),[y,h]=o.useState("python"),[m,f]=o.useState(null),x=o.useRef(!1),R=Math.max(...ze),T=()=>{x.current=!0,setTimeout(()=>{x.current=!1},100),i([...ze]),u([]),a([]),S(new Set),r(""),d(!1),F(!1),f(null)},L=async(b,B,C,E)=>{const j=b.slice(B,C+1),A=b.slice(C+1,E+1);let k=0,z=0,$=B;for(a(Array.from({length:E-B+1},(se,oe)=>B+oe)),u([]),r(`Merging [${j.join(",")}] + [${A.join(",")}]`),await Ce(700);k<j.length&&z<A.length;){if(x.current)return;j[k]<=A[z]?b[$++]=j[k++]:b[$++]=A[z++],i([...b]),await Ce(300)}for(;k<j.length;)b[$++]=j[k++],i([...b]),await Ce(200);for(;z<A.length;)b[$++]=A[z++],i([...b]),await Ce(200);const O=Array.from({length:E-B+1},(se,oe)=>B+oe);S(se=>new Set([...se,...O])),a([]),window.AppProgress&&window.AppProgress.markMetaphorCompleted("MergeSort")},W=async(b,B,C)=>{if(B>=C||x.current)return;const E=Math.floor((B+C)/2);u(Array.from({length:C-B+1},(j,A)=>B+A)),r(`Dividing: indices ${B} to ${C}, mid at ${E}`),await Ce(600),await W(b,B,E),!x.current&&(await W(b,E+1,C),!x.current&&await L(b,B,E,C))},q=async()=>{x.current=!1,d(!0),F(!1),S(new Set);const b=[...ze];i([...b]),await W(b,0,b.length-1),x.current||(S(new Set(Array.from({length:b.length},(B,C)=>C))),u([]),a([]),r("✓ Array is sorted!"),d(!1),F(!0))},v=()=>{w||(r("Use Start Sorting for full animation. Merge Sort is recursive — step mode runs the full sort."),q())},s=b=>c.has(b)?"#4ade80":n.includes(b)?"#3b82f6":l.includes(b)?"#fbbf24":"#e2e8f0";return e.jsxs("div",{style:M.container,children:[e.jsxs("div",{style:M.header,children:[e.jsx("h2",{style:M.title,children:"Merge Sort — Divide and Combine Factory 🏭"}),e.jsxs("div",{style:M.desc,children:[e.jsxs("p",{children:["Merge Sort works by ",e.jsx("strong",{children:"dividing"})," the array into smaller halves, sorting each independently, then ",e.jsx("strong",{children:"merging"})," them back together in order."]}),e.jsxs("p",{children:["It follows the classic ",e.jsx("strong",{children:"Divide and Conquer"})," strategy."]})]})]}),e.jsxs("div",{style:M.splitDiagram,children:[e.jsx("div",{style:M.splitRow,children:e.jsx("span",{style:M.splitBox,children:"[8, 3, 5, 2, 7, 4, 6, 1]"})}),e.jsx("div",{style:M.splitArrow,children:"↓ divide"}),e.jsxs("div",{style:M.splitRow,children:[e.jsx("span",{style:M.splitBox,children:"[8, 3, 5, 2]"}),e.jsx("span",{style:M.splitBox,children:"[7, 4, 6, 1]"})]}),e.jsx("div",{style:M.splitArrow,children:"↓ divide"}),e.jsxs("div",{style:M.splitRow,children:[e.jsx("span",{style:M.splitBox,children:"[8, 3]"}),e.jsx("span",{style:M.splitBox,children:"[5, 2]"}),e.jsx("span",{style:M.splitBox,children:"[7, 4]"}),e.jsx("span",{style:M.splitBox,children:"[6, 1]"})]}),e.jsx("div",{style:M.splitArrow,children:"↑ merge sorted halves"})]}),e.jsxs("div",{style:M.visualizer,children:[e.jsx("div",{style:M.barsContainer,children:t.map((b,B)=>e.jsxs(I.div,{style:M.barWrap,layout:!0,transition:{type:"spring",stiffness:300,damping:30},children:[e.jsx("div",{style:{...M.bar,height:`${b/R*160+20}px`,backgroundColor:s(B)}}),e.jsx("span",{style:M.barLabel,children:b})]},B))}),e.jsx(ie,{children:g&&e.jsx(I.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0},style:M.messageBox,children:g})}),e.jsx("div",{style:M.legend,children:[["#fbbf24","Dividing"],["#3b82f6","Merging"],["#4ade80","Sorted"]].map(([b,B])=>e.jsxs("div",{style:M.legendItem,children:[e.jsx("div",{style:{...M.dot,backgroundColor:b}}),e.jsx("span",{children:B})]},B))})]}),e.jsxs("div",{style:M.controls,children:[e.jsx("button",{onClick:q,disabled:p,style:{...M.btn,backgroundColor:"#4f46e5"},children:"▶ Start Sorting"}),e.jsx("button",{onClick:v,disabled:p||w,style:{...M.btn,backgroundColor:"#0891b2"},children:"⏭ Next Step"}),e.jsx("button",{onClick:T,style:{...M.btn,backgroundColor:"#ef4444"},children:"↺ Reset"})]}),e.jsxs("div",{style:M.codeSection,children:[e.jsx("h3",{style:M.subTitle,children:"Merge Sort Implementation"}),e.jsx("div",{style:M.langSelector,children:["python","javascript","cpp"].map(b=>e.jsx("button",{onClick:()=>h(b),style:{...M.langBtn,backgroundColor:y===b?"#4f46e5":"#f1f5f9",color:y===b?"#fff":"#64748b",border:y===b?"none":"1px solid #e2e8f0"},children:b==="cpp"?"C++":b.toUpperCase()},b))}),e.jsxs("pre",{style:M.codeBox,children:[y==="python"&&e.jsx("code",{children:`def merge_sort(arr):
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
# Space: O(n)      — requires extra space`}),y==="javascript"&&e.jsx("code",{children:`function mergeSort(arr) {
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
// Space: O(n)`}),y==="cpp"&&e.jsx("code",{children:`void merge(vector<int>& arr, int l, int m, int r) {
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
// Space: O(n)`})]})]}),e.jsxs("div",{style:M.quizSection,children:[e.jsx("h3",{style:M.subTitle,children:"Knowledge Check"}),e.jsx("div",{style:M.quizGrid,children:[{q:"What strategy does Merge Sort use?",a:"Divide and Conquer — recursively divide the array into halves, sort each, then merge them back together."},{q:"Why is Merge Sort efficient for large datasets?",a:"Its O(n log n) time complexity even in the worst case makes it much faster than O(n²) algorithms for large inputs."},{q:"What is its time complexity?",a:"O(n log n) in all cases — best, average, and worst. The log n factor comes from the number of divide levels."},{q:"Why does Merge Sort require extra space?",a:"The merge step creates temporary arrays to hold left and right halves during merging, requiring O(n) additional space."}].map((b,B)=>e.jsxs("div",{style:M.quizCard,children:[e.jsxs("p",{style:M.question,children:[e.jsxs("strong",{children:["Q",B+1,":"]})," ",b.q]}),e.jsx("p",{style:M.answer,children:b.a})]},B))})]})]})},M={container:{padding:"2rem",backgroundColor:"#fff",borderRadius:"32px",border:"1px solid #e2e8f0",boxShadow:"0 4px 6px -1px rgba(0,0,0,0.05)",fontFamily:"system-ui, sans-serif"},header:{textAlign:"center",marginBottom:"1.5rem"},title:{fontSize:"2rem",fontWeight:"900",color:"#1e293b",letterSpacing:"-0.025em",marginBottom:"1rem"},desc:{color:"#64748b",fontSize:"1.05rem",lineHeight:"1.7",maxWidth:"750px",margin:"0 auto"},splitDiagram:{backgroundColor:"#f1f5f9",borderRadius:"16px",padding:"1.5rem",marginBottom:"1.5rem",textAlign:"center",fontFamily:"monospace",fontSize:"0.95rem",color:"#334155"},splitRow:{display:"flex",justifyContent:"center",gap:"1rem",marginBottom:"4px",flexWrap:"wrap"},splitBox:{backgroundColor:"#dbeafe",border:"1px solid #93c5fd",borderRadius:"8px",padding:"4px 10px",color:"#1e40af",fontWeight:"700"},splitArrow:{color:"#64748b",fontSize:"0.9rem",margin:"6px 0"},visualizer:{backgroundColor:"#f8fafc",borderRadius:"24px",padding:"2rem",border:"1px solid #f1f5f9",display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem",marginBottom:"1.5rem"},barsContainer:{display:"flex",alignItems:"flex-end",gap:"10px",height:"200px",padding:"0 1rem"},barWrap:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},bar:{width:"40px",borderRadius:"6px 6px 0 0",transition:"background-color 0.3s",minHeight:"20px"},barLabel:{fontSize:"0.8rem",fontWeight:"700",color:"#475569"},messageBox:{backgroundColor:"#1e293b",color:"#fff",padding:"0.7rem 1.5rem",borderRadius:"12px",fontSize:"1rem",fontWeight:"700"},legend:{display:"flex",gap:"1.5rem",flexWrap:"wrap",justifyContent:"center"},legendItem:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.9rem",color:"#64748b",fontWeight:"600"},dot:{width:"12px",height:"12px",borderRadius:"50%"},controls:{display:"flex",justifyContent:"center",gap:"1rem",marginBottom:"2rem",flexWrap:"wrap"},btn:{padding:"0.75rem 1.5rem",borderRadius:"12px",border:"none",color:"#fff",fontWeight:"700",cursor:"pointer",fontSize:"1rem",opacity:.9},codeSection:{marginBottom:"3rem"},subTitle:{fontSize:"1.5rem",fontWeight:"900",color:"#1e293b",marginBottom:"1.5rem",textAlign:"center"},langSelector:{display:"flex",justifyContent:"center",gap:"0.75rem",marginBottom:"1.25rem"},langBtn:{padding:"0.6rem 1.2rem",borderRadius:"10px",fontSize:"0.9rem",fontWeight:"700",cursor:"pointer",transition:"all 0.2s"},codeBox:{backgroundColor:"#0f172a",color:"#f8fafc",padding:"1.5rem",borderRadius:"20px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",fontFamily:"monospace"},quizSection:{marginTop:"2rem"},quizGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"1.5rem"},quizCard:{backgroundColor:"#f8fafc",padding:"1.5rem",borderRadius:"20px",border:"1px solid #f1f5f9"},question:{fontWeight:"700",color:"#1e293b",marginBottom:"0.75rem",fontSize:"1rem"},answer:{color:"#10b981",fontWeight:"600",lineHeight:"1.5",fontSize:"0.95rem"}},Ee=t=>new Promise(i=>setTimeout(i,t)),We=[9,4,7,3,8,2,6,5],gt=()=>{const[t,i]=o.useState([...We]),[l,u]=o.useState(null),[n,a]=o.useState([]),[c,S]=o.useState([]),[g,r]=o.useState(new Set),[p,d]=o.useState(""),[w,F]=o.useState(!1),[y,h]=o.useState(!1),[m,f]=o.useState("python"),x=o.useRef(!1),R=Math.max(...We),T=()=>{x.current=!0,setTimeout(()=>{x.current=!1},100),i([...We]),u(null),a([]),S([]),r(new Set),d(""),F(!1),h(!1)},L=async(s,b,B)=>{const C=s[B];u(B),d(`Pivot: ${C} at index ${B}`),await Ee(600);let E=b-1;for(let j=b;j<B;j++){if(x.current)return E;a([j,B]),d(`Comparing ${s[j]} with pivot ${C}`),await Ee(400),s[j]<=C&&(E++,E!==j&&(S([E,j]),[s[E],s[j]]=[s[j],s[E]],i([...s]),await Ee(350),S([])))}return E++,[s[E],s[B]]=[s[B],s[E]],i([...s]),u(null),a([]),r(j=>new Set([...j,E])),d(`Pivot ${C} placed at index ${E}`),await Ee(400),window.AppProgress&&window.AppProgress.markMetaphorCompleted("QuickSort"),E},W=async(s,b,B)=>{if(b>=B||x.current)return;const C=await L(s,b,B);await W(s,b,C-1),await W(s,C+1,B)},q=async()=>{x.current=!1,F(!0),h(!1),r(new Set);const s=[...We];i([...s]),await W(s,0,s.length-1),x.current||(r(new Set(Array.from({length:s.length},(b,B)=>B))),d("✓ Array is sorted!"),F(!1),h(!0))},v=s=>c.includes(s)?"#ef4444":s===l?"#a855f7":n.includes(s)?"#fbbf24":g.has(s)?"#4ade80":"#e2e8f0";return e.jsxs("div",{style:Y.container,children:[e.jsxs("div",{style:Y.header,children:[e.jsx("h2",{style:Y.title,children:"Quick Sort — Pivot Organizer ⚡"}),e.jsx("div",{style:Y.desc,children:e.jsxs("p",{children:["Quick Sort selects a ",e.jsx("strong",{children:"pivot element"})," and partitions the array so smaller elements go left and larger go right, then recursively sorts each side."]})})]}),e.jsxs("div",{style:Y.visualizer,children:[e.jsx("div",{style:Y.barsContainer,children:t.map((s,b)=>e.jsxs(I.div,{style:Y.barWrap,layout:!0,transition:{type:"spring",stiffness:300,damping:30},children:[e.jsx("div",{style:{...Y.bar,height:`${s/R*160+20}px`,backgroundColor:v(b)}}),e.jsx("span",{style:Y.barLabel,children:s})]},b))}),e.jsx(ie,{children:p&&e.jsx(I.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0},style:Y.messageBox,children:p})}),e.jsx("div",{style:Y.legend,children:[["#a855f7","Pivot"],["#fbbf24","Comparing"],["#ef4444","Swapping"],["#4ade80","Sorted"]].map(([s,b])=>e.jsxs("div",{style:Y.legendItem,children:[e.jsx("div",{style:{...Y.dot,backgroundColor:s}}),e.jsx("span",{children:b})]},b))})]}),e.jsxs("div",{style:Y.controls,children:[e.jsx("button",{onClick:q,disabled:w,style:{...Y.btn,backgroundColor:"#4f46e5"},children:"▶ Start Sorting"}),e.jsx("button",{onClick:()=>{y||q()},disabled:w||y,style:{...Y.btn,backgroundColor:"#0891b2"},children:"⏭ Next Step"}),e.jsx("button",{onClick:T,style:{...Y.btn,backgroundColor:"#ef4444"},children:"↺ Reset"})]}),e.jsxs("div",{style:Y.codeSection,children:[e.jsx("h3",{style:Y.subTitle,children:"Quick Sort Implementation"}),e.jsx("div",{style:Y.langSelector,children:["python","javascript","cpp"].map(s=>e.jsx("button",{onClick:()=>f(s),style:{...Y.langBtn,backgroundColor:m===s?"#4f46e5":"#f1f5f9",color:m===s?"#fff":"#64748b",border:m===s?"none":"1px solid #e2e8f0"},children:s==="cpp"?"C++":s.toUpperCase()},s))}),e.jsxs("pre",{style:Y.codeBox,children:[m==="python"&&e.jsx("code",{children:`def quick_sort(arr, low, high):
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
# Space: O(log n)`}),m==="javascript"&&e.jsx("code",{children:`function quickSort(arr, low=0, high=arr.length-1) {
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
// Time: O(n log n) avg  Space: O(log n)`}),m==="cpp"&&e.jsx("code",{children:`int partition(vector<int>& arr, int low, int high){
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
// Time: O(n log n) avg  Space: O(log n)`})]})]}),e.jsxs("div",{style:Y.quizSection,children:[e.jsx("h3",{style:Y.subTitle,children:"Knowledge Check"}),e.jsx("div",{style:Y.quizGrid,children:[{q:"What is a pivot in Quick Sort?",a:"An element chosen from the array that partitions it — all smaller elements go left, all larger go right."},{q:"What is the average time complexity?",a:"O(n log n) — each partition splits the array roughly in half over log n levels, each with O(n) work."},{q:"Why is Quick Sort usually faster in practice?",a:"Excellent cache locality, in-place partitioning, and low constant factors make it the fastest general-purpose sort in real scenarios."},{q:"What happens in the worst case?",a:"O(n²) when the pivot is always the min or max element. Randomized pivot selection prevents this."}].map((s,b)=>e.jsxs("div",{style:Y.quizCard,children:[e.jsxs("p",{style:Y.question,children:[e.jsxs("strong",{children:["Q",b+1,":"]})," ",s.q]}),e.jsx("p",{style:Y.answer,children:s.a})]},b))})]})]})},Y={container:{padding:"2rem",backgroundColor:"#fff",borderRadius:"32px",border:"1px solid #e2e8f0",boxShadow:"0 4px 6px -1px rgba(0,0,0,0.05)",fontFamily:"system-ui, sans-serif"},header:{textAlign:"center",marginBottom:"2rem"},title:{fontSize:"2rem",fontWeight:"900",color:"#1e293b",letterSpacing:"-0.025em",marginBottom:"1rem"},desc:{color:"#64748b",fontSize:"1.05rem",lineHeight:"1.7",maxWidth:"750px",margin:"0 auto"},visualizer:{backgroundColor:"#f8fafc",borderRadius:"24px",padding:"2rem",display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem",marginBottom:"1.5rem",border:"1px solid #f1f5f9"},barsContainer:{display:"flex",alignItems:"flex-end",gap:"10px",height:"200px",padding:"0 1rem"},barWrap:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},bar:{width:"40px",borderRadius:"6px 6px 0 0",transition:"background-color 0.3s",minHeight:"20px"},barLabel:{fontSize:"0.8rem",fontWeight:"700",color:"#475569"},messageBox:{backgroundColor:"#1e293b",color:"#fff",padding:"0.7rem 1.5rem",borderRadius:"12px",fontSize:"1rem",fontWeight:"700"},legend:{display:"flex",gap:"1.5rem",flexWrap:"wrap",justifyContent:"center"},legendItem:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.9rem",color:"#64748b",fontWeight:"600"},dot:{width:"12px",height:"12px",borderRadius:"50%"},controls:{display:"flex",justifyContent:"center",gap:"1rem",marginBottom:"2rem",flexWrap:"wrap"},btn:{padding:"0.75rem 1.5rem",borderRadius:"12px",border:"none",color:"#fff",fontWeight:"700",cursor:"pointer",fontSize:"1rem",opacity:.9},codeSection:{marginBottom:"3rem"},subTitle:{fontSize:"1.5rem",fontWeight:"900",color:"#1e293b",marginBottom:"1.5rem",textAlign:"center"},langSelector:{display:"flex",justifyContent:"center",gap:"0.75rem",marginBottom:"1.25rem"},langBtn:{padding:"0.6rem 1.2rem",borderRadius:"10px",fontSize:"0.9rem",fontWeight:"700",cursor:"pointer",transition:"all 0.2s"},codeBox:{backgroundColor:"#0f172a",color:"#f8fafc",padding:"1.5rem",borderRadius:"20px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",fontFamily:"monospace"},quizSection:{marginTop:"2rem"},quizGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"1.5rem"},quizCard:{backgroundColor:"#f8fafc",padding:"1.5rem",borderRadius:"20px",border:"1px solid #f1f5f9"},question:{fontWeight:"700",color:"#1e293b",marginBottom:"0.75rem",fontSize:"1rem"},answer:{color:"#10b981",fontWeight:"600",lineHeight:"1.5",fontSize:"0.95rem"}},ke=t=>new Promise(i=>setTimeout(i,t)),Re=[6,3,8,2,7,1,5,4],ht=()=>{const[t,i]=o.useState([...Re]),[l,u]=o.useState(null),[n,a]=o.useState([]),[c,S]=o.useState([]),[g,r]=o.useState(new Set),[p,d]=o.useState(""),[w,F]=o.useState(!1),[y,h]=o.useState(!1),[m,f]=o.useState("python"),x=o.useRef(!1),R=Math.max(...Re),T=()=>{x.current=!0,setTimeout(()=>{x.current=!1},100),i([...Re]),u(null),a([]),S([]),r(new Set),d(""),F(!1),h(!1)},L=async(v,s,b)=>{if(x.current)return;let B=b;const C=2*b+1,E=2*b+2;u(b),a(Array.from({length:s},(j,A)=>A)),C<s&&v[C]>v[B]&&(B=C),E<s&&v[E]>v[B]&&(B=E),B!==b&&(S([b,B]),d(`Heapify: swap arr[${b}]=${v[b]} ↔ arr[${B}]=${v[B]}`),[v[b],v[B]]=[v[B],v[b]],i([...v]),await ke(500),S([]),await L(v,s,B))},W=async()=>{x.current=!1,F(!0),h(!1),r(new Set);const v=[...Re];i([...v]);const s=v.length;d("Building max heap...");for(let B=Math.floor(s/2)-1;B>=0;B--){if(x.current)return;await L(v,s,B),await ke(300)}d("Max heap built! Now extracting elements..."),await ke(500);const b=new Set;for(let B=s-1;B>0;B--){if(x.current)return;u(0),S([0,B]),d(`Swap root (${v[0]}) with last heap element (${v[B]})`),[v[0],v[B]]=[v[B],v[0]],i([...v]),await ke(500),S([]),b.add(B),r(new Set([...b])),await L(v,B,0),await ke(200),window.AppProgress&&window.AppProgress.markMetaphorCompleted("HeapSort")}b.add(0),r(new Set([...b])),u(null),a([]),S([]),d("✓ Array is sorted!"),F(!1),h(!0)},q=v=>c.includes(v)?"#ef4444":v===l?"#a855f7":g.has(v)?"#4ade80":n.includes(v)?"#3b82f6":"#e2e8f0";return t.slice(0,7),g.size,e.jsxs("div",{style:D.container,children:[e.jsxs("div",{style:D.header,children:[e.jsx("h2",{style:D.title,children:"Heap Sort — Priority Heap Organizer 🏔"}),e.jsx("div",{style:D.desc,children:e.jsxs("p",{children:["Heap Sort uses a ",e.jsx("strong",{children:"binary max heap"})," to repeatedly extract the largest element and place it at the end of the array, building a sorted result."]})})]}),e.jsxs("div",{style:D.treeSection,children:[e.jsx("div",{style:D.treeLabel,children:"Binary Heap Tree (first 7 nodes)"}),e.jsxs("div",{style:D.treeWrap,children:[e.jsx("div",{style:D.treeRow,children:e.jsx("div",{style:{...D.treeNode,background:q(0)},children:t[0]})}),e.jsx("div",{style:D.treeRow,children:[1,2].map(v=>e.jsx("div",{style:{...D.treeNode,background:v<t.length?q(v):"#f1f5f9",opacity:v<t.length?1:.3},children:v<t.length?t[v]:""},v))}),e.jsx("div",{style:D.treeRow,children:[3,4,5,6].map(v=>e.jsx("div",{style:{...D.treeNode,background:v<t.length?q(v):"#f1f5f9",opacity:v<t.length?1:.3},children:v<t.length?t[v]:""},v))})]})]}),e.jsxs("div",{style:D.visualizer,children:[e.jsx("div",{style:D.vizLabel,children:"Array Representation"}),e.jsx("div",{style:D.barsContainer,children:t.map((v,s)=>e.jsxs(I.div,{style:D.barWrap,layout:!0,transition:{type:"spring",stiffness:300,damping:30},children:[e.jsx("div",{style:{...D.bar,height:`${v/R*140+20}px`,backgroundColor:q(s)}}),e.jsx("span",{style:D.barLabel,children:v})]},s))}),e.jsx(ie,{children:p&&e.jsx(I.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0},style:D.messageBox,children:p})}),e.jsx("div",{style:D.legend,children:[["#a855f7","Root"],["#3b82f6","Heap"],["#ef4444","Swapping"],["#4ade80","Sorted"]].map(([v,s])=>e.jsxs("div",{style:D.legendItem,children:[e.jsx("div",{style:{...D.dot,backgroundColor:v}}),e.jsx("span",{children:s})]},s))})]}),e.jsxs("div",{style:D.controls,children:[e.jsx("button",{onClick:W,disabled:w,style:{...D.btn,backgroundColor:"#4f46e5"},children:"▶ Start Sorting"}),e.jsx("button",{onClick:()=>{y||W()},disabled:w||y,style:{...D.btn,backgroundColor:"#0891b2"},children:"⏭ Next Step"}),e.jsx("button",{onClick:T,style:{...D.btn,backgroundColor:"#ef4444"},children:"↺ Reset"})]}),e.jsxs("div",{style:D.codeSection,children:[e.jsx("h3",{style:D.subTitle,children:"Heap Sort Implementation"}),e.jsx("div",{style:D.langSelector,children:["python","javascript","cpp"].map(v=>e.jsx("button",{onClick:()=>f(v),style:{...D.langBtn,backgroundColor:m===v?"#4f46e5":"#f1f5f9",color:m===v?"#fff":"#64748b",border:m===v?"none":"1px solid #e2e8f0"},children:v==="cpp"?"C++":v.toUpperCase()},v))}),e.jsxs("pre",{style:D.codeBox,children:[m==="python"&&e.jsx("code",{children:`def heap_sort(arr):
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
# Space: O(1) — in-place`}),m==="javascript"&&e.jsx("code",{children:`function heapSort(arr) {
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
// Time: O(n log n)  Space: O(1)`}),m==="cpp"&&e.jsx("code",{children:`void heapify(vector<int>&arr,int n,int i){
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
// Time: O(n log n)  Space: O(1)`})]})]}),e.jsxs("div",{style:D.quizSection,children:[e.jsx("h3",{style:D.subTitle,children:"Knowledge Check"}),e.jsx("div",{style:D.quizGrid,children:[{q:"What data structure does Heap Sort rely on?",a:"A binary max heap — a complete binary tree where each parent node is greater than or equal to its children."},{q:"What are the two main phases of Heap Sort?",a:"Build max heap (O(n)), then repeatedly extract the maximum element and heapify the remaining heap (O(n log n) total)."},{q:"What is the time complexity of Heap Sort?",a:"O(n log n) in all cases — best, average, and worst. It never degrades unlike Quick Sort."},{q:"Why is Heap Sort not cache-friendly?",a:"It accesses elements far apart in memory (parent/child in a heap array), causing more cache misses than algorithms like Insertion Sort on small data."}].map((v,s)=>e.jsxs("div",{style:D.quizCard,children:[e.jsxs("p",{style:D.question,children:[e.jsxs("strong",{children:["Q",s+1,":"]})," ",v.q]}),e.jsx("p",{style:D.answer,children:v.a})]},s))})]})]})},D={container:{padding:"2rem",backgroundColor:"#fff",borderRadius:"32px",border:"1px solid #e2e8f0",boxShadow:"0 4px 6px -1px rgba(0,0,0,0.05)",fontFamily:"system-ui, sans-serif"},header:{textAlign:"center",marginBottom:"1.5rem"},title:{fontSize:"2rem",fontWeight:"900",color:"#1e293b",letterSpacing:"-0.025em",marginBottom:"1rem"},desc:{color:"#64748b",fontSize:"1.05rem",lineHeight:"1.7",maxWidth:"750px",margin:"0 auto"},treeSection:{backgroundColor:"#f8fafc",borderRadius:"20px",padding:"1.5rem",marginBottom:"1.5rem",border:"1px solid #f1f5f9",display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem"},treeLabel:{fontSize:"0.9rem",fontWeight:"700",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.05em"},treeWrap:{display:"flex",flexDirection:"column",alignItems:"center",gap:"12px"},treeRow:{display:"flex",gap:"16px",justifyContent:"center"},treeNode:{width:"44px",height:"44px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"900",fontSize:"1rem",color:"#1e293b",border:"2px solid rgba(0,0,0,0.08)",transition:"background-color 0.3s"},visualizer:{backgroundColor:"#f8fafc",borderRadius:"24px",padding:"2rem",border:"1px solid #f1f5f9",display:"flex",flexDirection:"column",alignItems:"center",gap:"1rem",marginBottom:"1.5rem"},vizLabel:{fontSize:"0.9rem",fontWeight:"700",color:"#64748b",textTransform:"uppercase",letterSpacing:"0.05em"},barsContainer:{display:"flex",alignItems:"flex-end",gap:"10px",height:"180px",padding:"0 1rem"},barWrap:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},bar:{width:"40px",borderRadius:"6px 6px 0 0",transition:"background-color 0.3s",minHeight:"20px"},barLabel:{fontSize:"0.8rem",fontWeight:"700",color:"#475569"},messageBox:{backgroundColor:"#1e293b",color:"#fff",padding:"0.7rem 1.5rem",borderRadius:"12px",fontSize:"1rem",fontWeight:"700"},legend:{display:"flex",gap:"1.5rem",flexWrap:"wrap",justifyContent:"center"},legendItem:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.9rem",color:"#64748b",fontWeight:"600"},dot:{width:"12px",height:"12px",borderRadius:"50%"},controls:{display:"flex",justifyContent:"center",gap:"1rem",marginBottom:"2rem",flexWrap:"wrap"},btn:{padding:"0.75rem 1.5rem",borderRadius:"12px",border:"none",color:"#fff",fontWeight:"700",cursor:"pointer",fontSize:"1rem",opacity:.9},codeSection:{marginBottom:"3rem"},subTitle:{fontSize:"1.5rem",fontWeight:"900",color:"#1e293b",marginBottom:"1.5rem",textAlign:"center"},langSelector:{display:"flex",justifyContent:"center",gap:"0.75rem",marginBottom:"1.25rem"},langBtn:{padding:"0.6rem 1.2rem",borderRadius:"10px",fontSize:"0.9rem",fontWeight:"700",cursor:"pointer",transition:"all 0.2s"},codeBox:{backgroundColor:"#0f172a",color:"#f8fafc",padding:"1.5rem",borderRadius:"20px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",fontFamily:"monospace"},quizSection:{marginTop:"2rem"},quizGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"1.5rem"},quizCard:{backgroundColor:"#f8fafc",padding:"1.5rem",borderRadius:"20px",border:"1px solid #f1f5f9"},question:{fontWeight:"700",color:"#1e293b",marginBottom:"0.75rem",fontSize:"1rem"},answer:{color:"#10b981",fontWeight:"600",lineHeight:"1.5",fontSize:"0.95rem"}},ft=t=>new Promise(i=>setTimeout(i,t)),Ne=[{id:"sort-colors",title:"Sort Colors",desc:"Sort an array containing 0s, 1s, and 2s using the Dutch National Flag algorithm in O(n) with a single pass.",difficulty:"Easy",tag:"🎨"},{id:"merge-sorted",title:"Merge Two Sorted Arrays",desc:"Merge two sorted arrays into a single sorted array using a two-pointer technique.",difficulty:"Easy",tag:"🔗"},{id:"kth-largest",title:"Kth Largest Element",desc:"Find the kth largest element in an unsorted array using a min-heap of size k.",difficulty:"Medium",tag:"🏆"},{id:"top-k-frequent",title:"Top K Frequent Elements",desc:"Return the k most frequent elements using a frequency map and heap sorting.",difficulty:"Medium",tag:"📊"},{id:"merge-intervals",title:"Merge Intervals",desc:"Sort intervals by start time, then merge all overlapping intervals into one.",difficulty:"Medium",tag:"📐"},{id:"quickselect",title:"QuickSelect Kth Element",desc:"Use QuickSelect partitioning to find the kth smallest element in O(n) average time.",difficulty:"Medium",tag:"⚡"},{id:"sort-linked-list",title:"Sort a Linked List",desc:"Sort a singly linked list using Merge Sort — split into halves, sort each, then merge.",difficulty:"Hard",tag:"🔗"},{id:"count-inversions",title:"Count Inversions",desc:"Count pairs (i,j) where i<j but arr[i]>arr[j] — solved efficiently with Merge Sort.",difficulty:"Hard",tag:"🔢"}],Ve=t=>({padding:"3px 10px",borderRadius:"999px",fontSize:"12px",fontWeight:"700",backgroundColor:t==="Easy"?"#dcfce7":t==="Medium"?"#fff7ed":"#fee2e2",color:t==="Easy"?"#15803d":t==="Medium"?"#c2410c":"#b91c1c",display:"inline-block"}),xt=()=>{const t=[2,0,1,2,1,0,2,1,0,1],[i,l]=o.useState([...t]),[u,n]=o.useState(null),[a,c]=o.useState(null),[S,g]=o.useState(null),[r,p]=o.useState(""),[d,w]=o.useState(!1),[F,y]=o.useState(!1);o.useRef(!1);const h={0:"#3b82f6",1:"#f8fafc",2:"#ef4444"},m={0:"#1d4ed8",1:"#94a3b8",2:"#991b1b"};return e.jsxs("div",{style:re.wrap,children:[e.jsxs("div",{style:re.desc,children:["Dutch National Flag: three pointers ",e.jsx("strong",{children:"lo"}),", ",e.jsx("strong",{children:"mid"}),", ",e.jsx("strong",{children:"hi"})," partition 0s left, 1s middle, 2s right in one pass."]}),e.jsxs("div",{style:re.vizArea,children:[e.jsx("div",{style:{display:"flex",gap:"8px",alignItems:"flex-end",justifyContent:"center",flexWrap:"wrap"},children:i.map((f,x)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},children:[e.jsx("div",{style:{...re.cell,backgroundColor:h[f],border:`2px solid ${m[f]}`,outline:x===a?"3px solid #f59e0b":x===u?"3px solid #6366f1":x===S?"3px solid #ec4899":"none",outlineOffset:"2px"},children:f}),e.jsx("span",{style:{fontSize:"0.65rem",fontWeight:"700",color:x===u?"#6366f1":x===a?"#f59e0b":x===S?"#ec4899":"#94a3b8"},children:x===u?"lo":x===a?"mid":x===S?"hi":""})]},x))}),r&&e.jsx("div",{style:re.msg,children:r})]}),e.jsxs("div",{style:re.legend,children:[e.jsx("span",{style:{color:"#3b82f6",fontWeight:"700"},children:"■ 0 (Blue)"}),e.jsx("span",{style:{color:"#64748b",fontWeight:"700"},children:"■ 1 (White)"}),e.jsx("span",{style:{color:"#ef4444",fontWeight:"700"},children:"■ 2 (Red)"})]})]})},yt=()=>{const t=[1,3,5,7],i=[2,4,6,8],[l,u]=o.useState([]),[n,a]=o.useState(null),[c,S]=o.useState(null),[g,r]=o.useState(""),[p,d]=o.useState(!1),[w,F]=o.useState(!1);return o.useRef(!1),e.jsxs("div",{style:re.wrap,children:[e.jsx("div",{style:re.desc,children:"Two-pointer merge: compare front elements from each sorted array, always picking the smaller one."}),e.jsxs("div",{style:re.vizArea,children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"16px",alignItems:"center"},children:[e.jsxs("div",{style:{display:"flex",gap:"4px",alignItems:"center"},children:[e.jsx("span",{style:{fontWeight:"700",color:"#4f46e5",marginRight:"8px",width:"24px"},children:"A:"}),t.map((y,h)=>e.jsx("div",{style:{...re.cell,backgroundColor:h===n?"#fbbf24":"#dbeafe",border:"2px solid #93c5fd"},children:y},h))]}),e.jsxs("div",{style:{display:"flex",gap:"4px",alignItems:"center"},children:[e.jsx("span",{style:{fontWeight:"700",color:"#0891b2",marginRight:"8px",width:"24px"},children:"B:"}),i.map((y,h)=>e.jsx("div",{style:{...re.cell,backgroundColor:h===c?"#fbbf24":"#dcfce7",border:"2px solid #86efac"},children:y},h))]}),e.jsxs("div",{style:{display:"flex",gap:"4px",alignItems:"center"},children:[e.jsx("span",{style:{fontWeight:"700",color:"#15803d",marginRight:"8px",width:"24px"},children:"→"}),l.map((y,h)=>e.jsx("div",{style:{...re.cell,backgroundColor:"#4ade80",border:"2px solid #16a34a"},children:y},h)),l.length===0&&e.jsx("span",{style:{color:"#94a3b8",fontSize:"0.85rem"},children:"merged result appears here"})]})]}),g&&e.jsx("div",{style:re.msg,children:g})]})]})},ve=({title:t,steps:i,initState:l})=>{const[u,n]=o.useState(0),[a,c]=o.useState(!1),[S,g]=o.useState(!1),[r,p]=o.useState(l),d=o.useRef(!1),w=()=>{d.current=!0,setTimeout(()=>{d.current=!1},100),n(0),c(!1),g(!1),p(l)},F=async()=>{d.current=!1,g(!0),c(!1);for(let m=0;m<i.length;m++){if(d.current)return;n(m),p(i[m].state),await ft(900)}c(!0),g(!1),n(i.length-1),window.AppProgress&&window.AppProgress.markProblemSolved()},y=()=>{if(a||S)return;const m=Math.min(u+1,i.length-1);n(m),p(i[m].state),m===i.length-1&&c(!0)},h=i[u];return e.jsxs("div",{style:re.wrap,children:[e.jsx("div",{style:re.desc,children:t}),e.jsxs("div",{style:re.vizArea,children:[e.jsx("div",{style:{display:"flex",gap:"6px",alignItems:"flex-end",justifyContent:"center",flexWrap:"wrap",marginBottom:"12px"},children:r.map((m,f)=>e.jsx("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},children:e.jsx("div",{style:{...re.cell,backgroundColor:m.color||"#e2e8f0",border:`2px solid ${m.border||"#94a3b8"}`,minWidth:m.label?"50px":"40px",fontSize:m.label?"0.7rem":"0.9rem"},children:m.label||m.val})},f))}),h&&e.jsx("div",{style:re.msg,children:h.msg})]}),e.jsxs("div",{style:re.controls,children:[e.jsx("button",{onClick:F,disabled:S,style:re.btn("#4f46e5"),children:"▶ Start"}),e.jsx("button",{onClick:y,disabled:S||a,style:re.btn("#0891b2"),children:"⏭ Step"}),e.jsx("button",{onClick:w,style:re.btn("#ef4444"),children:"↺ Reset"})]})]})},bt=(()=>{const t=[3,2,1,5,6,4],i=2,l=[],u=[];u.push({msg:`Find ${i}nd largest in [${t.join(", ")}]. Build min-heap of size ${i}.`,state:t.map(n=>({val:n,color:"#e2e8f0",border:"#94a3b8"}))});for(let n=0;n<t.length;n++)l.push(t[n]),l.sort((a,c)=>a-c),l.length>i&&l.shift(),u.push({msg:`Add ${t[n]} to heap. Heap: [${l.join(", ")}]`,state:t.map((a,c)=>({val:a,color:c<=n?"#dbeafe":"#e2e8f0",border:c<=n?"#93c5fd":"#94a3b8"}))});return u.push({msg:`✓ Heap root = ${l[0]} is the ${i}nd largest element!`,state:t.map(n=>({val:n,color:n===l[0]?"#4ade80":"#dbeafe",border:n===l[0]?"#16a34a":"#93c5fd"}))}),u})(),jt=[{msg:"Input intervals: [[1,3],[2,6],[8,10],[15,18]]. Sort by start time.",state:[{label:"[1,3]",color:"#dbeafe",border:"#93c5fd"},{label:"[2,6]",color:"#dbeafe",border:"#93c5fd"},{label:"[8,10]",color:"#dbeafe",border:"#93c5fd"},{label:"[15,18]",color:"#dbeafe",border:"#93c5fd"}]},{msg:"Compare [1,3] and [2,6]: 2 ≤ 3, they overlap! Merge → [1,6]",state:[{label:"[1,6]",color:"#fbbf24",border:"#d97706"},{label:"[8,10]",color:"#dbeafe",border:"#93c5fd"},{label:"[15,18]",color:"#dbeafe",border:"#93c5fd"}]},{msg:"Compare [1,6] and [8,10]: 8 > 6, no overlap. Keep both.",state:[{label:"[1,6]",color:"#4ade80",border:"#16a34a"},{label:"[8,10]",color:"#fbbf24",border:"#d97706"},{label:"[15,18]",color:"#dbeafe",border:"#93c5fd"}]},{msg:"Compare [8,10] and [15,18]: 15 > 10, no overlap. Keep both.",state:[{label:"[1,6]",color:"#4ade80",border:"#16a34a"},{label:"[8,10]",color:"#4ade80",border:"#16a34a"},{label:"[15,18]",color:"#fbbf24",border:"#d97706"}]},{msg:"✓ Merged: [[1,6],[8,10],[15,18]]",state:[{label:"[1,6]",color:"#4ade80",border:"#16a34a"},{label:"[8,10]",color:"#4ade80",border:"#16a34a"},{label:"[15,18]",color:"#4ade80",border:"#16a34a"}]}],vt=(()=>{const t=[7,2,5,1,8];return[{msg:`Find 2nd smallest in [${t.join(", ")}]. Choose pivot = ${t[t.length-1]}.`,state:t.map((l,u)=>({val:l,color:u===t.length-1?"#a855f7":"#e2e8f0",border:u===t.length-1?"#7c3aed":"#94a3b8"}))},{msg:"Partition: values ≤ 8 go left, values > 8 go right.",state:[{val:7},{val:2},{val:5},{val:1},{val:8,color:"#a855f7",border:"#7c3aed"}].map(l=>({...l,color:l.color||"#fbbf24",border:l.border||"#d97706"}))},{msg:"Pivot 8 is at index 4. k=2 < 4, search left partition [7,2,5,1].",state:[7,2,5,1].map(l=>({val:l,color:"#dbeafe",border:"#93c5fd"}))},{msg:"New pivot = 1. Partition [7,2,5] vs 1. Pivot 1 is at index 0. k=2 > 0, search right.",state:[{val:1,color:"#a855f7",border:"#7c3aed"},{val:7},{val:2},{val:5}].map(l=>({...l,color:l.color||"#fbbf24",border:l.border||"#d97706"}))},{msg:"✓ 2nd smallest is 2!",state:[1,2,5,7,8].map((l,u)=>({val:l,color:u===1?"#4ade80":"#dbeafe",border:u===1?"#16a34a":"#93c5fd"}))}]})(),St=[{msg:"Input linked list: 4→2→1→3. Split into halves.",state:[{val:4},{val:2},{val:1},{val:3}].map(t=>({...t,color:"#dbeafe",border:"#93c5fd"}))},{msg:"Left half: 4→2, Right half: 1→3. Sort each recursively.",state:[{val:4,color:"#fbbf24",border:"#d97706"},{val:2,color:"#fbbf24",border:"#d97706"},{val:1,color:"#a855f7",border:"#7c3aed"},{val:3,color:"#a855f7",border:"#7c3aed"}]},{msg:"Left sorted: 2→4, Right sorted: 1→3. Now merge.",state:[{val:2},{val:4},{val:1},{val:3}].map(t=>({...t,color:"#4ade80",border:"#16a34a"}))},{msg:"Merge: compare 2 vs 1. Take 1.",state:[{val:1,color:"#4ade80",border:"#16a34a"},{val:2},{val:4},{val:3}].map(t=>({...t,color:t.color||"#fbbf24",border:t.border||"#d97706"}))},{msg:"✓ Sorted list: 1→2→3→4",state:[1,2,3,4].map(t=>({val:t,color:"#4ade80",border:"#16a34a"}))}],wt=(()=>{const t=[3,1,2];return[{msg:`Count inversions in [${t.join(", ")}]. (i<j but arr[i]>arr[j])`,state:t.map(i=>({val:i,color:"#dbeafe",border:"#93c5fd"}))},{msg:"Split: [3] and [1,2]. Merge sort counts inversions during merge.",state:[{val:3,color:"#fbbf24",border:"#d97706"},{val:1,color:"#a855f7",border:"#7c3aed"},{val:2,color:"#a855f7",border:"#7c3aed"}]},{msg:"Merging [3] and [1,2]: 3 > 1 → +1 inversion (3,1). Merge 1 first.",state:[{val:1,color:"#4ade80",border:"#16a34a"},{val:3,color:"#fbbf24",border:"#d97706"},{val:2,color:"#fbbf24",border:"#d97706"}]},{msg:"3 > 2 → +1 inversion (3,2). Merge 2. Total: 2 inversions.",state:[{val:1,color:"#4ade80",border:"#16a34a"},{val:2,color:"#4ade80",border:"#16a34a"},{val:3,color:"#4ade80",border:"#16a34a"}]},{msg:"✓ Total inversions = 2: pairs (3,1) and (3,2)",state:[1,2,3].map(i=>({val:i,color:"#4ade80",border:"#16a34a"}))}]})(),Ct=[{msg:"Input: [1,1,1,2,2,3], k=2. Build frequency map.",state:[{label:"1:3",color:"#dbeafe",border:"#93c5fd"},{label:"2:2",color:"#dbeafe",border:"#93c5fd"},{label:"3:1",color:"#dbeafe",border:"#93c5fd"}]},{msg:"Sort by frequency: 1(3 times) > 2(2 times) > 3(1 time).",state:[{label:"1:3",color:"#fbbf24",border:"#d97706"},{label:"2:2",color:"#fbbf24",border:"#d97706"},{label:"3:1",color:"#e2e8f0",border:"#94a3b8"}]},{msg:"✓ Top 2 frequent: [1, 2]",state:[{label:"1:3",color:"#4ade80",border:"#16a34a"},{label:"2:2",color:"#4ade80",border:"#16a34a"},{label:"3:1",color:"#e2e8f0",border:"#94a3b8"}]}],kt={"sort-colors":{python:`def sortColors(nums):
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
}`}},Bt=({id:t})=>t==="sort-colors"?e.jsx(xt,{}):t==="merge-sorted"?e.jsx(yt,{}):t==="kth-largest"?e.jsx(ve,{title:"Min-heap of size k: scan all elements, always keep k largest.",steps:bt,initState:[3,2,1,5,6,4].map(i=>({val:i,color:"#e2e8f0",border:"#94a3b8"}))}):t==="top-k-frequent"?e.jsx(ve,{title:"Build frequency map, sort by frequency, take top k.",steps:Ct,initState:[{label:"1:?",color:"#e2e8f0",border:"#94a3b8"},{label:"2:?",color:"#e2e8f0",border:"#94a3b8"},{label:"3:?",color:"#e2e8f0",border:"#94a3b8"}]}):t==="merge-intervals"?e.jsx(ve,{title:"Sort intervals by start, then greedily merge overlapping ones.",steps:jt,initState:[{label:"[1,3]"},{label:"[2,6]"},{label:"[8,10]"},{label:"[15,18]"}].map(i=>({...i,color:"#dbeafe",border:"#93c5fd"}))}):t==="quickselect"?e.jsx(ve,{title:"QuickSelect: partition around pivot, recurse only toward the target index.",steps:vt,initState:[7,2,5,1,8].map(i=>({val:i,color:"#e2e8f0",border:"#94a3b8"}))}):t==="sort-linked-list"?e.jsx(ve,{title:"Split linked list at midpoint, recursively sort each half, then merge.",steps:St,initState:[4,2,1,3].map(i=>({val:i,color:"#dbeafe",border:"#93c5fd"}))}):t==="count-inversions"?e.jsx(ve,{title:"Modified Merge Sort: count inversions when merging — each out-of-order merge adds left.length - i inversions.",steps:wt,initState:[3,1,2].map(i=>({val:i,color:"#dbeafe",border:"#93c5fd"}))}):null,Ft=()=>{const[t,i]=o.useState(Ne[0]),[l,u]=o.useState("python");return e.jsxs("div",{style:ce.outer,children:[e.jsxs("div",{style:ce.headerWrap,children:[e.jsx("h2",{style:ce.heading,children:"Sorting Practice Problems"}),e.jsx("p",{style:ce.sub,children:"Practice common sorting challenges and explore step-by-step animated solutions."})]}),e.jsxs("div",{style:ce.split,children:[e.jsx("div",{style:ce.left,children:Ne.map(n=>e.jsxs("div",{onClick:()=>{i(n),u("python")},style:{...ce.card,boxShadow:t.id===n.id?"0 0 0 2px #4f46e5":"0 4px 10px rgba(0,0,0,0.05)",backgroundColor:t.id===n.id?"#f0f1fe":"#fff"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"6px"},children:[e.jsxs("span",{style:{fontWeight:"800",color:"#1e293b",fontSize:"0.98rem"},children:[n.tag," ",n.title]}),e.jsx("span",{style:Ve(n.difficulty),children:n.difficulty})]}),e.jsx("p",{style:{fontSize:"0.82rem",color:"#64748b",margin:0,lineHeight:"1.5"},children:n.desc}),e.jsx("button",{style:{...ce.viewBtn,marginTop:"10px",backgroundColor:t.id===n.id?"#4f46e5":"#f1f5f9",color:t.id===n.id?"#fff":"#4f46e5"},children:t.id===n.id?"▸ Viewing Solution":"View Animated Solution"})]},n.id))}),e.jsx("div",{style:ce.right,children:e.jsx(ie,{mode:"wait",children:e.jsx(I.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},exit:{opacity:0},transition:{duration:.25},children:e.jsxs("div",{style:ce.panel,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",flexWrap:"wrap",gap:"8px"},children:[e.jsxs("h3",{style:{margin:0,fontSize:"1.3rem",fontWeight:"900",color:"#1e293b"},children:[t.tag," ",t.title]}),e.jsx("span",{style:Ve(t.difficulty),children:t.difficulty})]}),e.jsx("p",{style:{color:"#64748b",marginBottom:"20px",lineHeight:"1.6",fontSize:"0.95rem"},children:t.desc}),e.jsx(Bt,{id:t.id}),e.jsxs("div",{style:{marginTop:"24px"},children:[e.jsx("h4",{style:{fontWeight:"800",color:"#1e293b",marginBottom:"12px"},children:"Implementation"}),e.jsx("div",{style:{display:"flex",gap:"8px",marginBottom:"12px",flexWrap:"wrap"},children:["python","javascript","cpp"].map(n=>e.jsx("button",{onClick:()=>u(n),style:{padding:"5px 14px",borderRadius:"8px",border:l===n?"none":"1px solid #e2e8f0",backgroundColor:l===n?"#4f46e5":"#f8fafc",color:l===n?"#fff":"#64748b",fontWeight:"700",cursor:"pointer",fontSize:"0.85rem"},children:n==="cpp"?"C++":n.toUpperCase()},n))}),e.jsx("pre",{style:{backgroundColor:"#0f172a",color:"#f8fafc",padding:"1.2rem",borderRadius:"14px",overflowX:"auto",fontSize:"0.85rem",lineHeight:"1.6",fontFamily:"monospace",margin:0},children:e.jsx("code",{children:kt[t.id]?.[l]||"// Coming soon"})})]})]})},t.id)})})]})]})},re={wrap:{display:"flex",flexDirection:"column",gap:"12px"},desc:{fontSize:"0.9rem",color:"#64748b",lineHeight:"1.6",backgroundColor:"#f1f5f9",borderRadius:"10px",padding:"10px 14px"},vizArea:{backgroundColor:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:"14px",padding:"20px",display:"flex",flexDirection:"column",gap:"12px",alignItems:"center",minHeight:"120px"},cell:{width:"40px",height:"40px",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"900",fontSize:"0.9rem",color:"#1e293b",transition:"background-color 0.3s, outline 0.2s"},msg:{backgroundColor:"#1e293b",color:"#fff",padding:"8px 16px",borderRadius:"10px",fontSize:"0.88rem",fontWeight:"700",textAlign:"center"},legend:{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap",fontSize:"0.85rem"},controls:{display:"flex",gap:"8px",justifyContent:"center",flexWrap:"wrap"},btn:t=>({padding:"8px 16px",borderRadius:"10px",border:"none",backgroundColor:t,color:"#fff",fontWeight:"700",cursor:"pointer",fontSize:"0.9rem"})},ce={outer:{fontFamily:"system-ui, sans-serif",width:"100%"},headerWrap:{textAlign:"center",marginBottom:"28px"},heading:{fontSize:"1.8rem",fontWeight:"900",color:"#1e293b",marginBottom:"8px"},sub:{fontSize:"1rem",color:"#64748b",margin:0},split:{display:"flex",gap:"20px",alignItems:"flex-start",flexWrap:"wrap"},left:{flex:"0 0 38%",minWidth:"260px",display:"flex",flexDirection:"column",gap:"12px"},right:{flex:1,minWidth:"300px"},card:{borderRadius:"14px",padding:"16px",cursor:"pointer",transition:"box-shadow 0.2s, background-color 0.15s",border:"1px solid #f1f5f9"},viewBtn:{padding:"6px 14px",borderRadius:"8px",border:"none",cursor:"pointer",fontWeight:"700",fontSize:"0.82rem",transition:"all 0.2s"},panel:{backgroundColor:"#f8fafc",borderRadius:"16px",padding:"24px",border:"1px solid #e2e8f0"}},_e=[{id:"bubble",label:"🫧 Bubble Sort"},{id:"selection",label:"🎯 Selection Sort"},{id:"insertion",label:"📌 Insertion Sort"},{id:"merge",label:"🔀 Merge Sort"},{id:"quick",label:"⚡ Quick Sort"},{id:"heap",label:"🏔 Heap Sort"},{id:"practice",label:"📝 Practice Problems"}],At=({name:t})=>e.jsxs("div",{style:{padding:"3rem",textAlign:"center",color:"#64748b",fontFamily:"system-ui, sans-serif"},children:[e.jsx("div",{style:{fontSize:"3rem",marginBottom:"1rem"},children:"🚧"}),e.jsx("h3",{style:{fontSize:"1.5rem",fontWeight:"700",color:"#1e293b",marginBottom:"0.5rem"},children:t}),e.jsx("p",{style:{fontSize:"1rem"},children:"This metaphor is coming soon. Stay tuned!"})]}),zt=()=>{const[t,i]=o.useState("bubble"),[l,u]=o.useState(null),n=()=>{switch(t){case"bubble":return e.jsx(ct,{});case"selection":return e.jsx(pt,{});case"insertion":return e.jsx(ut,{});case"merge":return e.jsx(mt,{});case"quick":return e.jsx(gt,{});case"heap":return e.jsx(ht,{});case"practice":return e.jsx(Ft,{});default:return e.jsx(At,{name:_e.find(a=>a.id===t)?.label})}};return e.jsxs("div",{style:ue.shell,children:[e.jsxs("div",{style:ue.header,children:[e.jsx("h2",{style:ue.title,children:"Sorting Algorithms"}),e.jsx("p",{style:ue.subtitle,children:"Sorting algorithms arrange elements in a specific order, usually ascending or descending. Efficient sorting is essential for searching, databases, and many algorithmic tasks."})]}),e.jsx("div",{style:ue.tabBar,children:e.jsx("div",{style:ue.tabScroll,children:_e.map(a=>e.jsx("button",{onClick:()=>i(a.id),onMouseEnter:()=>u(a.id),onMouseLeave:()=>u(null),style:{...ue.tab,borderBottom:t===a.id?"3px solid #4f46e5":"3px solid transparent",color:t===a.id?"#4f46e5":l===a.id?"#1e293b":"#64748b"},children:a.label},a.id))})}),e.jsx("div",{style:ue.content,children:n()})]})},ue={shell:{width:"100%",maxWidth:"1000px",margin:"0 auto",fontFamily:"system-ui, sans-serif"},header:{textAlign:"center",padding:"1.5rem 1rem 0.5rem",marginBottom:"1rem"},title:{fontSize:"1.8rem",fontWeight:"900",color:"#1e293b",marginBottom:"0.5rem"},subtitle:{fontSize:"1rem",color:"#64748b",lineHeight:"1.6",maxWidth:"700px",margin:"0 auto"},tabBar:{width:"100%",borderBottom:"2px solid #e2e8f0",marginBottom:"1.5rem"},tabScroll:{display:"flex",gap:"1.5rem",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",padding:"0 0.5rem"},tab:{padding:"0.8rem 0",background:"none",border:"none",fontSize:"1rem",fontWeight:"600",cursor:"pointer",transition:"all 0.2s",whiteSpace:"nowrap"},content:{}},Et=t=>new Promise(i=>setTimeout(i,t)),Wt=()=>{const[t,i]=o.useState({array:[12,7,19,4,15],target:"4",currentIndex:-1,checkedIndices:[],foundIndex:-1,status:"idle",phase:"idle",message:"Ready to search."}),[l,u]=o.useState("python"),n=o.useRef(!1);o.useEffect(()=>{let r=!0,p;const d=async()=>{t.status!=="running"||!n.current||!r||(await Et(1e3),!(!n.current||!r)&&(i(w=>{if(w.status!=="running")return w;const F=a(w);return F.status!=="running"&&(n.current=!1),F}),n.current&&(p=setTimeout(d,100))))};return t.status==="running"&&n.current&&d(),()=>{r=!1,clearTimeout(p)}},[t.status]);const a=r=>{const p=parseInt(r.target);if(r.status==="idle")return{...r,status:"running",phase:"compare",currentIndex:0,message:`Checking index 0. Compare ${r.array[0]} with ${p}.`};if(r.status==="running"){if(r.phase==="compare"){const d=r.array[r.currentIndex];return d===p?{...r,status:"found",phase:"found",foundIndex:r.currentIndex,message:`Element found at index ${r.currentIndex}!`}:{...r,phase:"move",message:`${d} is not equal to ${p}.`}}else if(r.phase==="move"){const d=r.currentIndex+1,w=[...r.checkedIndices,r.currentIndex];return d>=r.array.length?{...r,status:"not-found",phase:"not-found",checkedIndices:w,currentIndex:-1,message:"Target not found."}:{...r,phase:"compare",checkedIndices:w,currentIndex:d,message:`Moving to next element. Checking index ${d}. Compare ${r.array[d]} with ${p}.`}}}return r},c=()=>{if(!t.target||isNaN(parseInt(t.target))){i(r=>({...r,message:"Please enter a valid number to search."}));return}g(),n.current=!0,i(r=>a({...r,status:"idle"}))},S=()=>{if(!t.target||isNaN(parseInt(t.target))){i(r=>({...r,message:"Please enter a valid number to search."}));return}n.current=!1,i(r=>a(r))},g=()=>{n.current=!1,i(r=>({...r,currentIndex:-1,checkedIndices:[],foundIndex:-1,status:"idle",phase:"idle",message:"Ready to search."}))};return e.jsxs("div",{style:_.container,children:[e.jsxs("div",{style:_.header,children:[e.jsx("h2",{style:_.title,children:"Linear Search — Finding a Book on a Shelf 📚"}),e.jsxs("div",{style:_.desc,children:[e.jsx("p",{children:"Imagine searching for a specific book on a shelf."}),e.jsx("p",{children:"You check each book one by one until you find the correct one."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Linear Search"})," works the same way by scanning the array sequentially from start to finish."]})]})]}),e.jsxs("div",{style:_.inputSection,children:[e.jsx("label",{style:_.inputLabel,children:"Search Target:"}),e.jsx("input",{type:"number",value:t.target,onChange:r=>{i(p=>({...p,target:r.target.value})),g()},style:_.inputBox})]}),e.jsxs("div",{style:_.visualizer,children:[e.jsx("div",{style:_.arrayContainer,children:t.array.map((r,p)=>{let d="#F1F5F9",w="#1E293B";return t.foundIndex===p?(d="#22C55E",w="white"):t.status==="not-found"&&t.foundIndex===-1&&t.checkedIndices.includes(p)?(d="#EF4444",w="white"):t.currentIndex===p?(d="#FACC15",w="#1E293B"):t.checkedIndices.includes(p)&&(d="#3B82F6",w="white"),e.jsxs(I.div,{style:{..._.box,backgroundColor:d,color:w},animate:{scale:t.currentIndex===p?1.05:1},transition:{type:"spring",stiffness:300,damping:20},layout:!0,children:[e.jsx("span",{style:_.boxIndex,children:p}),e.jsx("span",{style:_.boxValue,children:r})]},p)})}),e.jsx(ie,{mode:"wait",children:e.jsx(I.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},style:{..._.messageBox,backgroundColor:t.status==="not-found"?"#ef4444":"#1e293b"},children:t.message},t.message)}),e.jsx("div",{style:_.legend,children:[["#FACC15","Current (Yellow)"],["#3B82F6","Checked (Blue)"],["#22C55E","Found (Green)"],["#EF4444","Not Found (Red)"]].map(([r,p])=>e.jsxs("div",{style:_.legendItem,children:[e.jsx("div",{style:{..._.dot,backgroundColor:r}}),e.jsx("span",{children:p})]},p))})]}),e.jsx("div",{style:_.resultPanel,children:e.jsx("div",{style:_.resultText,children:t.status==="found"?e.jsxs("span",{style:{color:"#16a34a"},children:["Result: Target found at index ",t.foundIndex]}):t.status==="not-found"?e.jsx("span",{style:{color:"#dc2626"},children:"Result: Target not found"}):e.jsx("span",{style:{color:"#64748b"},children:"Waiting for search to complete..."})})}),e.jsxs("div",{style:_.controls,children:[e.jsx("button",{onClick:c,disabled:t.status==="running"||t.status==="found"||t.status==="not-found",style:_.btn,onMouseOver:r=>!r.target.disabled&&(r.target.style.background="#4338CA"),onMouseOut:r=>!r.target.disabled&&(r.target.style.background="#4F46E5"),children:"Start Search"}),e.jsx("button",{onClick:S,disabled:t.status==="found"||t.status==="not-found",style:_.btn,onMouseOver:r=>!r.target.disabled&&(r.target.style.background="#4338CA"),onMouseOut:r=>!r.target.disabled&&(r.target.style.background="#4F46E5"),children:"Next Step"}),e.jsx("button",{onClick:g,style:_.btn,onMouseOver:r=>!r.target.disabled&&(r.target.style.background="#4338CA"),onMouseOut:r=>!r.target.disabled&&(r.target.style.background="#4F46E5"),children:"Reset"})]}),e.jsxs("div",{style:_.codeSection,children:[e.jsx("h3",{style:_.subTitle,children:"Linear Search Implementation"}),e.jsx("div",{style:_.langSelector,children:["python","javascript","cpp"].map(r=>e.jsx("button",{onClick:()=>u(r),style:{..._.langBtn,backgroundColor:l===r?"#4f46e5":"#f1f5f9",color:l===r?"#fff":"#64748b",border:l===r?"none":"1px solid #e2e8f0"},children:r==="cpp"?"C++":r.toUpperCase()},r))}),e.jsxs("pre",{style:_.codeBox,children:[l==="python"&&e.jsx("code",{children:`def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i  # Target found
    return -1  # Target not found

# Time:  O(n)
# Space: O(1)`}),l==="javascript"&&e.jsx("code",{children:`function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i; // Target found
        }
    }
    return -1; // Target not found
}

// Time:  O(n)
// Space: O(1)`}),l==="cpp"&&e.jsx("code",{children:`#include <vector>
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
// Space: O(1)`})]})]}),e.jsxs("div",{style:_.quizSection,children:[e.jsx("h3",{style:_.subTitle,children:"Knowledge Check"}),e.jsx("div",{style:_.quizGrid,children:[{q:"What is Linear Search?",a:"A searching algorithm that checks every element in a data structure sequentially until the target is found."},{q:"What is the time complexity of Linear Search?",a:"O(n) in the worst and average cases, since it may have to scan the entire array. O(1) in the best case if the target is the first element."},{q:"When is Linear Search useful?",a:"When the dataset is small, or when the data is unsorted and cannot be sorted beforehand."},{q:"Why is Linear Search inefficient for large datasets?",a:"Because it checks elements one by one, scaling linearly. For an array of 1 million elements, it might take 1 million comparisons, whereas Binary Search would take at most ~20."}].map((r,p)=>e.jsxs("div",{style:_.quizCard,children:[e.jsxs("p",{style:_.question,children:[e.jsxs("strong",{children:["Q",p+1,":"]})," ",r.q]}),e.jsx("p",{style:_.answer,children:r.a})]},p))})]})]})},_={container:{padding:"2rem",backgroundColor:"#fff",borderRadius:"32px",border:"1px solid #e2e8f0",boxShadow:"0 4px 6px -1px rgba(0,0,0,0.05)",fontFamily:"system-ui, sans-serif"},header:{textAlign:"center",marginBottom:"2rem"},title:{fontSize:"2rem",fontWeight:"900",color:"#1e293b",letterSpacing:"-0.025em",marginBottom:"1rem"},desc:{color:"#64748b",fontSize:"1.05rem",lineHeight:"1.7",maxWidth:"750px",margin:"0 auto"},inputSection:{display:"flex",justifyContent:"center",alignItems:"center",gap:"1rem",marginBottom:"2rem"},inputLabel:{fontWeight:"700",color:"#1e293b",fontSize:"1.1rem"},inputBox:{padding:"0.5rem 1rem",fontSize:"1.1rem",borderRadius:"8px",border:"2px solid #cbd5e1",outline:"none",width:"100px",textAlign:"center",fontWeight:"600",color:"#0f172a"},visualizer:{background:"white",borderRadius:"16px",padding:"28px",boxShadow:"0 6px 18px rgba(0,0,0,0.06)",marginTop:"28px",display:"flex",flexDirection:"column",alignItems:"center",gap:"1.5rem",marginBottom:"1.5rem"},arrayContainer:{display:"flex",flexWrap:"wrap",gap:"16px",justifyContent:"center"},box:{width:"64px",height:"64px",borderRadius:"10px",background:"#F1F5F9",fontWeight:"600",fontSize:"18px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",transition:"background-color 0.3s, color 0.3s"},boxIndex:{fontSize:"0.7rem",opacity:.7,marginBottom:"2px"},boxValue:{fontSize:"18px",fontWeight:"600"},messageBox:{color:"#fff",padding:"0.7rem 1.5rem",borderRadius:"12px",fontSize:"1rem",fontWeight:"700",textAlign:"center",minWidth:"300px"},legend:{display:"flex",gap:"1.5rem",flexWrap:"wrap",justifyContent:"center",marginTop:"1rem"},legendItem:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.9rem",color:"#64748b",fontWeight:"600"},dot:{width:"12px",height:"12px",borderRadius:"50%"},resultPanel:{background:"#F8FAFC",borderRadius:"12px",padding:"14px",marginTop:"16px",border:"1px solid #E2E8F0",textAlign:"center",width:"100%",maxWidth:"400px"},resultText:{fontSize:"1.2rem",fontWeight:"bold"},controls:{display:"flex",justifyContent:"center",gap:"1rem",marginBottom:"2rem",flexWrap:"wrap"},btn:{background:"#4F46E5",color:"white",borderRadius:"10px",padding:"10px 18px",fontWeight:"500",border:"none",cursor:"pointer",transition:"background-color 0.2s",fontSize:"1rem"},codeSection:{marginBottom:"3rem"},subTitle:{fontSize:"1.5rem",fontWeight:"900",color:"#1e293b",marginBottom:"1.5rem",textAlign:"center"},langSelector:{display:"flex",justifyContent:"center",gap:"0.75rem",marginBottom:"1.25rem"},langBtn:{padding:"0.6rem 1.2rem",borderRadius:"10px",fontSize:"0.9rem",fontWeight:"700",cursor:"pointer",transition:"all 0.2s"},codeBox:{backgroundColor:"#0f172a",color:"#f8fafc",padding:"1.5rem",borderRadius:"20px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",fontFamily:"monospace",boxShadow:"inset 0 2px 4px rgba(0,0,0,0.1)"},quizSection:{marginTop:"2rem"},quizGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"1.5rem"},quizCard:{backgroundColor:"#f8fafc",padding:"1.5rem",borderRadius:"20px",border:"1px solid #f1f5f9"},question:{fontWeight:"700",color:"#1e293b",marginBottom:"0.75rem",fontSize:"1rem"},answer:{color:"#10b981",fontWeight:"600",lineHeight:"1.5",fontSize:"0.95rem"}},Rt=t=>new Promise(i=>setTimeout(i,t)),It=()=>{const[t,i]=o.useState({array:[2,4,7,12,15,19,23,29],target:"15",left:0,right:7,mid:-1,foundIndex:-1,status:"idle",phase:"idle",message:"Ready to search."}),[l,u]=o.useState("python"),n=o.useRef(!1);o.useEffect(()=>{let r=!0,p;const d=async()=>{t.status!=="running"||!n.current||!r||(await Rt(1500),!(!n.current||!r)&&(i(w=>{if(w.status!=="running")return w;const F=a(w);return F.status!=="running"&&(n.current=!1),F}),n.current&&(p=setTimeout(d,100))))};return t.status==="running"&&n.current&&d(),()=>{r=!1,clearTimeout(p)}},[t.status]);const a=r=>{const p=parseInt(r.target);if(r.status==="idle")return{...r,status:"running",phase:"calc-mid",left:0,right:r.array.length-1,mid:Math.floor((0+r.array.length-1)/2),message:"Opening the dictionary in the middle."};if(r.status==="running"){if(r.left>r.right)return{...r,status:"not-found",phase:"not-found",mid:-1,message:"Target not found."};if(r.phase==="calc-mid"){const d=Math.floor((r.left+r.right)/2);return{...r,mid:d,phase:"compare",message:`Middle element is ${r.array[d]} at index ${d}.`}}else if(r.phase==="compare"){const d=r.array[r.mid];return d===p?{...r,status:"found",phase:"found",foundIndex:r.mid,message:"Target found."}:d<p?{...r,phase:"update-bounds",message:"Target is larger, searching right half."}:{...r,phase:"update-bounds",message:"Target is smaller, searching left half."}}else if(r.phase==="update-bounds")if(r.array[r.mid]<p){const w=r.mid+1;return w>r.right?{...r,left:w,status:"not-found",phase:"not-found",mid:-1,message:"Target not found."}:{...r,left:w,phase:"calc-mid",message:"New middle selected."}}else{const w=r.mid-1;return r.left>w?{...r,right:w,status:"not-found",phase:"not-found",mid:-1,message:"Target not found."}:{...r,right:w,phase:"calc-mid",message:"New middle selected."}}}return r},c=()=>{if(!t.target||isNaN(parseInt(t.target))){i(r=>({...r,message:"Please enter a valid number to search."}));return}g(),n.current=!0,i(r=>a({...r,status:"idle"}))},S=()=>{if(!t.target||isNaN(parseInt(t.target))){i(r=>({...r,message:"Please enter a valid number to search."}));return}n.current=!1,i(r=>a(r))},g=()=>{n.current=!1,i(r=>({...r,left:0,right:r.array.length-1,mid:-1,foundIndex:-1,status:"idle",phase:"idle",message:"Ready to search."}))};return e.jsxs("div",{style:H.container,children:[e.jsxs("div",{style:H.header,children:[e.jsx("h2",{style:H.title,children:"Binary Search — Finding a Word in a Dictionary 📖"}),e.jsxs("div",{style:H.desc,children:[e.jsx("p",{children:"Imagine searching for a word in a dictionary. Instead of checking every page one by one, you open the dictionary in the middle."}),e.jsx("p",{children:"If the word comes before the middle word alphabetically, you search the left half. If it comes after, you search the right half."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Binary Search"})," works the same way: each step eliminates half the remaining elements. The array ",e.jsx("strong",{children:"must be sorted"})," for this to work."]})]})]}),e.jsxs("div",{style:H.inputSection,children:[e.jsx("label",{style:H.inputLabel,children:"Search Target:"}),e.jsx("input",{type:"number",value:t.target,onChange:r=>{i(p=>({...p,target:r.target.value})),g()},style:H.inputBox})]}),e.jsxs("div",{style:H.visualizer,children:[e.jsx("div",{style:{position:"relative",paddingBottom:"30px"},children:e.jsx("div",{style:H.arrayContainer,children:t.array.map((r,p)=>{let d="#F1F5F9",w="#1E293B";const F=t.status!=="idle"&&(p<t.left||p>t.right);let y=F?.3:1;return t.foundIndex===p?(d="#22C55E",w="white",y=1):t.status==="not-found"&&t.foundIndex===-1&&!F?(d="#EF4444",w="white"):t.mid===p&&(d="#FACC15",w="#1E293B"),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsxs(I.div,{style:{...H.box,backgroundColor:d,color:w,opacity:y},animate:{scale:t.mid===p?1.05:1,opacity:y},transition:{type:"spring",stiffness:300,damping:20},layout:!0,children:[e.jsx("span",{style:H.boxIndex,children:p}),e.jsx("span",{style:H.boxValue,children:r})]}),e.jsxs("div",{style:{height:"20px",marginTop:"8px",fontSize:"0.85rem",fontWeight:"bold",color:"#64748b",display:"flex",gap:"4px"},children:[t.status!=="idle"&&t.status!=="not-found"&&t.left===p&&e.jsx("span",{style:{color:"#ec4899"},children:"L"}),t.status!=="idle"&&t.status!=="not-found"&&t.right===p&&e.jsx("span",{style:{color:"#3b82f6"},children:"R"}),t.status!=="idle"&&t.status!=="not-found"&&t.mid===p&&t.foundIndex===-1&&e.jsx("span",{style:{color:"#eab308"},children:"M"})]})]},p)})})}),e.jsx(ie,{mode:"wait",children:e.jsx(I.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},style:{...H.messageBox,backgroundColor:t.status==="not-found"?"#ef4444":"#1e293b"},children:t.message},t.message)}),e.jsxs("div",{style:H.legend,children:[[["#FACC15","Middle (Yellow)"],["#22C55E","Found (Green)"],["#EF4444","Not Found (Red)"],["#cbd5e1","Eliminated (Faded)"]].map(([r,p])=>e.jsxs("div",{style:H.legendItem,children:[e.jsx("div",{style:{...H.dot,backgroundColor:r}}),e.jsx("span",{children:p})]},p)),e.jsxs("div",{style:H.legendItem,children:[e.jsx("div",{style:{fontWeight:"bold",color:"#ec4899",fontSize:"0.9rem"},children:"L"}),e.jsx("span",{children:"Left Bound"})]}),e.jsxs("div",{style:H.legendItem,children:[e.jsx("div",{style:{fontWeight:"bold",color:"#3b82f6",fontSize:"0.9rem"},children:"R"}),e.jsx("span",{children:"Right Bound"})]})]})]}),e.jsx("div",{style:H.resultPanel,children:e.jsx("div",{style:H.resultText,children:t.status==="found"?e.jsxs("span",{style:{color:"#16a34a"},children:["Result: Target found at index ",t.foundIndex]}):t.status==="not-found"?e.jsx("span",{style:{color:"#dc2626"},children:"Result: Target not found"}):e.jsx("span",{style:{color:"#64748b"},children:"Waiting for search to complete..."})})}),e.jsxs("div",{style:H.controls,children:[e.jsx("button",{onClick:c,disabled:t.status==="running"||t.status==="found"||t.status==="not-found",style:H.btn,onMouseOver:r=>!r.target.disabled&&(r.target.style.background="#4338CA"),onMouseOut:r=>!r.target.disabled&&(r.target.style.background="#4F46E5"),children:"Start Search"}),e.jsx("button",{onClick:S,disabled:t.status==="found"||t.status==="not-found",style:H.btn,onMouseOver:r=>!r.target.disabled&&(r.target.style.background="#4338CA"),onMouseOut:r=>!r.target.disabled&&(r.target.style.background="#4F46E5"),children:"Next Step"}),e.jsx("button",{onClick:g,style:H.btn,onMouseOver:r=>!r.target.disabled&&(r.target.style.background="#4338CA"),onMouseOut:r=>!r.target.disabled&&(r.target.style.background="#4F46E5"),children:"Reset"})]}),e.jsxs("div",{style:H.codeSection,children:[e.jsx("h3",{style:H.subTitle,children:"Binary Search Implementation"}),e.jsx("div",{style:H.langSelector,children:["python","javascript","cpp"].map(r=>e.jsx("button",{onClick:()=>u(r),style:{...H.langBtn,backgroundColor:l===r?"#4f46e5":"#f1f5f9",color:l===r?"#fff":"#64748b",border:l===r?"none":"1px solid #e2e8f0"},children:r==="cpp"?"C++":r.toUpperCase()},r))}),e.jsxs("pre",{style:H.codeBox,children:[l==="python"&&e.jsx("code",{children:`def binary_search(arr, target):
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
# Space: O(1)`}),l==="javascript"&&e.jsx("code",{children:`function binarySearch(arr, target) {
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
// Space: O(1)`}),l==="cpp"&&e.jsx("code",{children:`#include <vector>
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
// Space: O(1)`})]})]}),e.jsxs("div",{style:H.quizSection,children:[e.jsx("h3",{style:H.subTitle,children:"Knowledge Check"}),e.jsx("div",{style:H.quizGrid,children:[{q:"What is a core requirement for Binary Search?",a:"The dataset must be sorted beforehand so the algorithm can reliably eliminate halves based on greater/lesser comparisons."},{q:"What is the time complexity of Binary Search?",a:"O(log n). Since it halves the search space every step, searching 1 million elements takes at most ~20 steps."},{q:"How does it compare to Linear Search?",a:"Linear Search is O(n) and works on unsorted data. Binary Search is significantly faster (O(log n)) but strictly requires sorted data."},{q:"Why is `mid = left + (right - left) / 2` preferred in typed languages?",a:"To prevent integer overflow if `left` and `right` are very large numbers."}].map((r,p)=>e.jsxs("div",{style:H.quizCard,children:[e.jsxs("p",{style:H.question,children:[e.jsxs("strong",{children:["Q",p+1,":"]})," ",r.q]}),e.jsx("p",{style:H.answer,children:r.a})]},p))})]})]})},H={container:{padding:"2rem",backgroundColor:"#fff",borderRadius:"32px",border:"1px solid #e2e8f0",boxShadow:"0 4px 6px -1px rgba(0,0,0,0.05)",fontFamily:"system-ui, sans-serif"},header:{textAlign:"center",marginBottom:"2rem"},title:{fontSize:"2rem",fontWeight:"900",color:"#1e293b",letterSpacing:"-0.025em",marginBottom:"1rem"},desc:{color:"#64748b",fontSize:"1.05rem",lineHeight:"1.7",maxWidth:"750px",margin:"0 auto"},inputSection:{display:"flex",justifyContent:"center",alignItems:"center",gap:"1rem",marginBottom:"2rem"},inputLabel:{fontWeight:"700",color:"#1e293b",fontSize:"1.1rem"},inputBox:{padding:"0.5rem 1rem",fontSize:"1.1rem",borderRadius:"8px",border:"2px solid #cbd5e1",outline:"none",width:"100px",textAlign:"center",fontWeight:"600",color:"#0f172a"},visualizer:{background:"white",borderRadius:"16px",padding:"28px",boxShadow:"0 6px 18px rgba(0,0,0,0.06)",marginTop:"28px",display:"flex",flexDirection:"column",alignItems:"center",gap:"1.5rem",marginBottom:"1.5rem"},arrayContainer:{display:"flex",flexWrap:"wrap",gap:"16px",justifyContent:"center"},box:{width:"64px",height:"64px",borderRadius:"10px",background:"#F1F5F9",fontWeight:"600",fontSize:"18px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",transition:"background-color 0.3s, color 0.3s, opacity 0.3s"},boxIndex:{fontSize:"0.7rem",opacity:.7,marginBottom:"2px"},boxValue:{fontSize:"18px",fontWeight:"600"},messageBox:{color:"#fff",padding:"0.7rem 1.5rem",borderRadius:"12px",fontSize:"1rem",fontWeight:"700",textAlign:"center",minWidth:"300px"},legend:{display:"flex",gap:"1.5rem",flexWrap:"wrap",justifyContent:"center",marginTop:"1rem"},legendItem:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.9rem",color:"#64748b",fontWeight:"600"},dot:{width:"12px",height:"12px",borderRadius:"50%"},resultPanel:{background:"#F8FAFC",borderRadius:"12px",padding:"14px",marginTop:"16px",border:"1px solid #E2E8F0",textAlign:"center",width:"100%",maxWidth:"400px"},resultText:{fontSize:"1.2rem",fontWeight:"bold"},controls:{display:"flex",justifyContent:"center",gap:"1rem",marginBottom:"2rem",flexWrap:"wrap"},btn:{background:"#4F46E5",color:"white",borderRadius:"10px",padding:"10px 18px",fontWeight:"500",border:"none",cursor:"pointer",transition:"background-color 0.2s",fontSize:"1rem"},codeSection:{marginBottom:"3rem"},subTitle:{fontSize:"1.5rem",fontWeight:"900",color:"#1e293b",marginBottom:"1.5rem",textAlign:"center"},langSelector:{display:"flex",justifyContent:"center",gap:"0.75rem",marginBottom:"1.25rem"},langBtn:{padding:"0.6rem 1.2rem",borderRadius:"10px",fontSize:"0.9rem",fontWeight:"700",cursor:"pointer",transition:"all 0.2s"},codeBox:{backgroundColor:"#0f172a",color:"#f8fafc",padding:"1.5rem",borderRadius:"20px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",fontFamily:"monospace",boxShadow:"inset 0 2px 4px rgba(0,0,0,0.1)"},quizSection:{marginTop:"2rem"},quizGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"1.5rem"},quizCard:{backgroundColor:"#f8fafc",padding:"1.5rem",borderRadius:"20px",border:"1px solid #f1f5f9"},question:{fontWeight:"700",color:"#1e293b",marginBottom:"0.75rem",fontSize:"1rem"},answer:{color:"#10b981",fontWeight:"600",lineHeight:"1.5",fontSize:"0.95rem"}},Tt=t=>new Promise(i=>setTimeout(i,t)),$t=()=>{const[t,i]=o.useState({array:[2,4,6,8,10,12],target:"14",left:0,right:5,status:"idle",phase:"idle",message:"Ready to search."}),[l,u]=o.useState("python"),n=o.useRef(!1);o.useEffect(()=>{let r=!0,p;const d=async()=>{t.status!=="running"||!n.current||!r||(await Tt(1500),!(!n.current||!r)&&(i(w=>{if(w.status!=="running")return w;const F=a(w);return F.status!=="running"&&(n.current=!1),F}),n.current&&(p=setTimeout(d,100))))};return t.status==="running"&&n.current&&d(),()=>{r=!1,clearTimeout(p)}},[t.status]);const a=r=>{const p=parseInt(r.target);if(r.status==="idle")return{...r,status:"running",phase:"compare",left:0,right:r.array.length-1,message:`Left pointer at index 0. Right pointer at index ${r.array.length-1}.`};if(r.status==="running"){if(r.left>=r.right)return{...r,status:"not-found",phase:"not-found",message:"Pointers crossed without finding a pair. Target not found."};if(r.phase==="compare"){const d=r.array[r.left]+r.array[r.right];return d===p?{...r,status:"found",phase:"found",message:`Sum is ${d}. Target found!`}:d<p?{...r,phase:"move-left",message:`Sum is ${d}. Too small, we need a larger value. Moving left pointer inward.`}:{...r,phase:"move-right",message:`Sum is ${d}. Too large, we need a smaller value. Moving right pointer inward.`}}else if(r.phase==="move-left"){const d=r.left+1;return d>=r.right?{...r,left:d,status:"not-found",phase:"not-found",message:"Pointers met. Target not found."}:{...r,left:d,phase:"compare",message:`Left pointer at index ${d}. Right pointer at index ${r.right}.`}}else if(r.phase==="move-right"){const d=r.right-1;return r.left>=d?{...r,right:d,status:"not-found",phase:"not-found",message:"Pointers met. Target not found."}:{...r,right:d,phase:"compare",message:`Left pointer at index ${r.left}. Right pointer at index ${d}.`}}}return r},c=()=>{if(!t.target||isNaN(parseInt(t.target))){i(r=>({...r,message:"Please enter a valid target sum."}));return}g(),n.current=!0,i(r=>a({...r,status:"idle"}))},S=()=>{if(!t.target||isNaN(parseInt(t.target))){i(r=>({...r,message:"Please enter a valid target sum."}));return}n.current=!1,i(r=>a(r))},g=()=>{n.current=!1,i(r=>({...r,left:0,right:r.array.length-1,status:"idle",phase:"idle",message:"Ready to search."}))};return e.jsxs("div",{style:N.container,children:[e.jsxs("div",{style:N.header,children:[e.jsx("h2",{style:N.title,children:"Two Pointers — Finding a Match in a Hallway 🚶"}),e.jsxs("div",{style:N.desc,children:[e.jsx("p",{children:"Imagine two people starting at opposite ends of a hallway."}),e.jsx("p",{children:"One person walks from the left, the other from the right. They move step by step toward each other until they meet or find what they are looking for."}),e.jsxs("p",{children:["The ",e.jsx("strong",{children:"Two Pointer"})," technique is highly efficient for searching pairs in a sorted array."]})]})]}),e.jsxs("div",{style:N.inputSection,children:[e.jsx("label",{style:N.inputLabel,children:"Target Pair Sum:"}),e.jsx("input",{type:"number",value:t.target,onChange:r=>{i(p=>({...p,target:r.target.value})),g()},style:N.inputBox})]}),e.jsxs("div",{style:N.visualizer,children:[e.jsx("div",{style:{position:"relative",paddingBottom:"30px"},children:e.jsx("div",{style:N.arrayContainer,children:t.array.map((r,p)=>{let d="#F1F5F9",w="#1E293B";const F=t.status!=="idle"&&(p<t.left||p>t.right);let y=F?.4:1;return t.status==="found"&&(p===t.left||p===t.right)?(d="#22C55E",w="white",y=1):t.status==="not-found"&&!F?(d="#EF4444",w="white"):t.status!=="idle"&&t.status!=="not-found"&&p===t.left?(d="#FACC15",w="#1E293B"):t.status!=="idle"&&t.status!=="not-found"&&p===t.right&&(d="#3B82F6",w="white"),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsxs(I.div,{style:{...N.box,backgroundColor:d,color:w,opacity:y},animate:{scale:t.left===p||t.right===p?1.05:1,opacity:y},transition:{type:"spring",stiffness:300,damping:20},layout:!0,children:[e.jsx("span",{style:N.boxIndex,children:p}),e.jsx("span",{style:N.boxValue,children:r})]}),e.jsxs("div",{style:{height:"20px",marginTop:"8px",fontSize:"0.9rem",fontWeight:"bold",display:"flex",gap:"4px"},children:[t.status!=="idle"&&t.left===p&&e.jsx("span",{style:{color:"#eab308"},children:"L →"}),t.status!=="idle"&&t.right===p&&e.jsx("span",{style:{color:"#3b82f6"},children:"← R"})]})]},p)})})}),t.status!=="idle"&&t.left<t.array.length&&t.right>=0&&t.left<t.right&&e.jsxs("div",{style:N.equationBox,children:[e.jsx("span",{style:{color:"#854d0e",fontWeight:"bold"},children:t.array[t.left]})," +",e.jsx("span",{style:{color:"#1e3a8a",fontWeight:"bold"},children:t.array[t.right]})," =",e.jsx("span",{style:{fontWeight:"bold"},children:t.array[t.left]+t.array[t.right]})]}),e.jsx(ie,{mode:"wait",children:e.jsx(I.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},style:{...N.messageBox,backgroundColor:t.status==="not-found"?"#ef4444":"#1e293b"},children:t.message},t.message)}),e.jsx("div",{style:N.legend,children:[["#FACC15","Left Pointer"],["#3B82F6","Right Pointer"],["#22C55E","Match Found"],["#cbd5e1","Ignored Elements"]].map(([r,p])=>e.jsxs("div",{style:N.legendItem,children:[e.jsx("div",{style:{...N.dot,backgroundColor:r}}),e.jsx("span",{children:p})]},p))})]}),e.jsx("div",{style:N.resultPanel,children:e.jsx("div",{style:N.resultText,children:t.status==="found"?e.jsxs("span",{style:{color:"#16a34a"},children:["Result: Pair found at indices ",t.left," and ",t.right]}):t.status==="not-found"?e.jsx("span",{style:{color:"#dc2626"},children:"Result: No pair found for given target sum"}):e.jsx("span",{style:{color:"#64748b"},children:"Waiting for search to complete..."})})}),e.jsxs("div",{style:N.controls,children:[e.jsx("button",{onClick:c,disabled:t.status==="running"||t.status==="found"||t.status==="not-found",style:N.btn,onMouseOver:r=>!r.target.disabled&&(r.target.style.background="#4338CA"),onMouseOut:r=>!r.target.disabled&&(r.target.style.background="#4F46E5"),children:"Start Search"}),e.jsx("button",{onClick:S,disabled:t.status==="found"||t.status==="not-found",style:N.btn,onMouseOver:r=>!r.target.disabled&&(r.target.style.background="#4338CA"),onMouseOut:r=>!r.target.disabled&&(r.target.style.background="#4F46E5"),children:"Next Step"}),e.jsx("button",{onClick:g,style:N.btn,onMouseOver:r=>!r.target.disabled&&(r.target.style.background="#4338CA"),onMouseOut:r=>!r.target.disabled&&(r.target.style.background="#4F46E5"),children:"Reset"})]}),e.jsxs("div",{style:N.codeSection,children:[e.jsx("h3",{style:N.subTitle,children:"Two Pointers Implementation (Two Sum in Sorted Array)"}),e.jsx("div",{style:N.langSelector,children:["python","javascript","cpp"].map(r=>e.jsx("button",{onClick:()=>u(r),style:{...N.langBtn,backgroundColor:l===r?"#4f46e5":"#f1f5f9",color:l===r?"#fff":"#64748b",border:l===r?"none":"1px solid #e2e8f0"},children:r==="cpp"?"C++":r.toUpperCase()},r))}),e.jsxs("pre",{style:N.codeBox,children:[l==="python"&&e.jsx("code",{children:`def two_sum(arr, target):
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
# Space: O(1)`}),l==="javascript"&&e.jsx("code",{children:`function twoSum(arr, target) {
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
// Space: O(1)`}),l==="cpp"&&e.jsx("code",{children:`#include <vector>
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
// Space: O(1)`})]})]}),e.jsxs("div",{style:N.quizSection,children:[e.jsx("h3",{style:N.subTitle,children:"Knowledge Check"}),e.jsx("div",{style:N.quizGrid,children:[{q:"What is the Two Pointer technique?",a:"An algorithm strategy that uses two different indices to search through an array simultaneously, often starting from opposite ends."},{q:"What is a common use case?",a:"Finding a pair of numbers that add up to a specific target sum in a sorted array."},{q:"Why must the array be sorted for the Two Sum problem using this technique?",a:"Because we decide whether to increment the left pointer or decrement the right pointer based on whether the sum is too small or too large."},{q:"What is the time complexity?",a:"O(n) linear time, because each element is visited at most once as the pointers converge."}].map((r,p)=>e.jsxs("div",{style:N.quizCard,children:[e.jsxs("p",{style:N.question,children:[e.jsxs("strong",{children:["Q",p+1,":"]})," ",r.q]}),e.jsx("p",{style:N.answer,children:r.a})]},p))})]})]})},N={container:{padding:"2rem",backgroundColor:"#fff",borderRadius:"32px",border:"1px solid #e2e8f0",boxShadow:"0 4px 6px -1px rgba(0,0,0,0.05)",fontFamily:"system-ui, sans-serif"},header:{textAlign:"center",marginBottom:"2rem"},title:{fontSize:"2rem",fontWeight:"900",color:"#1e293b",letterSpacing:"-0.025em",marginBottom:"1rem"},desc:{color:"#64748b",fontSize:"1.05rem",lineHeight:"1.7",maxWidth:"750px",margin:"0 auto"},inputSection:{display:"flex",justifyContent:"center",alignItems:"center",gap:"1rem",marginBottom:"2rem"},inputLabel:{fontWeight:"700",color:"#1e293b",fontSize:"1.1rem"},inputBox:{padding:"0.5rem 1rem",fontSize:"1.1rem",borderRadius:"8px",border:"2px solid #cbd5e1",outline:"none",width:"100px",textAlign:"center",fontWeight:"600",color:"#0f172a"},visualizer:{background:"white",borderRadius:"16px",padding:"28px",boxShadow:"0 6px 18px rgba(0,0,0,0.06)",marginTop:"28px",display:"flex",flexDirection:"column",alignItems:"center",gap:"1.5rem",marginBottom:"1.5rem"},equationBox:{fontSize:"1.4rem",padding:"0.5rem 1rem",backgroundColor:"#fff",borderRadius:"8px",border:"1px solid #e2e8f0",boxShadow:"0 2px 4px rgba(0,0,0,0.05)",marginBottom:"0.5rem",display:"flex",gap:"10px"},arrayContainer:{display:"flex",flexWrap:"wrap",gap:"16px",justifyContent:"center"},box:{width:"64px",height:"64px",borderRadius:"10px",background:"#F1F5F9",fontWeight:"600",fontSize:"18px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",transition:"background-color 0.3s, color 0.3s, opacity 0.3s"},boxIndex:{fontSize:"0.7rem",opacity:.7,marginBottom:"2px"},boxValue:{fontSize:"18px",fontWeight:"600"},messageBox:{color:"#fff",padding:"0.7rem 1.5rem",borderRadius:"12px",fontSize:"1rem",fontWeight:"700",textAlign:"center",minWidth:"300px"},legend:{display:"flex",gap:"1.5rem",flexWrap:"wrap",justifyContent:"center",marginTop:"1rem"},legendItem:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.9rem",color:"#64748b",fontWeight:"600"},dot:{width:"12px",height:"12px",borderRadius:"50%"},resultPanel:{background:"#F8FAFC",borderRadius:"12px",padding:"14px",marginTop:"16px",border:"1px solid #E2E8F0",textAlign:"center",width:"100%",maxWidth:"400px"},resultText:{fontSize:"1.2rem",fontWeight:"bold"},controls:{display:"flex",justifyContent:"center",gap:"1rem",marginBottom:"2rem",flexWrap:"wrap"},btn:{background:"#4F46E5",color:"white",borderRadius:"10px",padding:"10px 18px",fontWeight:"500",border:"none",cursor:"pointer",transition:"background-color 0.2s",fontSize:"1rem"},codeSection:{marginBottom:"3rem"},subTitle:{fontSize:"1.5rem",fontWeight:"900",color:"#1e293b",marginBottom:"1.5rem",textAlign:"center"},langSelector:{display:"flex",justifyContent:"center",gap:"0.75rem",marginBottom:"1.25rem"},langBtn:{padding:"0.6rem 1.2rem",borderRadius:"10px",fontSize:"0.9rem",fontWeight:"700",cursor:"pointer",transition:"all 0.2s"},codeBox:{backgroundColor:"#0f172a",color:"#f8fafc",padding:"1.5rem",borderRadius:"20px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",fontFamily:"monospace",boxShadow:"inset 0 2px 4px rgba(0,0,0,0.1)"},quizSection:{marginTop:"2rem"},quizGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"1.5rem"},quizCard:{backgroundColor:"#f8fafc",padding:"1.5rem",borderRadius:"20px",border:"1px solid #f1f5f9"},question:{fontWeight:"700",color:"#1e293b",marginBottom:"0.75rem",fontSize:"1rem"},answer:{color:"#10b981",fontWeight:"600",lineHeight:"1.5",fontSize:"0.95rem"}},qt=t=>new Promise(i=>setTimeout(i,t)),Mt=()=>{const[t,i]=o.useState({array:[2,1,5,1,3,2],k:3,windowStart:0,windowEnd:2,currentSum:0,maxSum:0,status:"idle",phase:"idle",message:"Ready to search."}),[l,u]=o.useState("python"),n=o.useRef(!1);o.useEffect(()=>{let r=!0,p;const d=async()=>{t.status!=="running"||!n.current||!r||(await qt(1500),!(!n.current||!r)&&(i(w=>{if(w.status!=="running")return w;const F=a(w);return F.status!=="running"&&(n.current=!1),F}),n.current&&(p=setTimeout(d,100))))};return t.status==="running"&&n.current&&d(),()=>{r=!1,clearTimeout(p)}},[t.status]);const a=r=>{if(r.status==="idle"){const p=r.array.slice(0,r.k).reduce((d,w)=>d+w,0);return{...r,status:"running",phase:"init-window",windowStart:0,windowEnd:r.k-1,currentSum:p,maxSum:p,message:`Window covering indexes 0–${r.k-1}. Current sum is ${p}. Max sum is ${p}.`}}if(r.status==="running"){if(r.windowEnd>=r.array.length-1)return{...r,status:"completed",phase:"completed",message:`Reached the end of the array. The maximum sum of any window of size ${r.k} is ${r.maxSum}.`};if(r.phase==="init-window"||r.phase==="slide-window"){const p=r.windowStart+1,d=r.windowEnd+1,w=r.array[r.windowStart],F=r.array[d],y=r.currentSum-w+F,h=Math.max(r.maxSum,y);return{...r,phase:"slide-window",windowStart:p,windowEnd:d,currentSum:y,maxSum:h,message:`Sliding window forward. Removing index ${r.windowStart} (Value: ${w}), adding index ${d} (Value: ${F}). Updating window sum to ${y}.`}}}return r},c=()=>{if(t.k>t.array.length||t.k<=0){i(r=>({...r,message:"Invalid window size."}));return}g(),n.current=!0,i(r=>a({...r,status:"idle"}))},S=()=>{if(t.k>t.array.length||t.k<=0){i(r=>({...r,message:"Invalid window size."}));return}n.current=!1,i(r=>a(r))},g=()=>{n.current=!1,i(r=>({...r,windowStart:0,windowEnd:r.k-1,currentSum:0,maxSum:0,status:"idle",phase:"idle",message:"Ready to search."}))};return e.jsxs("div",{style:P.container,children:[e.jsxs("div",{style:P.header,children:[e.jsx("h2",{style:P.title,children:"Sliding Window — The Moving Camera Frame 📷"}),e.jsxs("div",{style:P.desc,children:[e.jsx("p",{children:"Imagine a camera frame moving across a row of objects."}),e.jsx("p",{children:"The camera only captures a few objects at a time. As the frame slides forward, new objects enter the frame and old ones leave."}),e.jsxs("p",{children:["The ",e.jsx("strong",{children:"Sliding Window"})," technique avoids recalculating overlapping parts of the array by reusing previous work."]})]})]}),e.jsxs("div",{style:P.inputSection,children:[e.jsx("label",{style:P.inputLabel,children:"Window Size (k):"}),e.jsx("input",{type:"number",value:t.k,onChange:r=>{i(p=>({...p,k:parseInt(r.target.value)||0})),g()},style:P.inputBox,min:"1",max:t.array.length})]}),e.jsxs("div",{style:P.visualizer,children:[e.jsx("div",{style:{position:"relative",paddingBottom:"30px"},children:e.jsx("div",{style:P.arrayContainer,children:t.array.map((r,p)=>{let d="#F1F5F9",w="#1E293B";const F=t.status!=="idle"&&p>=t.windowStart&&p<=t.windowEnd,y=t.status!=="idle"&&p===t.windowStart-1,h=t.status!=="idle"&&p===t.windowEnd;return t.status==="completed"&&F?(d="#22C55E",w="white"):F&&t.phase!=="calc-sum"?h&&t.phase==="slide-window"?(d="#3B82F6",w="white"):(d="#FACC15",w="#1E293B"):y&&t.phase==="slide-window"&&(d="#EF4444",w="white"),e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center"},children:[e.jsxs(I.div,{style:{...P.box,backgroundColor:d,color:w},animate:{scale:F?1.05:1},transition:{type:"spring",stiffness:300,damping:20},layout:!0,children:[e.jsx("span",{style:P.boxIndex,children:p}),e.jsx("span",{style:P.boxValue,children:r})]}),e.jsxs("div",{style:{height:"20px",marginTop:"8px",fontSize:"0.9rem",fontWeight:"bold",color:"#1E293B",display:"flex",gap:"4px"},children:[t.status!=="idle"&&t.windowStart===p&&e.jsx("span",{children:"["}),t.status!=="idle"&&t.windowEnd===p&&e.jsx("span",{children:"]"})]})]},p)})})}),t.status!=="idle"&&e.jsxs("div",{style:{display:"flex",gap:"2rem",marginBottom:"0.5rem"},children:[e.jsxs("div",{style:P.stateBox,children:[e.jsx("div",{style:{fontSize:"0.8rem",color:"#64748b",fontWeight:"bold"},children:"Current Window Sum"}),e.jsx("div",{style:{fontSize:"1.4rem",color:"#eab308",fontWeight:"900"},children:t.currentSum})]}),e.jsxs("div",{style:P.stateBox,children:[e.jsx("div",{style:{fontSize:"0.8rem",color:"#64748b",fontWeight:"bold"},children:"Maximum Sum Found"}),e.jsx("div",{style:{fontSize:"1.4rem",color:"#22c55e",fontWeight:"900"},children:t.maxSum})]})]}),e.jsx(ie,{mode:"wait",children:e.jsx(I.div,{initial:{opacity:0,y:10},animate:{opacity:1,y:0},exit:{opacity:0,y:-10},style:{...P.messageBox,backgroundColor:t.status==="completed"?"#166534":"#1e293b"},children:t.message},t.message)}),e.jsx("div",{style:P.legend,children:[["#FACC15","In Window"],["#3B82F6","Newly Added"],["#EF4444","Just Removed"]].map(([r,p])=>e.jsxs("div",{style:P.legendItem,children:[e.jsx("div",{style:{...P.dot,backgroundColor:r}}),e.jsx("span",{children:p})]},p))})]}),e.jsx("div",{style:P.resultPanel,children:e.jsx("div",{style:P.resultText,children:t.status==="completed"?e.jsxs("span",{style:{color:"#16a34a"},children:["Result: Max Sum is ",t.maxSum]}):e.jsx("span",{style:{color:"#64748b"},children:"Waiting for sliding window to complete..."})})}),e.jsxs("div",{style:P.controls,children:[e.jsx("button",{onClick:c,disabled:t.status==="running"||t.status==="completed",style:P.btn,onMouseOver:r=>!r.target.disabled&&(r.target.style.background="#4338CA"),onMouseOut:r=>!r.target.disabled&&(r.target.style.background="#4F46E5"),children:"Start Sliding"}),e.jsx("button",{onClick:S,disabled:t.status==="completed",style:P.btn,onMouseOver:r=>!r.target.disabled&&(r.target.style.background="#4338CA"),onMouseOut:r=>!r.target.disabled&&(r.target.style.background="#4F46E5"),children:"Slide Next"}),e.jsx("button",{onClick:g,style:P.btn,onMouseOver:r=>!r.target.disabled&&(r.target.style.background="#4338CA"),onMouseOut:r=>!r.target.disabled&&(r.target.style.background="#4F46E5"),children:"Reset"})]}),e.jsxs("div",{style:P.codeSection,children:[e.jsx("h3",{style:P.subTitle,children:"Sliding Window Implementation (Max Sum Array)"}),e.jsx("div",{style:P.langSelector,children:["python","javascript","cpp"].map(r=>e.jsx("button",{onClick:()=>u(r),style:{...P.langBtn,backgroundColor:l===r?"#4f46e5":"#f1f5f9",color:l===r?"#fff":"#64748b",border:l===r?"none":"1px solid #e2e8f0"},children:r==="cpp"?"C++":r.toUpperCase()},r))}),e.jsxs("pre",{style:P.codeBox,children:[l==="python"&&e.jsx("code",{children:`def max_sub_array_of_size_k(k, arr):
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
# Space: O(1)`}),l==="javascript"&&e.jsx("code",{children:`function maxSubArrayOfSizeK(k, arr) {
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
// Space: O(1)`}),l==="cpp"&&e.jsx("code",{children:`#include <vector>
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
// Space: O(1)`})]})]}),e.jsxs("div",{style:P.quizSection,children:[e.jsx("h3",{style:P.subTitle,children:"Knowledge Check"}),e.jsx("div",{style:P.quizGrid,children:[{q:"What problems does Sliding Window solve?",a:"Problems asking to find or calculate something among all contiguous subarrays (or sublists) of a given size."},{q:"Why is it more efficient than brute force?",a:"Because instead of recalculating the sum (or product, etc.) of the entire sub-array from scratch, we only calculate the difference between the old and new edges."},{q:"What is the standard time complexity jump?",a:"It often reduces O(n²) nested loop problems down to O(n) single pass loops."},{q:"What happens to the window edges?",a:"When the leading edge expands to encompass the target size `k`, the trailing edge begins sliding forward by subtracting its element from the total tracking score."}].map((r,p)=>e.jsxs("div",{style:P.quizCard,children:[e.jsxs("p",{style:P.question,children:[e.jsxs("strong",{children:["Q",p+1,":"]})," ",r.q]}),e.jsx("p",{style:P.answer,children:r.a})]},p))})]})]})},P={container:{padding:"2rem",backgroundColor:"#fff",borderRadius:"32px",border:"1px solid #e2e8f0",boxShadow:"0 4px 6px -1px rgba(0,0,0,0.05)",fontFamily:"system-ui, sans-serif"},header:{textAlign:"center",marginBottom:"2rem"},title:{fontSize:"2rem",fontWeight:"900",color:"#1e293b",letterSpacing:"-0.025em",marginBottom:"1rem"},desc:{color:"#64748b",fontSize:"1.05rem",lineHeight:"1.7",maxWidth:"750px",margin:"0 auto"},inputSection:{display:"flex",justifyContent:"center",alignItems:"center",gap:"1rem",marginBottom:"2rem"},inputLabel:{fontWeight:"700",color:"#1e293b",fontSize:"1.1rem"},inputBox:{padding:"0.5rem 1rem",fontSize:"1.1rem",borderRadius:"8px",border:"2px solid #cbd5e1",outline:"none",width:"100px",textAlign:"center",fontWeight:"600",color:"#0f172a"},visualizer:{background:"white",borderRadius:"16px",padding:"28px",boxShadow:"0 6px 18px rgba(0,0,0,0.06)",marginTop:"28px",display:"flex",flexDirection:"column",alignItems:"center",gap:"1.5rem",marginBottom:"1.5rem"},stateBox:{padding:"0.75rem 1.5rem",backgroundColor:"#fff",borderRadius:"12px",border:"1px solid #e2e8f0",boxShadow:"0 2px 4px rgba(0,0,0,0.05)",textAlign:"center",minWidth:"150px"},arrayContainer:{display:"flex",flexWrap:"wrap",gap:"16px",justifyContent:"center"},box:{width:"64px",height:"64px",borderRadius:"10px",background:"#F1F5F9",fontWeight:"600",fontSize:"18px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",transition:"background-color 0.3s, color 0.3s, opacity 0.3s"},boxIndex:{fontSize:"0.7rem",opacity:.7,marginBottom:"2px"},boxValue:{fontSize:"18px",fontWeight:"600"},messageBox:{color:"#fff",padding:"0.7rem 1.5rem",borderRadius:"12px",fontSize:"1rem",fontWeight:"700",textAlign:"center",minWidth:"300px"},legend:{display:"flex",gap:"1.5rem",flexWrap:"wrap",justifyContent:"center",marginTop:"1rem"},legendItem:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.9rem",color:"#64748b",fontWeight:"600"},dot:{width:"12px",height:"12px",borderRadius:"50%"},resultPanel:{background:"#F8FAFC",borderRadius:"12px",padding:"14px",marginTop:"16px",border:"1px solid #E2E8F0",textAlign:"center",width:"100%",maxWidth:"400px"},resultText:{fontSize:"1.2rem",fontWeight:"bold"},controls:{display:"flex",justifyContent:"center",gap:"1rem",marginBottom:"2rem",flexWrap:"wrap"},btn:{background:"#4F46E5",color:"white",borderRadius:"10px",padding:"10px 18px",fontWeight:"500",border:"none",cursor:"pointer",transition:"background-color 0.2s",fontSize:"1rem"},codeSection:{marginBottom:"3rem"},subTitle:{fontSize:"1.5rem",fontWeight:"900",color:"#1e293b",marginBottom:"1.5rem",textAlign:"center"},langSelector:{display:"flex",justifyContent:"center",gap:"0.75rem",marginBottom:"1.25rem"},langBtn:{padding:"0.6rem 1.2rem",borderRadius:"10px",fontSize:"0.9rem",fontWeight:"700",cursor:"pointer",transition:"all 0.2s"},codeBox:{backgroundColor:"#0f172a",color:"#f8fafc",padding:"1.5rem",borderRadius:"20px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",fontFamily:"monospace",boxShadow:"inset 0 2px 4px rgba(0,0,0,0.1)"},quizSection:{marginTop:"2rem"},quizGrid:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(280px, 1fr))",gap:"1.5rem"},quizCard:{backgroundColor:"#f8fafc",padding:"1.5rem",borderRadius:"20px",border:"1px solid #f1f5f9"},question:{fontWeight:"700",color:"#1e293b",marginBottom:"0.75rem",fontSize:"1rem"},answer:{color:"#10b981",fontWeight:"600",lineHeight:"1.5",fontSize:"0.95rem"}},Dt=t=>new Promise(i=>setTimeout(i,t)),Ge=[{id:"two-sum",title:"Two Sum",desc:"Given an array of integers and a target sum, find two numbers that add up to the target using a hash map or two pointers.",difficulty:"Easy",tag:"🎯"},{id:"binary-search",title:"Binary Search in Sorted Array",desc:"Implement standard binary search to find a target value in a sorted array in O(log n) time.",difficulty:"Easy",tag:"🔍"},{id:"first-bad-version",title:"First Bad Version",desc:"Find the first bad version in an API using binary search to minimize API calls.",difficulty:"Easy",tag:"🐛"},{id:"find-peak",title:"Find Peak Element",desc:"Find any peak element (an element greater than its neighbors) using binary search.",difficulty:"Medium",tag:"⛰️"},{id:"search-rotated",title:"Search in Rotated Sorted Array",desc:"Find a target in a sorted array that has been rotated, still strictly using O(log n) time.",difficulty:"Medium",tag:"🔄"},{id:"min-rotated",title:"Minimum in Rotated Sorted Array",desc:"Find the minimum element in a rotated sorted array using binary search.",difficulty:"Medium",tag:"⬇️"},{id:"k-closest",title:"K Closest Elements",desc:"Find the k closest elements to a given value x in a sorted array using binary search and two pointers.",difficulty:"Medium",tag:"🤏"},{id:"median-two-sorted",title:"Median of Two Sorted Arrays",desc:"Find the median of two sorted arrays of different sizes in O(log(min(m, n))) time.",difficulty:"Hard",tag:"📊"}],Ke=t=>({padding:"3px 10px",borderRadius:"999px",fontSize:"12px",fontWeight:"700",backgroundColor:t==="Easy"?"#dcfce7":t==="Medium"?"#fff7ed":"#fee2e2",color:t==="Easy"?"#15803d":t==="Medium"?"#c2410c":"#b91c1c",display:"inline-block"}),me=({title:t,steps:i,initState:l})=>{const[u,n]=o.useState(0),[a,c]=o.useState(!1),[S,g]=o.useState(!1),[r,p]=o.useState(l),d=o.useRef(!1),w=()=>{d.current=!0,setTimeout(()=>{d.current=!1},100),n(0),c(!1),g(!1),p(l)},F=async()=>{d.current=!1,g(!0),c(!1);for(let m=0;m<i.length;m++){if(d.current)return;n(m),p(i[m].state),await Dt(900)}c(!0),g(!1),n(i.length-1),window.AppProgress&&window.AppProgress.markProblemSolved()},y=()=>{if(a||S)return;const m=Math.min(u+1,i.length-1);n(m),p(i[m].state),m===i.length-1&&c(!0)},h=i[u];return e.jsxs("div",{style:pe.wrap,children:[e.jsx("div",{style:pe.desc,children:t}),e.jsxs("div",{style:pe.vizArea,children:[e.jsx("div",{style:{display:"flex",gap:"6px",alignItems:"flex-end",justifyContent:"center",flexWrap:"wrap",marginBottom:"12px"},children:r.map((m,f)=>e.jsx("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},children:e.jsx("div",{style:{...pe.cell,backgroundColor:m.color||"#F1F5F9",border:`2px solid ${m.border||"#cbd5e1"}`,minWidth:m.label?"50px":"40px",fontSize:m.label?"0.7rem":"0.9rem"},children:m.label||m.val})},f))}),h&&e.jsx("div",{style:pe.msg,children:h.msg})]}),e.jsxs("div",{style:pe.controls,children:[e.jsx("button",{onClick:F,disabled:S,style:pe.btn("#4F46E5"),children:"▶ Start Animation"}),e.jsx("button",{onClick:y,disabled:S||a,style:pe.btn("#0891b2"),children:"⏭ Next Step"}),e.jsx("button",{onClick:w,style:pe.btn("#ef4444"),children:"↺ Reset"})]})]})},Qe=[{msg:"Input: [2, 7, 11, 15], Target = 9. Use Hash Map.",state:[{val:2},{val:7},{val:11},{val:15}].map(t=>({...t,color:"#F1F5F9"}))},{msg:"Check 2: 9-2 = 7 in map? No. Add 2 to map.",state:[{val:2,color:"#FACC15"},{val:7},{val:11},{val:15}]},{msg:"Check 7: 9-7 = 2 in map? Yes! Found pair.",state:[{val:2,color:"#22C55E"},{val:7,color:"#22C55E"},{val:11},{val:15}]}],Ue=[{msg:"Search for 7 in [1, 3, 5, 7, 9]. lo=0, hi=4",state:[{val:1},{val:3},{val:5},{val:7},{val:9}].map((t,i)=>({...t,border:i===0||i===4?"#3B82F6":"#cbd5e1"}))},{msg:"mid = 2 (val: 5). 5 < 7. Search Right.",state:[{val:1,color:"#cbd5e1"},{val:3,color:"#cbd5e1"},{val:5,color:"#FACC15"},{val:7},{val:9}]},{msg:"lo=3, hi=4. mid = 3 (val: 7). Found!",state:[{val:1,color:"#cbd5e1"},{val:3,color:"#cbd5e1"},{val:5,color:"#cbd5e1"},{val:7,color:"#22C55E"},{val:9}]}],Xe=[{msg:"Versions: [G, G, G, B, B]. Find first Bad.",state:[{label:"1"},{label:"2"},{label:"3"},{label:"4"},{label:"5"}]},{msg:"Check mid=3. API says GOOD. Search right.",state:[{label:"1",color:"#cbd5e1"},{label:"2",color:"#cbd5e1"},{label:"3",color:"#FACC15"},{label:"4"},{label:"5"}]},{msg:"Check mid=4. API says BAD. Look left to be sure.",state:[{label:"1",color:"#cbd5e1"},{label:"2",color:"#cbd5e1"},{label:"3",color:"#cbd5e1"},{label:"4",color:"#FACC15"},{label:"5",color:"#cbd5e1"}]},{msg:"Version 4 is the first Bad!",state:[{label:"1",color:"#cbd5e1"},{label:"2",color:"#cbd5e1"},{label:"3",color:"#cbd5e1"},{label:"4",color:"#EF4444"},{label:"5",color:"#cbd5e1"}]}],Ye=[{msg:"Find Peak in [1, 2, 1, 3, 5, 6, 4]",state:[1,2,1,3,5,6,4].map(t=>({val:t}))},{msg:"mid = 3 (val: 3). Next is 5. 3 < 5 -> Look right.",state:[1,2,1,3,5,6,4].map((t,i)=>({val:t,color:i===3?"#FACC15":"#F1F5F9"}))},{msg:"mid = 5 (val: 6). Next is 4. 6 > 4 -> Look left.",state:[1,2,1,3,5,6,4].map((t,i)=>({val:t,color:i<4?"#cbd5e1":i===5?"#FACC15":"#F1F5F9"}))},{msg:"Peak is 6!",state:[1,2,1,3,5,6,4].map((t,i)=>({val:t,color:i===5?"#22C55E":"#cbd5e1"}))}],Je=[{msg:"Search 0 in [4, 5, 6, 7, 0, 1, 2]",state:[4,5,6,7,0,1,2].map(t=>({val:t}))},{msg:"mid=3, val=7. Array left half [4..7] is sorted.",state:[4,5,6,7,0,1,2].map((t,i)=>({val:t,color:i===3?"#FACC15":i<=2?"#dbeafe":"#F1F5F9"}))},{msg:"0 is NOT in [4..7]. Search right half.",state:[4,5,6,7,0,1,2].map((t,i)=>({val:t,color:i<=3?"#cbd5e1":"#F1F5F9"}))},{msg:"Found 0 at index 4!",state:[4,5,6,7,0,1,2].map((t,i)=>({val:t,color:i===4?"#22C55E":"#cbd5e1"}))}],Ze=[{msg:"Find Min in [4, 5, 6, 7, 0, 1, 2]",state:[4,5,6,7,0,1,2].map(t=>({val:t}))},{msg:"mid=3 (val=7). 7 > rightmost(2), min is to the right.",state:[4,5,6,7,0,1,2].map((t,i)=>({val:t,color:i===3?"#FACC15":i===6?"#3B82F6":"#F1F5F9"}))},{msg:"lo=4, hi=6. mid=5 (val=1). 1 < rightmost(2), min is to the left.",state:[4,5,6,7,0,1,2].map((t,i)=>({val:t,color:i===5?"#FACC15":i<=3?"#cbd5e1":"#F1F5F9"}))},{msg:"Found min 0 at index 4!",state:[4,5,6,7,0,1,2].map((t,i)=>({val:t,color:i===4?"#22C55E":"#cbd5e1"}))}],et=[{msg:"Find 3 closest to 4 in [1, 2, 3, 4, 5].",state:[1,2,3,4,5].map(t=>({val:t}))},{msg:"Binary search finds exactly 4 at index 3.",state:[1,2,3,4,5].map((t,i)=>({val:t,color:i===3?"#FACC15":"#F1F5F9"}))},{msg:"Expand outwards. 3 and 5 are tied, take smaller (3).",state:[1,2,3,4,5].map((t,i)=>({val:t,color:i===2||i===3?"#22C55E":"#F1F5F9"}))},{msg:"Next closest is 5.",state:[1,2,3,4,5].map((t,i)=>({val:t,color:i>=2&&i<=4?"#22C55E":"#cbd5e1"}))}],tt=[{msg:"Arrays A: [1, 3], B: [2]. Total len 3 (odd). Target Median is rank 2.",state:[{label:"A: 1"},{label:"3"},{label:"B: 2"},{label:" "}]},{msg:"Binary search on smaller array A to partition elements.",state:[{label:"A: 1",color:"#FACC15"},{label:"3"},{label:"B: 2",color:"#FACC15"},{label:" "}]},{msg:"Partition valid logic: A_left < B_right and B_left < A_right.",state:[{label:"A: 1",color:"#22C55E"},{label:"3"},{label:"B: 2"},{label:" "}]},{msg:"Median is max(A_left, B_left) for odd length = 2.",state:[{label:"A: 1"},{label:"3"},{label:"B: 2",color:"#22C55E"},{label:" "}]}],Ot={"two-sum":{python:`def twoSum(nums, target):
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
}`}},Ht=({id:t})=>t==="two-sum"?e.jsx(me,{title:"Two Sum via Hash Map",steps:Qe,initState:Qe[0].state}):t==="binary-search"?e.jsx(me,{title:"Binary Search",steps:Ue,initState:Ue[0].state}):t==="first-bad-version"?e.jsx(me,{title:"First Bad Version",steps:Xe,initState:Xe[0].state}):t==="find-peak"?e.jsx(me,{title:"Find Peak",steps:Ye,initState:Ye[0].state}):t==="search-rotated"?e.jsx(me,{title:"Search Rotated",steps:Je,initState:Je[0].state}):t==="min-rotated"?e.jsx(me,{title:"Min Rotated",steps:Ze,initState:Ze[0].state}):t==="k-closest"?e.jsx(me,{title:"K Closest",steps:et,initState:et[0].state}):t==="median-two-sorted"?e.jsx(me,{title:"Median Two Arrays",steps:tt,initState:tt[0].state}):null,Pt=()=>{const[t,i]=o.useState(Ge[0]),[l,u]=o.useState("python");return e.jsx("div",{style:ye.outer,children:e.jsxs("div",{style:ye.split,children:[e.jsx("div",{style:ye.left,children:Ge.map(n=>e.jsxs("div",{onClick:()=>{i(n),u("python")},style:{...ye.card,boxShadow:t.id===n.id?"0 0 0 2px #4F46E5":"0 4px 10px rgba(0,0,0,0.05)",backgroundColor:t.id===n.id?"#F0F1FE":"#fff"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"6px"},children:[e.jsxs("span",{style:{fontWeight:"800",color:"#1E293B",fontSize:"0.98rem"},children:[n.tag," ",n.title]}),e.jsx("span",{style:Ke(n.difficulty),children:n.difficulty})]}),e.jsx("p",{style:{fontSize:"0.82rem",color:"#64748B",margin:0,lineHeight:"1.5"},children:n.desc}),e.jsx("button",{style:{...ye.viewBtn,marginTop:"10px",backgroundColor:t.id===n.id?"#4F46E5":"#F1F5F9",color:t.id===n.id?"#fff":"#4F46E5"},children:t.id===n.id?"▸ Viewing Solution":"View Animated Solution"})]},n.id))}),e.jsx("div",{style:ye.right,children:e.jsx(ie,{mode:"wait",children:e.jsx(I.div,{initial:{opacity:0,y:12},animate:{opacity:1,y:0},exit:{opacity:0},transition:{duration:.25},children:e.jsxs("div",{style:ye.panel,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",flexWrap:"wrap",gap:"8px"},children:[e.jsxs("h3",{style:{margin:0,fontSize:"1.3rem",fontWeight:"900",color:"#1E293B"},children:[t.tag," ",t.title]}),e.jsx("span",{style:Ke(t.difficulty),children:t.difficulty})]}),e.jsx("p",{style:{color:"#64748B",marginBottom:"20px",lineHeight:"1.6",fontSize:"0.95rem"},children:t.desc}),e.jsx(Ht,{id:t.id}),e.jsxs("div",{style:{marginTop:"24px"},children:[e.jsx("h4",{style:{fontWeight:"800",color:"#1E293B",marginBottom:"12px"},children:"Implementation"}),e.jsx("div",{style:{display:"flex",gap:"8px",marginBottom:"12px",flexWrap:"wrap"},children:["python","javascript","cpp"].map(n=>e.jsx("button",{onClick:()=>u(n),style:{padding:"5px 14px",borderRadius:"8px",border:l===n?"none":"1px solid #E2E8F0",backgroundColor:l===n?"#4F46E5":"#F8FAFC",color:l===n?"#fff":"#64748B",fontWeight:"700",cursor:"pointer",fontSize:"0.85rem"},children:n==="cpp"?"C++":n.toUpperCase()},n))}),e.jsx("pre",{style:{backgroundColor:"#0F172A",color:"#F8FAFC",padding:"1.2rem",borderRadius:"14px",overflowX:"auto",fontSize:"0.85rem",lineHeight:"1.6",fontFamily:"monospace",margin:0},children:e.jsx("code",{children:Ot[t.id]?.[l]||"// implementation details"})})]})]})},t.id)})})]})})},pe={wrap:{display:"flex",flexDirection:"column",gap:"12px"},desc:{fontSize:"0.9rem",color:"#64748B",lineHeight:"1.6",backgroundColor:"#F1F5F9",borderRadius:"10px",padding:"10px 14px"},vizArea:{backgroundColor:"#F8FAFC",border:"1px solid #E2E8F0",borderRadius:"14px",padding:"20px",display:"flex",flexDirection:"column",gap:"12px",alignItems:"center",minHeight:"120px"},cell:{width:"40px",height:"40px",borderRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"900",fontSize:"0.9rem",color:"#1E293B",transition:"background-color 0.3s, outline 0.2s"},msg:{backgroundColor:"#1E293B",color:"#fff",padding:"8px 16px",borderRadius:"10px",fontSize:"0.88rem",fontWeight:"700",textAlign:"center"},controls:{display:"flex",gap:"8px",justifyContent:"center",flexWrap:"wrap"},btn:t=>({padding:"8px 16px",borderRadius:"10px",border:"none",backgroundColor:t,color:"#fff",fontWeight:"700",cursor:"pointer",fontSize:"0.9rem"})},ye={outer:{fontFamily:"system-ui, sans-serif",width:"100%"},split:{display:"flex",gap:"20px",alignItems:"flex-start",flexWrap:"wrap"},left:{flex:"0 0 38%",minWidth:"260px",display:"flex",flexDirection:"column",gap:"12px"},right:{flex:1,minWidth:"300px"},card:{borderRadius:"14px",padding:"16px",cursor:"pointer",transition:"box-shadow 0.2s, background-color 0.15s",border:"1px solid #F1F5F9"},viewBtn:{padding:"6px 14px",borderRadius:"8px",border:"none",cursor:"pointer",fontWeight:"700",fontSize:"0.82rem",transition:"all 0.2s"},panel:{backgroundColor:"#F8FAFC",borderRadius:"16px",padding:"24px",border:"1px solid #E2E8F0"}},rt=[{id:"linear",label:"Linear Search"},{id:"binary",label:"Binary Search"},{id:"twopointer",label:"Two Pointer Search"},{id:"sliding",label:"Sliding Window Search"},{id:"practice",label:"Searching Practice Problems"}],Lt=({name:t})=>e.jsxs("div",{style:{padding:"3rem",textAlign:"center",color:"#64748b",fontFamily:"system-ui, sans-serif"},children:[e.jsx("div",{style:{fontSize:"3rem",marginBottom:"1rem"},children:"🚧"}),e.jsx("h3",{style:{fontSize:"1.5rem",fontWeight:"700",color:"#1e293b",marginBottom:"0.5rem"},children:t}),e.jsx("p",{style:{fontSize:"1rem"},children:"This metaphor is coming soon. Stay tuned!"})]}),Nt=()=>{const[t,i]=o.useState("linear"),[l,u]=o.useState(null),n=()=>{switch(t){case"linear":return e.jsx(Wt,{});case"binary":return e.jsx(It,{});case"twopointer":return e.jsx($t,{});case"sliding":return e.jsx(Mt,{});case"practice":return e.jsx(Pt,{});default:return e.jsx(Lt,{name:rt.find(a=>a.id===t)?.label})}};return e.jsxs("div",{style:ge.shell,children:[e.jsxs("div",{style:ge.header,children:[e.jsx("h2",{style:ge.title,children:"Searching Algorithms — Finding Data Efficiently"}),e.jsx("p",{style:ge.subtitle,children:"Searching algorithms help locate elements inside data structures such as arrays or lists. Efficient searching is essential for databases, applications, and large datasets."})]}),e.jsx("div",{style:ge.tabBar,children:e.jsx("div",{style:ge.tabScroll,children:rt.map(a=>e.jsx("button",{onClick:()=>i(a.id),onMouseEnter:()=>u(a.id),onMouseLeave:()=>u(null),style:{...ge.tab,borderBottom:t===a.id?"3px solid #4F46E5":"3px solid transparent",color:t===a.id?"#4F46E5":l===a.id?"#1E293B":"#64748B",paddingBottom:t===a.id?"6px":"9px",fontWeight:t===a.id?"600":"normal"},children:a.label},a.id))})}),e.jsx("div",{style:ge.content,children:n()})]})},ge={shell:{width:"100%",maxWidth:"1000px",margin:"0 auto",fontFamily:"system-ui, sans-serif"},header:{textAlign:"center",padding:"1.5rem 1rem 0.5rem",marginBottom:"1rem"},title:{fontSize:"34px",fontWeight:"700",color:"#1e293b",marginBottom:"10px"},subtitle:{fontSize:"16px",color:"#64748B",lineHeight:"1.6",maxWidth:"680px",margin:"auto"},tabBar:{width:"100%",borderBottom:"2px solid #E2E8F0",paddingBottom:"10px",marginTop:"20px",marginBottom:"1.5rem"},tabScroll:{display:"flex",gap:"26px",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",padding:"0 0.5rem"},tab:{padding:"0.8rem 0",background:"none",border:"none",fontSize:"1rem",cursor:"pointer",transition:"all 0.2s",whiteSpace:"nowrap"},content:{}},Vt=t=>new Promise(i=>setTimeout(i,t)),ne=5,_t=()=>{const[t,i]=o.useState("play"),[l,u]=o.useState(0),[n,a]=o.useState("Climb the stairs! Find the optimal paths."),[c,S]=o.useState(new Set),[g,r]=o.useState(Array(ne+1).fill("?")),[p,d]=o.useState(-1),[w,F]=o.useState(!1),[y,h]=o.useState(null),m=o.useRef(!1),[f,x]=o.useState("python"),[R,T]=o.useState(!1),W=(()=>{const k=[1,1];for(let z=2;z<=ne;z++)k[z]=k[z-1]+k[z-2];return k})(),q=()=>{u(0),a("Climb the stairs! Find the optimal paths.")},v=()=>{q(),S(new Set),r(Array(ne+1).fill("?"))},s=k=>{if(l===ne)return;const z=l+k;if(z>ne){a("Oops! You overshoot the top step.");return}if(u(z),z===ne){a("Success! You reached the top step.");const $=new Set(c);$.add(z),S($);const O=[...g];O[z]=W[z],r(O)}else if(c.has(z))a("This subproblem was already solved.");else{a(`Climbed to step ${z}.`);const $=new Set(c);$.add(z),S($);const O=[...g];O[z]=W[z],r(O)}},b=()=>{const k=[],z={},$=O=>{if(k.push({node:O,msg:`Calculating f(${O})...`,memo:{...z}}),O===0||O===1)return z[O]=1,k.push({node:O,msg:`Base case: f(${O}) = 1`,memo:{...z}}),1;if(z[O]!==void 0)return k.push({node:O,msg:"This subproblem was already solved.",memo:{...z},hit:!0}),z[O];const se=$(O-1)+$(O-2);return z[O]=se,k.push({node:O,msg:`Stored result: f(${O}) = ${se}`,memo:{...z}}),se};return $(ne),k.push({node:ne,msg:`Finished! ${z[ne]} ways to reach top.`,memo:{...z},done:!0}),k},B=()=>{const k=[],z=Array(ne+1).fill("?");z[0]=1,k.push({node:0,msg:"Base case: dp[0] = 1",dp:[...z]}),z[1]=1,k.push({node:1,msg:"Base case: dp[1] = 1",dp:[...z]});for(let $=2;$<=ne;$++)k.push({node:$,msg:`Calculating dp[${$}] = dp[${$-1}] + dp[${$-2}]`,dp:[...z]}),z[$]=z[$-1]+z[$-2],k.push({node:$,msg:`dp[${$}] = ${z[$-1]} + ${z[$-2]} = ${z[$]}`,dp:[...z]});return k.push({node:ne,msg:"Finished Table Construction!",dp:[...z],done:!0}),k},C=async k=>{if(w)return;F(!0),m.current=!1,d(-1);const z=k==="memo"?b():B();for(let $=0;$<z.length&&!m.current;$++){d($);const O=z[$];if(h(O.node),a(O.msg),k==="memo"){const se=Array(ne+1).fill("?");Object.keys(O.memo).forEach(oe=>{se[oe]=O.memo[oe]+(O.hit&&parseInt(oe)===O.node?" (Mem)":"")}),r(se)}else r(O.dp);await Vt(1e3)}F(!1),h(null)},E=()=>{m.current=!0,F(!1)},j=k=>{E(),i(k),v(),(k==="tab"||k==="memo")&&(a(k==="tab"?"Click Start to build the DP table Bottom-Up.":"Click Start to trace Top-Down Memoization."),r(Array(ne+1).fill("?")))},A=k=>{const z=t==="play"?l===k:y===k;if(z&&k===ne)return"#22C55E";if(z)return"#FACC15";const $=g[k];return $!=="?"&&typeof $=="string"&&$.includes("(Mem)")?"#A855F7":$!=="?"?"#3B82F6":"#F1F5F9"};return e.jsxs("div",{style:Q.container,children:[e.jsxs("div",{style:Q.card,children:[e.jsx("h3",{style:Q.title,children:"Climbing Stairs — Infinite Tower Challenge"}),e.jsxs("p",{style:Q.desc,children:["Imagine a tower with ",ne," steps. You can climb either ",e.jsx("strong",{children:"1 step"})," or ",e.jsx("strong",{children:"2 steps"})," at a time. The challenge is to find how many different ways you can reach each step all the way to the top."]})]}),e.jsxs("div",{style:{display:"flex",gap:"10px",marginBottom:"20px",justifyContent:"center",flexWrap:"wrap"},children:[e.jsx("button",{onClick:()=>j("play"),style:{...Q.modeBtn,background:t==="play"?"#4F46E5":"#F1F5F9",color:t==="play"?"white":"#1E293B"},children:"Interactive Gameplay"}),e.jsx("button",{onClick:()=>j("memo"),style:{...Q.modeBtn,background:t==="memo"?"#4F46E5":"#F1F5F9",color:t==="memo"?"white":"#1E293B"},children:"Enable Memoization"}),e.jsx("button",{onClick:()=>j("tab"),style:{...Q.modeBtn,background:t==="tab"?"#4F46E5":"#F1F5F9",color:t==="tab"?"white":"#1E293B"},children:"Bottom-Up Mode"})]}),e.jsxs("div",{style:Q.visualizer,children:[e.jsx("div",{style:{flex:"1 1 350px",display:"flex",flexDirection:"column",paddingRight:"20px",borderRight:"2px dashed #E2E8F0",justifyContent:"flex-end",minHeight:"400px",position:"relative"},children:e.jsx("div",{style:{position:"relative",height:"100%",display:"flex",flexDirection:"column-reverse",alignItems:"flex-start"},children:[...Array(ne+1).keys()].map(k=>e.jsxs("div",{style:{width:"120px",height:"60px",borderRadius:"10px",background:A(k),fontWeight:"600",display:"flex",alignItems:"center",justifyContent:"center",marginLeft:`${k*45}px`,marginBottom:"5px",transition:"background-color 0.3s, transform 0.2s",boxShadow:"0 4px 10px rgba(0,0,0,0.05)",color:A(k)==="#F1F5F9"?"#1E293B":"white",position:"relative"},children:["Step ",k,A(k)==="#FACC15"&&e.jsx(I.span,{layoutId:"climber",initial:{opacity:0,y:10},animate:{opacity:1,y:-45},transition:{type:"spring",stiffness:300,damping:25},style:{position:"absolute",fontSize:"2.5rem",zIndex:10},children:"🧗"})]},k))})}),e.jsxs("div",{style:{flex:"1 1 350px",display:"flex",flexDirection:"column",paddingLeft:"20px"},children:[e.jsx("div",{style:Q.messageBox,children:n}),e.jsxs("div",{style:Q.controlsRow,children:[t==="play"&&e.jsxs(e.Fragment,{children:[e.jsx(I.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>s(1),disabled:l>=ne,style:Q.btn("#3B82F6"),children:"Climb 1 Step"}),e.jsx(I.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>s(2),disabled:l>=ne-1,style:Q.btn("#10B981"),children:"Climb 2 Steps"}),e.jsx(I.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:q,style:Q.btn("#64748B"),children:"Restart Run"}),e.jsx(I.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:v,style:Q.btn("#EF4444"),children:"Reset Game"})]}),t!=="play"&&e.jsxs(e.Fragment,{children:[e.jsx(I.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:()=>C(t),disabled:w,style:Q.btn("#4F46E5"),children:"▶ Start Animation"}),e.jsx(I.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:v,style:Q.btn("#EF4444"),children:"↺ Reset"})]})]}),e.jsxs("div",{style:{marginTop:"20px",background:"#F8FAFC",padding:"16px",borderRadius:"12px",border:"1px solid #E2E8F0"},children:[e.jsxs("h4",{style:{margin:"0 0 16px 0",fontSize:"1.1rem",color:"#1E293B",display:"flex",justifyContent:"space-between"},children:["DP Table Formulation",e.jsx("span",{style:{fontSize:"0.85rem",color:"#64748B",fontWeight:"normal"},children:"Amount → Minimum coins... wait, Ways → Steps"})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:[e.jsx(ie,{children:[...Array(ne+1).keys()].filter(k=>g[k]!=="?").map(k=>e.jsxs(I.div,{initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{duration:.3},style:{display:"flex",justifyContent:"space-between",padding:"10px 16px",background:typeof g[k]=="string"&&g[k].includes("(Mem)")?"#F3E8FF":"#DBEAFE",borderRadius:"8px",borderLeft:`4px solid ${typeof g[k]=="string"&&g[k].includes("(Mem)")?"#A855F7":"#3B82F6"}`},children:[e.jsxs("span",{style:{fontWeight:600,color:"#1E293B"},children:["Step ",k]}),e.jsxs("span",{style:{fontWeight:800,color:typeof g[k]=="string"&&g[k].includes("(Mem)")?"#7E22CE":"#1D4ED8"},children:[typeof g[k]=="string"?g[k].replace("(Mem)",""):g[k]," ways"]})]},k))}),g.every(k=>k==="?")&&e.jsx("div",{style:{textAlign:"center",padding:"20px",color:"#94A3B8",fontStyle:"italic"},children:"Table is empty. Start solving!"})]})]}),e.jsxs("div",{style:Q.legend,children:[e.jsxs("div",{style:Q.legendItem,children:[e.jsx("span",{style:{...Q.dot,background:"#FACC15"}})," Current step"]}),e.jsxs("div",{style:Q.legendItem,children:[e.jsx("span",{style:{...Q.dot,background:"#3B82F6"}})," Computed step"]}),e.jsxs("div",{style:Q.legendItem,children:[e.jsx("span",{style:{...Q.dot,background:"#A855F7"}})," Memoized value"]}),e.jsxs("div",{style:Q.legendItem,children:[e.jsx("span",{style:{...Q.dot,background:"#22C55E"}})," Final step"]})]})]})]}),e.jsxs("div",{style:Q.codeSection,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"},children:[e.jsx("h3",{style:{margin:0,fontSize:"1.2rem",color:"#1E293B",fontWeight:"800"},children:"Algorithm Implementation"}),e.jsx("div",{style:{display:"flex",gap:"8px"},children:["python","javascript","cpp"].map(k=>e.jsx("button",{onClick:()=>x(k),style:{...Q.langBtn,background:f===k?"#4F46E5":"#F1F5F9",color:f===k?"white":"#64748B"},children:k==="cpp"?"C++":k.charAt(0).toUpperCase()+k.slice(1)},k))})]}),e.jsx("pre",{style:Q.codeBlock,children:e.jsx("code",{children:Gt[f]})})]}),e.jsxs("div",{style:{...Q.card,marginTop:"24px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{margin:"0 0 8px 0",color:"#1E293B"},children:"Knowledge Check"}),e.jsx("p",{style:{margin:0,color:"#64748B",fontSize:"0.95rem"},children:"Test your understanding of Dynamic Programming concepts."})]}),e.jsx("button",{onClick:()=>T(!R),style:{...Q.langBtn,background:R?"#64748B":"#4F46E5",color:"white"},children:R?"Hide Quiz":"Take Quiz"})]}),e.jsx(ie,{children:R&&e.jsx(I.div,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},style:{overflow:"hidden"},children:e.jsxs("div",{style:{marginTop:"24px",display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(Ie,{q:"1. What is Dynamic Programming?",o:["An iterative looping technique","A method for solving complex problems by breaking them down into simpler overlapping subproblems","A way to sort arrays quickly","Programming websites dynamically"],a:1}),e.jsx(Ie,{q:"2. What are overlapping subproblems?",o:["Functions that infinitely loop","Subproblems that are completely independent","Subproblems that share exactly the same inputs and are solved multiple times recursively","Code conflicts when merging"],a:2}),e.jsx(Ie,{q:"3. What is memoization?",o:["Writing comments to remember what code does","Storing the results of expensive function calls and returning the cached result when the same inputs occur again","Converting a program into memory blocks","Building a table bottom-up"],a:1}),e.jsx(Ie,{q:"4. What is the difference between memoization and tabulation?",o:["Memoization is Top-Down caching; Tabulation is Bottom-Up table building","They are exactly the same thing","Memoization is iterative; Tabulation is recursive","Tabulation uses less memory than iterative approaches"],a:0})]})})})]})]})},Ie=({q:t,o:i,a:l})=>{const[u,n]=o.useState(null);return e.jsxs("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"12px",border:"1px solid #E2E8F0"},children:[e.jsx("h4",{style:{margin:"0 0 12px 0",color:"#1E293B",fontSize:"1rem"},children:t}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:i.map((a,c)=>e.jsxs("button",{onClick:()=>n(c),style:{padding:"10px 16px",textAlign:"left",borderRadius:"8px",border:u===c?c===l?"2px solid #22C55E":"2px solid #EF4444":"2px solid transparent",background:u===c?c===l?"#DCFCE7":"#FEE2E2":"#FFF",color:"#1E293B",cursor:"pointer",transition:"all 0.2s",boxShadow:"0 2px 4px rgba(0,0,0,0.02)"},children:[a,u===c&&c===l&&e.jsx("span",{style:{float:"right"},children:"✅ Correct"}),u===c&&c!==l&&e.jsx("span",{style:{float:"right"},children:"❌ Incorrect"})]},c))})]})},Q={container:{fontFamily:"system-ui, sans-serif"},card:{background:"white",borderRadius:"16px",padding:"24px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)",marginBottom:"24px"},title:{fontSize:"1.5rem",fontWeight:"800",color:"#1e293b",margin:"0 0 12px 0"},desc:{fontSize:"1rem",color:"#64748B",lineHeight:"1.6",margin:0},modeBtn:{padding:"10px 20px",borderRadius:"999px",border:"none",fontWeight:"700",cursor:"pointer",transition:"all 0.2s",fontSize:"0.95rem"},visualizer:{background:"white",borderRadius:"16px",padding:"28px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)",marginBottom:"24px",display:"flex",flexWrap:"wrap",gap:"20px"},messageBox:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",fontSize:"1.1rem",fontWeight:"600",marginBottom:"20px",textAlign:"center",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 6px rgba(0,0,0,0.1)"},controlsRow:{display:"flex",gap:"10px",flexWrap:"wrap",justifyContent:"center"},btn:t=>({background:t,color:"white",border:"none",borderRadius:"8px",padding:"12px 18px",fontWeight:"700",cursor:"pointer",opacity:.95,fontSize:"0.95rem"}),legend:{display:"flex",gap:"16px",flexWrap:"wrap",background:"#F8FAFC",padding:"12px",borderRadius:"8px",border:"1px solid #E2E8F0",marginTop:"20px",justifyContent:"center"},legendItem:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.85rem",color:"#64748B",fontWeight:"600"},dot:{width:"12px",height:"12px",borderRadius:"4px"},codeSection:{background:"white",borderRadius:"16px",padding:"24px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)"},langBtn:{padding:"8px 16px",borderRadius:"8px",border:"none",fontWeight:"700",cursor:"pointer",transition:"all 0.2s",fontSize:"0.85rem"},codeBlock:{background:"#0F172A",color:"#E2E8F0",padding:"20px",borderRadius:"12px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",margin:0,fontFamily:"monospace"}},Gt={python:`def climbStairs(n: int) -> int:
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
}`},Be=t=>new Promise(i=>setTimeout(i,t)),it=[1,2,5],ae=11,Kt=()=>{const[t,i]=o.useState("play"),[l,u]=o.useState([]),[n,a]=o.useState("Drag tokens or click to add coins to the vending machine!"),c=l.reduce((C,E)=>C+E,0),[S,g]=o.useState(!1),r=o.useRef(!1),[p,d]=o.useState(Array(ae+1).fill("∞")),[w,F]=o.useState(null),[y,h]=o.useState(null),[m,f]=o.useState("Click Start to trace the Bottom-Up DP table."),[x,R]=o.useState("python"),[T,L]=o.useState(!1),W=C=>{if(c+C>ae){a("Oops! That exceeds the target amount.");return}const E=[...l,C];u(E);const j=c+C;j===ae?E.length===3?a("Optimal solution found! 3 coins (5, 5, 1)."):a(`Target reached with ${E.length} coins. Can you do it in 3?`):a(`Added ${C}¢. Current amount: ${j}¢`)},q=()=>{u([]),a("Drag tokens or click to add coins to the vending machine!")},v=async()=>{if(S)return;g(!0),r.current=!1;const C=Array(ae+1).fill("∞");C[0]=0,d([...C]),f("Base case: dp[0] = 0. Zero coins needed to make amount 0."),await Be(1500);for(let E=1;E<=ae&&!r.current;E++){F(E),f(`Calculating minimum coins for amount ${E}¢...`),await Be(1e3);for(let j of it){if(r.current)break;if(E-j>=0){h(j),f(`Checking coin ${j}¢... Can we use it for amount ${E}¢?`),await Be(1e3);const A=C[E-j];if(A!=="∞"){const k=A+1;C[E]==="∞"||k<C[E]?(C[E]=k,d([...C]),f(`Updating dp[${E}] to ${k} coins (dp[${E-j}] + 1).`)):f(`dp[${E}] is already optimal with ${C[E]} coins. No update.`)}else f(`dp[${E-j}] is unreachable. Cannot use ${j}¢ coin.`);await Be(1e3)}}h(null),f(`Amount ${E}¢ computed! Optimal is ${C[E]} coins.`),await Be(1e3)}r.current||(F(ae),f(`Finished! Minimum coins to make ${ae}¢ is ${C[ae]}.`),window.AppProgress&&window.AppProgress.markProblemSolved()),g(!1)},s=()=>{r.current=!0,g(!1),d(Array(ae+1).fill("∞")),F(null),h(null),f("Click Start to trace the Bottom-Up DP table.")},b=C=>{S&&(r.current=!0),i(C),C==="play"?q():s()},B=C=>t==="sim"?C===ae&&p[C]!=="∞"?"#22C55E":C===w?"#FACC15":w!==null&&y!==null&&C===w-y?"#A855F7":p[C]!=="∞"?"#3B82F6":"#F1F5F9":c===C?"#22C55E":c>C?"#E2E8F0":"#F1F5F9";return e.jsxs("div",{style:ee.container,children:[e.jsxs("div",{style:ee.card,children:[e.jsx("h3",{style:ee.title,children:"Coin Change — Vending Machine Builder"}),e.jsxs("p",{style:ee.desc,children:["A vending machine must produce a target amount using the minimum number of coins. Given coins of denominations ",e.jsx("strong",{children:"[1, 2, 5]"})," and a ",e.jsxs("strong",{children:["target of ",ae]}),", construct the optimum combination."]})]}),e.jsxs("div",{style:{display:"flex",gap:"10px",marginBottom:"20px",justifyContent:"center"},children:[e.jsx("button",{onClick:()=>b("play"),style:{...ee.modeBtn,background:t==="play"?"#4F46E5":"#F1F5F9",color:t==="play"?"white":"#1E293B"},children:"Interactive Builder"}),e.jsx("button",{onClick:()=>b("sim"),style:{...ee.modeBtn,background:t==="sim"?"#4F46E5":"#F1F5F9",color:t==="sim"?"white":"#1E293B"},children:"Algorithm Visualization"})]}),e.jsxs("div",{style:ee.visualizer,children:[e.jsxs("div",{style:{flex:"1 1 350px",display:"flex",flexDirection:"column",gap:"20px",paddingRight:"20px",borderRight:"2px dashed #E2E8F0"},children:[e.jsxs("div",{style:{background:"#1E293B",borderRadius:"16px",padding:"24px",display:"flex",flexDirection:"column",alignItems:"center",boxShadow:"0 8px 16px rgba(0,0,0,0.1)"},children:[e.jsx("div",{style:{color:"#94A3B8",fontSize:"1rem",fontWeight:"bold",letterSpacing:"2px",marginBottom:"10px"},children:"TARGET"}),e.jsxs("div",{style:{fontSize:"3rem",fontWeight:"800",color:"#10B981",fontFamily:"monospace",background:"#0F172A",padding:"10px 30px",borderRadius:"12px",border:"2px solid #334155"},children:[ae,"¢"]}),e.jsx("div",{style:{width:"100%",height:"24px",background:"#334155",borderRadius:"12px",marginTop:"20px",overflow:"hidden",position:"relative"},children:e.jsx(I.div,{style:{height:"100%",background:c===ae?"#10B981":"#3B82F6"},initial:{width:0},animate:{width:`${Math.min(100,c/ae*100)}%`},transition:{type:"spring",stiffness:100}})}),e.jsxs("div",{style:{color:"white",marginTop:"10px",fontSize:"1.2rem",fontWeight:"600"},children:["Current: ",c,"¢"]})]}),t==="play"&&e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",background:"#F8FAFC",padding:"20px",borderRadius:"12px",border:"1px solid #E2E8F0"},children:[e.jsx("p",{style:{margin:"0 0 16px 0",fontWeight:"600",color:"#64748B"},children:"Available Coins (Drag or Click)"}),e.jsx("div",{style:{display:"flex",gap:"16px"},children:it.map(C=>e.jsx(I.div,{onClick:()=>W(C),drag:!0,dragConstraints:{left:0,right:0,top:0,bottom:0},dragElastic:.5,whileHover:{scale:1.1},whileTap:{scale:.9},style:{width:"60px",height:"60px",borderRadius:"50%",background:"#FACC15",border:"4px solid #CA8A04",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"800",fontSize:"1.2rem",color:"#713F12",cursor:"grab",boxShadow:"0 4px 6px rgba(0,0,0,0.1)"},children:C},C))})]}),t==="play"&&e.jsx("div",{style:{minHeight:"80px",display:"flex",gap:"8px",flexWrap:"wrap",padding:"16px",border:"2px dashed #CBD5E1",borderRadius:"12px"},children:e.jsx(ie,{children:l.map((C,E)=>e.jsx(I.div,{initial:{scale:0,opacity:0},animate:{scale:1,opacity:1},exit:{scale:0,opacity:0},style:{width:"40px",height:"40px",borderRadius:"50%",background:"#FDE047",border:"2px solid #CA8A04",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold",color:"#713F12"},children:C},E))})})]}),e.jsxs("div",{style:{flex:"1 1 350px",display:"flex",flexDirection:"column",paddingLeft:"20px",gap:"20px"},children:[e.jsx("div",{style:ee.messageBox,children:t==="play"?n:m}),e.jsx("div",{style:ee.controlsRow,children:t==="play"?e.jsx(I.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:q,style:ee.btn("#EF4444"),children:"Reset Vending Logic"}):e.jsxs(e.Fragment,{children:[e.jsx(I.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:v,disabled:S,style:ee.btn("#4F46E5"),children:"▶ Start Animation"}),e.jsx(I.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:s,style:ee.btn("#EF4444"),children:"↺ Reset"})]})}),e.jsxs("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"12px",border:"1px solid #E2E8F0",flexGrow:1},children:[e.jsx("h4",{style:{margin:"0 0 16px 0",fontSize:"1rem",color:"#1E293B"},children:"DP Table: Amount → Min Coins"}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:[...Array(ae+1).keys()].map(C=>e.jsxs(I.div,{layout:!0,style:{width:"45px",display:"flex",flexDirection:"column",alignItems:"center",background:B(C),borderRadius:"8px",border:"1px solid #CBD5E1",padding:"4px",transition:"background-color 0.3s"},children:[e.jsx("span",{style:{fontSize:"0.75rem",color:"#64748B",fontWeight:"bold"},children:C}),e.jsx("span",{style:{fontSize:"1rem",color:B(C)==="#F1F5F9"?"#94A3B8":B(C)==="#22C55E"?"white":"#1E293B",fontWeight:"800"},children:t==="sim"?p[C]:C===0?"0":"?"})]},C))})]}),e.jsxs("div",{style:ee.legend,children:[e.jsxs("div",{style:ee.legendItem,children:[e.jsx("span",{style:{...ee.dot,background:"#FACC15"}})," Current amount"]}),e.jsxs("div",{style:ee.legendItem,children:[e.jsx("span",{style:{...ee.dot,background:"#3B82F6"}})," Computed amount"]}),e.jsxs("div",{style:ee.legendItem,children:[e.jsx("span",{style:{...ee.dot,background:"#22C55E"}})," Optimal target"]})]})]})]}),e.jsxs("div",{style:ee.codeSection,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"},children:[e.jsx("h3",{style:{margin:0,fontSize:"1.2rem",color:"#1E293B",fontWeight:"800"},children:"Algorithm Implementation"}),e.jsx("div",{style:{display:"flex",gap:"8px"},children:["python","javascript","cpp"].map(C=>e.jsx("button",{onClick:()=>R(C),style:{...ee.langBtn,background:x===C?"#4F46E5":"#F1F5F9",color:x===C?"white":"#64748B"},children:C==="cpp"?"C++":C.charAt(0).toUpperCase()+C.slice(1)},C))})]}),e.jsx("pre",{style:ee.codeBlock,children:e.jsx("code",{children:Qt[x]})})]}),e.jsxs("div",{style:{...ee.card,marginTop:"24px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{margin:"0 0 8px 0",color:"#1E293B"},children:"Knowledge Check"}),e.jsx("p",{style:{margin:0,color:"#64748B",fontSize:"0.95rem"},children:"Test your understanding of the Coin Change DP algorithm."})]}),e.jsx("button",{onClick:()=>L(!T),style:{...ee.langBtn,background:T?"#64748B":"#4F46E5",color:"white"},children:T?"Hide Quiz":"Take Quiz"})]}),e.jsx(ie,{children:T&&e.jsx(I.div,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},style:{overflow:"hidden"},children:e.jsxs("div",{style:{marginTop:"24px",display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(Me,{q:"1. Why do we initialize the DP array to Infinity (or a large number) except for dp[0]?",o:["Because we do not know the answer strictly yet","To represent amount 0 needing 0 coins, while setting other amounts to an unachieved high bounds for minimum comparisons","To avoid index out of bounds errors during coin deduction","To save memory space"],a:1}),e.jsx(Me,{q:"2. During tabulation, for a given amount i and coin c, what is the recursive relation?",o:["dp[i] = dp[i] + c","dp[i] = min(dp[i], dp[i-c] + 1)","dp[i] = dp[i-1] + c","dp[i] = min(dp[i-c], 1)"],a:1}),e.jsx(Me,{q:"3. Is Coin Change a variation of the Knapsack problem?",o:["Yes, it is closely related to the Unbounded Knapsack problem since coins can be used infinitely","No, they have no relation","Yes, it is the exact same as 0/1 Knapsack","No, it is a greedy-only problem"],a:0})]})})})]})]})},Me=({q:t,o:i,a:l})=>{const[u,n]=o.useState(null);return e.jsxs("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"12px",border:"1px solid #E2E8F0"},children:[e.jsx("h4",{style:{margin:"0 0 12px 0",color:"#1E293B",fontSize:"1rem"},children:t}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:i.map((a,c)=>e.jsxs("button",{onClick:()=>n(c),style:{padding:"10px 16px",textAlign:"left",borderRadius:"8px",border:u===c?c===l?"2px solid #22C55E":"2px solid #EF4444":"2px solid transparent",background:u===c?c===l?"#DCFCE7":"#FEE2E2":"#FFF",color:"#1E293B",cursor:"pointer",transition:"all 0.2s",boxShadow:"0 2px 4px rgba(0,0,0,0.02)"},children:[a,u===c&&c===l&&e.jsx("span",{style:{float:"right"},children:"✅ Correct"}),u===c&&c!==l&&e.jsx("span",{style:{float:"right"},children:"❌ Incorrect"})]},c))})]})},ee={container:{fontFamily:"system-ui, sans-serif"},card:{background:"white",borderRadius:"16px",padding:"24px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)",marginBottom:"24px"},title:{fontSize:"1.5rem",fontWeight:"800",color:"#1e293b",margin:"0 0 12px 0"},desc:{fontSize:"1rem",color:"#64748B",lineHeight:"1.6",margin:0},modeBtn:{padding:"10px 20px",borderRadius:"999px",border:"none",fontWeight:"700",cursor:"pointer",transition:"all 0.2s",fontSize:"0.95rem"},visualizer:{background:"white",borderRadius:"16px",padding:"28px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)",marginBottom:"24px",display:"flex",flexWrap:"wrap",gap:"20px"},messageBox:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",fontSize:"1rem",fontWeight:"600",marginBottom:"10px",textAlign:"center",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 6px rgba(0,0,0,0.1)"},controlsRow:{display:"flex",gap:"10px",flexWrap:"wrap",justifyContent:"center"},btn:t=>({background:t,color:"white",border:"none",borderRadius:"8px",padding:"12px 18px",fontWeight:"700",cursor:"pointer",opacity:.95,fontSize:"0.95rem"}),legend:{display:"flex",gap:"16px",flexWrap:"wrap",background:"#F8FAFC",padding:"12px",borderRadius:"8px",border:"1px solid #E2E8F0",marginTop:"10px",justifyContent:"center"},legendItem:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.85rem",color:"#64748B",fontWeight:"600"},dot:{width:"12px",height:"12px",borderRadius:"4px"},codeSection:{background:"white",borderRadius:"16px",padding:"24px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)"},langBtn:{padding:"8px 16px",borderRadius:"8px",border:"none",fontWeight:"700",cursor:"pointer",transition:"all 0.2s",fontSize:"0.85rem"},codeBlock:{background:"#0F172A",color:"#E2E8F0",padding:"20px",borderRadius:"12px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",margin:0,fontFamily:"monospace"}},Qt={python:`def coinChange(coins: list[int], amount: int) -> int:
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
}`},Fe=t=>new Promise(i=>setTimeout(i,t)),Ae=[{id:1,name:"Compass",weight:1,value:15},{id:2,name:"Tent",weight:3,value:20},{id:3,name:"Rations",weight:4,value:30}],le=5,Ut=()=>{const[t,i]=o.useState("play"),[l,u]=o.useState([]),n=l.reduce((j,A)=>j+A.weight,0),a=l.reduce((j,A)=>j+A.value,0),[c,S]=o.useState("Pack your bag! Maximize the value without exceeding capacity 5."),g=Ae.length,[r,p]=o.useState(Array.from({length:g+1},()=>Array(le+1).fill("?"))),[d,w]=o.useState(!1),[F,y]=o.useState({r:null,c:null}),[h,m]=o.useState(null),[f,x]=o.useState("Click Start to trace the Bottom-Up DP table."),R=o.useRef(!1),[T,L]=o.useState("python"),[W,q]=o.useState(!1),v=j=>{if(l.some(k=>k.id===j.id))u(l.filter(k=>k.id!==j.id)),S(`Removed ${j.name}.`);else if(n+j.weight>le)S(`Cannot add ${j.name}. Exceeds capacity!`);else{const k=[...l,j];u(k);const z=k.reduce(($,O)=>$+O.value,0);S(z===45?"Amazing! You found the optimal packing: Value 45.":`Added ${j.name}. Value is now ${z}.`)}},s=()=>{u([]),S("Pack your bag! Maximize the value without exceeding capacity 5.")},b=async()=>{if(d)return;w(!0),R.current=!1;const j=Array.from({length:g+1},()=>Array(le+1).fill("?"));p([...j.map(A=>[...A])]),x("Initialize 0th row and 0th column with 0 (Base Cases).");for(let A=0;A<=g;A++)j[A][0]=0;for(let A=0;A<=le;A++)j[0][A]=0;p([...j.map(A=>[...A])]),await Fe(1500);for(let A=1;A<=g&&!R.current;A++){const k=Ae[A-1];for(let z=1;z<=le&&!R.current;z++){if(y({r:A,c:z}),k.weight<=z){if(x(`Item ${k.name} (w:${k.weight}, v:${k.value}) fits in capacity ${z}.`),await Fe(1e3),R.current)break;const $=k.value+j[A-1][z-k.weight],O=j[A-1][z];if(m({r1:A-1,c1:z-k.weight,r2:A-1,c2:z}),x(`Check best: Take item = ${k.value} + dp[${A-1}][${z-k.weight}] (${j[A-1][z-k.weight]}) = ${$}. OR Leave = dp[${A-1}][${z}] (${O}).`),await Fe(2e3),R.current)break;j[A][z]=Math.max($,O)}else{if(m({r2:A-1,c2:z}),x(`Item ${k.name} (w:${k.weight}) DOES NOT fit in capacity ${z}. Leave it: dp[${A-1}][${z}] (${j[A-1][z]}).`),await Fe(1500),R.current)break;j[A][z]=j[A-1][z]}m(null),p([...j.map($=>[...$])]),x(`Computed dp[${A}][${z}] = ${j[A][z]}.`),await Fe(500)}}R.current||(y({r:g,c:le}),x(`Finished! The maximum value possible is ${j[g][le]}.`),window.AppProgress&&window.AppProgress.markProblemSolved()),w(!1)},B=()=>{R.current=!0,w(!1),p(Array.from({length:g+1},()=>Array(le+1).fill("?"))),y({r:null,c:null}),m(null),x("Click Start to trace the Bottom-Up DP table.")},C=j=>{d&&(R.current=!0),i(j),j==="play"?s():B()},E=(j,A)=>t==="sim"?j===g&&A===le&&r[j][A]!=="?"&&!d?"#22C55E":F.r===j&&F.c===A?"#FACC15":h&&(h.r1===j&&h.c1===A||h.r2===j&&h.c2===A)?"#A855F7":r[j][A]!=="?"?"#3B82F6":"#F1F5F9":"#F1F5F9";return e.jsxs("div",{style:J.container,children:[e.jsxs("div",{style:J.card,children:[e.jsx("h3",{style:J.title,children:"0/1 Knapsack — Backpack Packing"}),e.jsxs("p",{style:J.desc,children:["You have a backpack with a limited capacity of ",e.jsxs("strong",{children:[le," lbs"]}),". Choose items to maximize the total value. You can either take an item (1) or leave it (0)."]})]}),e.jsxs("div",{style:{display:"flex",gap:"10px",marginBottom:"20px",justifyContent:"center"},children:[e.jsx("button",{onClick:()=>C("play"),style:{...J.modeBtn,background:t==="play"?"#4F46E5":"#F1F5F9",color:t==="play"?"white":"#1E293B"},children:"Interactive Packing"}),e.jsx("button",{onClick:()=>C("sim"),style:{...J.modeBtn,background:t==="sim"?"#4F46E5":"#F1F5F9",color:t==="sim"?"white":"#1E293B"},children:"Algorithm Visualization"})]}),e.jsxs("div",{style:J.visualizer,children:[e.jsxs("div",{style:{flex:"1 1 350px",display:"flex",flexDirection:"column",gap:"20px",paddingRight:"20px",borderRight:"2px dashed #E2E8F0"},children:[e.jsxs("div",{style:{background:"#1E293B",borderRadius:"16px",padding:"24px",display:"flex",flexDirection:"column",alignItems:"center",boxShadow:"0 8px 16px rgba(0,0,0,0.1)"},children:[e.jsxs("div",{style:{fontSize:"3rem",position:"relative"},children:["🎒",e.jsxs("div",{style:{position:"absolute",top:"-10px",right:"-15px",background:"#EF4444",color:"white",borderRadius:"50%",width:"30px",height:"30px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem",fontWeight:"bold"},children:[n,"/",le]})]}),e.jsx("div",{style:{width:"100%",height:"20px",background:"#334155",borderRadius:"10px",marginTop:"15px",overflow:"hidden"},children:e.jsx(I.div,{style:{height:"100%",background:n>le?"#EF4444":"#10B981"},initial:{width:0},animate:{width:`${Math.min(100,n/le*100)}%`},transition:{type:"spring",stiffness:100}})}),e.jsxs("div",{style:{color:"#FACC15",marginTop:"10px",fontSize:"1.2rem",fontWeight:"bold"},children:["Total Value: ",a]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"10px"},children:[e.jsx("h4",{style:{margin:"0",color:"#64748B",fontSize:"1rem"},children:"Available Items"}),Ae.map(j=>{const A=l.some(k=>k.id===j.id);return e.jsxs(I.div,{onClick:()=>t==="play"&&v(j),whileHover:t==="play"?{scale:1.02,backgroundColor:"#F8FAFC"}:{},whileTap:t==="play"?{scale:.98}:{},style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:A?"#DCFCE7":"white",border:A?"2px solid #22C55E":"2px solid #E2E8F0",borderRadius:"12px",cursor:t==="play"?"pointer":"default",transition:"all 0.2s",opacity:t==="sim"&&F.r!==null&&F.r>0&&F.r!==j.id?.3:1},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[e.jsx("span",{style:{fontWeight:"bold",color:"#1E293B"},children:j.name}),e.jsxs("span",{style:{fontSize:"0.85rem",color:"#64748B"},children:["Weight: ",j.weight," lbs"]})]}),e.jsxs("div",{style:{fontWeight:"800",color:"#F59E0B",fontSize:"1.1rem"},children:["Value: ",j.value]}),A&&e.jsx("div",{style:{color:"#22C55E",fontWeight:"bold"},children:"In Bag ✓"})]},j.id)})]})]}),e.jsxs("div",{style:{flex:"1 1 400px",display:"flex",flexDirection:"column",paddingLeft:"20px",gap:"20px"},children:[e.jsx("div",{style:J.messageBox,children:t==="play"?c:f}),e.jsx("div",{style:J.controlsRow,children:t==="play"?e.jsx(I.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:s,style:J.btn("#EF4444"),children:"Empty Backpack"}):e.jsxs(e.Fragment,{children:[e.jsx(I.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:b,disabled:d,style:J.btn("#4F46E5"),children:"▶ Start Animation"}),e.jsx(I.button,{whileHover:{scale:1.05},whileTap:{scale:.95},onClick:B,style:J.btn("#EF4444"),children:"↺ Reset"})]})}),e.jsxs("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"12px",border:"1px solid #E2E8F0",flexGrow:1,overflowX:"auto"},children:[e.jsx("h4",{style:{margin:"0 0 16px 0",fontSize:"1rem",color:"#1E293B"},children:"DP Table: Items (Rows) × Capacity (Cols)"}),e.jsxs("table",{style:{borderCollapse:"collapse",width:"100%",textAlign:"center"},children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{style:{padding:"8px",borderBottom:"2px solid #CBD5E1",color:"#64748B"},children:"Item \\ Cap"}),[...Array(le+1).keys()].map(j=>e.jsx("th",{style:{padding:"8px",borderBottom:"2px solid #CBD5E1",color:"#1E293B"},children:j},j))]})}),e.jsx("tbody",{children:[...Array(g+1).keys()].map(j=>e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"8px",borderRight:"2px solid #CBD5E1",fontWeight:"bold",color:"#1E293B"},children:j===0?"0 (None)":`${Ae[j-1].name} (v${Ae[j-1].value})`}),[...Array(le+1).keys()].map(A=>e.jsx("td",{style:{padding:"4px"},children:e.jsx(I.div,{layout:!0,style:{width:"100%",height:"35px",display:"flex",alignItems:"center",justifyContent:"center",background:E(j,A),borderRadius:"6px",border:"1px solid #CBD5E1",fontWeight:"800",color:r[j][A]==="?"?"#94A3B8":E(j,A)==="#22C55E"?"white":"#1E293B",transition:"background-color 0.3s"},children:r[j][A]})},A))]},j))})]})]}),e.jsxs("div",{style:J.legend,children:[e.jsxs("div",{style:J.legendItem,children:[e.jsx("span",{style:{...J.dot,background:"#FACC15"}})," Current cell calculating"]}),e.jsxs("div",{style:J.legendItem,children:[e.jsx("span",{style:{...J.dot,background:"#A855F7"}})," Depending subproblem"]}),e.jsxs("div",{style:J.legendItem,children:[e.jsx("span",{style:{...J.dot,background:"#3B82F6"}})," Computed"]}),e.jsxs("div",{style:J.legendItem,children:[e.jsx("span",{style:{...J.dot,background:"#22C55E"}})," Optimal Maximum"]})]})]})]}),e.jsxs("div",{style:J.codeSection,children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"},children:[e.jsx("h3",{style:{margin:0,fontSize:"1.2rem",color:"#1E293B",fontWeight:"800"},children:"Algorithm Implementation"}),e.jsx("div",{style:{display:"flex",gap:"8px"},children:["python","javascript","cpp"].map(j=>e.jsx("button",{onClick:()=>L(j),style:{...J.langBtn,background:T===j?"#4F46E5":"#F1F5F9",color:T===j?"white":"#64748B"},children:j==="cpp"?"C++":j.charAt(0).toUpperCase()+j.slice(1)},j))})]}),e.jsx("pre",{style:J.codeBlock,children:e.jsx("code",{children:Xt[T]})})]}),e.jsxs("div",{style:{...J.card,marginTop:"24px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{children:[e.jsx("h3",{style:{margin:"0 0 8px 0",color:"#1E293B"},children:"Knowledge Check"}),e.jsx("p",{style:{margin:0,color:"#64748B",fontSize:"0.95rem"},children:"Test your understanding of the 0/1 Knapsack problem."})]}),e.jsx("button",{onClick:()=>q(!W),style:{...J.langBtn,background:W?"#64748B":"#4F46E5",color:"white"},children:W?"Hide Quiz":"Take Quiz"})]}),e.jsx(ie,{children:W&&e.jsx(I.div,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},style:{overflow:"hidden"},children:e.jsxs("div",{style:{marginTop:"24px",display:"flex",flexDirection:"column",gap:"16px"},children:[e.jsx(De,{q:"1. What does the '0/1' in 0/1 Knapsack mean?",o:["You can either have 0 pounds or 1 pound of weight","You can either completely exclude (0) or completely include (1) an item, no fractions allowed","The matrix dimensions start at 0 and end at 1","The items have values of 0 or 1"],a:1}),e.jsx(De,{q:"2. Why is a 2D array typically used for this DP solution instead of a 1D array?",o:["Because the problem is too complex","Because we must track two varying state parameters: the subset of items considered so far, and the remaining capacity","Just to match the math formula visualization","Because JavaScript needs 2D arrays to be fast"],a:1}),e.jsx(De,{q:"3. In the recurrence relation: Math.max(takeVal, leaveVal), what does leaveVal represent?",o:["dp[i][w-1] (previous capacity)","dp[i-1][w] (the optimal value using previous items at the same capacity)","dp[i-1][w-weight] (the value without capacity limit)","0"],a:1})]})})})]})]})},De=({q:t,o:i,a:l})=>{const[u,n]=o.useState(null);return e.jsxs("div",{style:{background:"#F8FAFC",padding:"16px",borderRadius:"12px",border:"1px solid #E2E8F0"},children:[e.jsx("h4",{style:{margin:"0 0 12px 0",color:"#1E293B",fontSize:"1rem"},children:t}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:i.map((a,c)=>e.jsxs("button",{onClick:()=>n(c),style:{padding:"10px 16px",textAlign:"left",borderRadius:"8px",border:u===c?c===l?"2px solid #22C55E":"2px solid #EF4444":"2px solid transparent",background:u===c?c===l?"#DCFCE7":"#FEE2E2":"#FFF",color:"#1E293B",cursor:"pointer",transition:"all 0.2s",boxShadow:"0 2px 4px rgba(0,0,0,0.02)"},children:[a,u===c&&c===l&&e.jsx("span",{style:{float:"right"},children:"✅ Correct"}),u===c&&c!==l&&e.jsx("span",{style:{float:"right"},children:"❌ Incorrect"})]},c))})]})},J={container:{fontFamily:"system-ui, sans-serif"},card:{background:"white",borderRadius:"16px",padding:"24px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)",marginBottom:"24px"},title:{fontSize:"1.5rem",fontWeight:"800",color:"#1e293b",margin:"0 0 12px 0"},desc:{fontSize:"1rem",color:"#64748B",lineHeight:"1.6",margin:0},modeBtn:{padding:"10px 20px",borderRadius:"999px",border:"none",fontWeight:"700",cursor:"pointer",transition:"all 0.2s",fontSize:"0.95rem"},visualizer:{background:"white",borderRadius:"16px",padding:"28px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)",marginBottom:"24px",display:"flex",flexWrap:"wrap",gap:"20px"},messageBox:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",fontSize:"1rem",fontWeight:"600",marginBottom:"10px",textAlign:"center",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 4px 6px rgba(0,0,0,0.1)"},controlsRow:{display:"flex",gap:"10px",flexWrap:"wrap",justifyContent:"center"},btn:t=>({background:t,color:"white",border:"none",borderRadius:"8px",padding:"12px 18px",fontWeight:"700",cursor:"pointer",opacity:.95,fontSize:"0.95rem"}),legend:{display:"flex",gap:"16px",flexWrap:"wrap",background:"#F8FAFC",padding:"12px",borderRadius:"8px",border:"1px solid #E2E8F0",marginTop:"10px",justifyContent:"center"},legendItem:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.85rem",color:"#64748B",fontWeight:"600"},dot:{width:"12px",height:"12px",borderRadius:"4px"},codeSection:{background:"white",borderRadius:"16px",padding:"24px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)"},langBtn:{padding:"8px 16px",borderRadius:"8px",border:"none",fontWeight:"700",cursor:"pointer",transition:"all 0.2s",fontSize:"0.85rem"},codeBlock:{background:"#0F172A",color:"#E2E8F0",padding:"20px",borderRadius:"12px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",margin:0,fontFamily:"monospace"}},Xt={python:`def knapsack(weights, values, capacity):
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
}`},Yt=({n:t=5})=>{const[i,l]=o.useState(Array(t+1).fill(0)),[u,n]=o.useState(0),[a,c]=o.useState(!1),[S,g]=o.useState('Click "Start" to see how we build the solution.'),r=()=>{l(Array(t+1).fill(0)),n(0),c(!1),g('Click "Start" to see how we build the solution.')},p=()=>{if(u>t)return;let d=[...i],w="";u===0?(d[0]=1,w="Base Case: There is 1 way to stay at step 0 (do nothing)."):u===1?(d[1]=1,w="Base Case: There is 1 way to reach step 1 (one 1-step)."):(d[u]=d[u-1]+d[u-2],w=`Step ${u}: Sum of ways to reach step ${u-1} (${d[u-1]}) and step ${u-2} (${d[u-2]}) = ${d[u]}.`),l(d),g(w),n(u+1),u===t&&c(!1)};return o.useEffect(()=>{let d;return a&&u<=t?d=setInterval(p,1e3):c(!1),()=>clearInterval(d)},[a,u]),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[e.jsx("div",{style:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center"},children:S}),e.jsx("div",{style:{display:"flex",gap:"10px",flexWrap:"wrap",justifyContent:"center"},children:i.map((d,w)=>e.jsxs(I.div,{initial:{scale:.8,opacity:0},animate:{scale:u-1===w?1.1:1,opacity:1,backgroundColor:u-1===w?"#FACC15":d>0?"#3B82F6":"#F1F5F9",color:d>0||u-1===w?"white":"#64748B"},style:{width:"60px",height:"60px",borderRadius:"10px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontWeight:"700",border:"1px solid #E2E8F0",boxShadow:u-1===w?"0 0 15px rgba(250, 204, 21, 0.5)":"none"},children:[e.jsxs("span",{style:{fontSize:"0.7rem",marginBottom:"2px"},children:["dp[",w,"]"]}),e.jsx("span",{style:{fontSize:"1.2rem"},children:d===0&&w>u-1?"?":d})]},w))}),e.jsxs("div",{style:{display:"flex",gap:"12px",justifyContent:"center"},children:[e.jsx("button",{onClick:()=>c(!0),disabled:a||u>t,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer",opacity:a||u>t?.6:1},children:"Start Animation"}),e.jsx("button",{onClick:p,disabled:a||u>t,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer",opacity:a||u>t?.6:1},children:"Next Step"}),e.jsx("button",{onClick:r,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer"},children:"Reset"})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"center",gap:"20px",marginTop:"10px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.85rem",color:"#64748B"},children:[e.jsx("div",{style:{width:"12px",height:"12px",borderRadius:"3px",background:"#FACC15"}})," Current"]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px",fontSize:"0.85rem",color:"#64748B"},children:[e.jsx("div",{style:{width:"12px",height:"12px",borderRadius:"3px",background:"#3B82F6"}})," Computed"]})]})]})},Jt=()=>{const t=[1,2,5],i=11,[l,u]=o.useState(Array(i+1).fill(1/0)),[n,a]=o.useState(0),[c,S]=o.useState(!1),[g,r]=o.useState("Amount 0 requires 0 coins (Base Case)."),[p,d]=o.useState(null);o.useEffect(()=>{let y=Array(i+1).fill(1/0);y[0]=0,u(y)},[]);const w=()=>{let y=Array(i+1).fill(1/0);y[0]=0,u(y),a(0),S(!1),r("Amount 0 requires 0 coins (Base Case)."),d(null)},F=()=>{if(n>=i)return;let y=n+1,h=[...l],m=1/0,f=null;for(let x of t)y-x>=0&&l[y-x]+1<m&&(m=l[y-x]+1,f=x);h[y]=m,u(h),d(f),r(`Amount ${y}: Min coins = min(${t.filter(x=>y-x>=0).map(x=>`dp[${y-x}]+1`).join(", ")}) = ${m}.`),a(y),y===i&&S(!1)};return o.useEffect(()=>{let y;return c&&n<i?y=setInterval(F,1e3):S(!1),()=>clearInterval(y)},[c,n]),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[e.jsx("div",{style:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center"},children:g}),e.jsx("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap",justifyContent:"center"},children:l.map((y,h)=>e.jsxs(I.div,{animate:{scale:n===h?1.1:1,backgroundColor:n===h?"#FACC15":y!==1/0?"#3B82F6":"#F1F5F9",color:y!==1/0||n===h?"white":"#64748B"},style:{width:"45px",height:"55px",borderRadius:"8px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontWeight:"700",border:"1px solid #E2E8F0",fontSize:"0.9rem"},children:[e.jsxs("span",{style:{fontSize:"0.6rem"},children:["amt:",h]}),e.jsx("span",{children:y===1/0?"∞":y})]},h))}),e.jsxs("div",{style:{display:"flex",gap:"12px",justifyContent:"center"},children:[e.jsx("button",{onClick:()=>S(!0),disabled:c||n>=i,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer",opacity:c||n>=i?.6:1},children:"Start Animation"}),e.jsx("button",{onClick:F,disabled:c||n>=i,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer",opacity:c||n>=i?.6:1},children:"Next Step"}),e.jsx("button",{onClick:w,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer"},children:"Reset"})]}),e.jsx("div",{style:{display:"flex",justifyContent:"center",gap:"15px"},children:t.map(y=>e.jsx("div",{style:{width:"30px",height:"30px",borderRadius:"50%",background:"#F59E0B",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.8rem",fontWeight:"bold"},children:y},y))})]})},Zt=()=>{const t=[2,7,9,3,1],i=t.length,[l,u]=o.useState(Array(i+1).fill(0)),[n,a]=o.useState(1),[c,S]=o.useState(!1),[g,r]=o.useState("Initially, no money is robbed."),[p,d]=o.useState(null),w=()=>{u(Array(i+1).fill(0)),a(1),S(!1),r("Initially, no money is robbed."),d(null)},F=()=>{if(n>i)return;let y=[...l],h=t[n-1],m=h+(n>=2?l[n-2]:0),f=l[n-1];m>=f?(y[n]=m,d("rob"),r(`House ${n} ($${h}): Robbing is better! $${h} + prev loot $${n>=2?l[n-2]:0} = $${m}.`)):(y[n]=f,d("skip"),r(`House ${n} ($${h}): Skipping is better! Keep prev loot $${f}.`)),u(y),a(n+1),n===i&&S(!1)};return o.useEffect(()=>{let y;return c&&n<=i?y=setInterval(F,1200):S(!1),()=>clearInterval(y)},[c,n]),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[e.jsx("div",{style:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center"},children:g}),e.jsx("div",{style:{display:"flex",gap:"12px",justifyContent:"center",alignItems:"flex-end",height:"100px"},children:t.map((y,h)=>e.jsxs(I.div,{animate:{scale:n-1===h?1.1:1,borderColor:n-1===h?"#FACC15":"#E2E8F0",backgroundColor:n-1===h?"#FEF9C3":"white"},style:{width:"50px",height:40+y*5,border:"2px solid",borderRadius:"8px 8px 0 0",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative"},children:[e.jsx("span",{style:{fontSize:"1.2rem"},children:"🏠"}),e.jsxs("span",{style:{fontSize:"0.8rem",fontWeight:"bold"},children:["$",y]}),n-1===h&&p==="rob"&&e.jsx(I.span,{initial:{y:-20,opacity:0},animate:{y:0,opacity:1},style:{position:"absolute",top:"-30px",fontSize:"1.5rem"},children:"💰"})]},h))}),e.jsx("div",{style:{display:"flex",gap:"8px",justifyContent:"center"},children:l.map((y,h)=>e.jsxs(I.div,{animate:{backgroundColor:n===h?"#FACC15":y>0||h===0?"#3B82F6":"#F1F5F9",color:"white"},style:{width:"45px",height:"45px",borderRadius:"8px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontWeight:"700",fontSize:"0.8rem"},children:[e.jsxs("span",{style:{fontSize:"0.6rem"},children:["dp[",h,"]"]}),e.jsx("span",{children:y})]},h))}),e.jsxs("div",{style:{display:"flex",gap:"12px",justifyContent:"center"},children:[e.jsx("button",{onClick:()=>S(!0),disabled:c||n>i,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer",opacity:c||n>i?.6:1},children:"Start Animation"}),e.jsx("button",{onClick:F,disabled:c||n>i,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer",opacity:c||n>i?.6:1},children:"Next Step"}),e.jsx("button",{onClick:w,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer"},children:"Reset"})]})]})},er=()=>{const t=[10,2,5,3,7,101],i=t.length,[l,u]=o.useState(Array(i).fill(1)),[n,a]=o.useState(0),[c,S]=o.useState(-1),[g,r]=o.useState(!1),[p,d]=o.useState("Each element starts as a sequence of length 1."),w=()=>{u(Array(i).fill(1)),a(0),S(-1),r(!1),d("Each element starts as a sequence of length 1.")},F=()=>{if(n>=i)return;let y=n,h=c+1,m=[...l],f="";if(h>=y&&(y=n+1,h=0,y>=i)){r(!1),d(`Finished! Longest Increasing Subsequence length is ${Math.max(...l)}.`);return}t[y]>t[h]?l[h]+1>m[y]?(m[y]=l[h]+1,f=`nums[${y}] (${t[y]}) > nums[${h}] (${t[h]}). Updated dp[${y}] to ${m[y]}.`):f=`nums[${y}] (${t[y]}) > nums[${h}] (${t[h]}) but no improvement.`:f=`nums[${y}] (${t[y]}) <= nums[${h}] (${t[h]}). Move on.`,a(y),S(h),u(m),d(f)};return o.useEffect(()=>{let y;return g&&n<i?y=setInterval(F,800):r(!1),()=>clearInterval(y)},[g,n,c]),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[e.jsx("div",{style:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center"},children:p}),e.jsx("div",{style:{display:"flex",gap:"10px",justifyContent:"center"},children:t.map((y,h)=>e.jsxs(I.div,{animate:{scale:n===h?1.1:c===h?1.05:1,boxShadow:n===h?"0 0 10px rgba(250, 204, 21, 0.8)":c===h?"0 0 10px rgba(168, 85, 247, 0.8)":"none",borderColor:n===h?"#FACC15":c===h?"#A855F7":"#E2E8F0"},style:{width:"50px",height:"50px",border:"2px solid",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"bold",background:"white",color:"#1E293B"},children:[y,n===h&&e.jsx("span",{style:{position:"absolute",top:"-25px",fontSize:"0.8rem",color:"#FACC15"},children:"i"}),c===h&&e.jsx("span",{style:{position:"absolute",top:"-25px",fontSize:"0.8rem",color:"#A855F7"},children:"j"})]},h))}),e.jsx("div",{style:{display:"flex",gap:"10px",justifyContent:"center"},children:l.map((y,h)=>e.jsxs(I.div,{animate:{backgroundColor:n===h?"#FACC15":y>1?"#3B82F6":"#F1F5F9",color:y>1||n===h?"white":"#64748B"},style:{width:"50px",height:"40px",borderRadius:"6px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontWeight:"700",fontSize:"0.8rem"},children:[e.jsxs("span",{style:{fontSize:"0.6rem"},children:["dp[",h,"]"]}),e.jsx("span",{children:y})]},h))}),e.jsxs("div",{style:{display:"flex",gap:"12px",justifyContent:"center"},children:[e.jsx("button",{onClick:()=>r(!0),disabled:g||n>=i,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer",opacity:g||n>=i?.6:1},children:"Start Animation"}),e.jsx("button",{onClick:F,disabled:g||n>=i,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer",opacity:g||n>=i?.6:1},children:"Next Step"}),e.jsx("button",{onClick:w,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer"},children:"Reset"})]})]})},tr=()=>{const t="ABCDE",l=t.length,u=3,[n,a]=o.useState(Array.from({length:l+1},()=>Array(u+1).fill(0))),[c,S]=o.useState(1),[g,r]=o.useState(1),[p,d]=o.useState(!1),[w,F]=o.useState("Fill 2D table: Match = Diagonal + 1, Mismatch = Max(Top, Left)."),y=()=>{a(Array.from({length:l+1},()=>Array(u+1).fill(0))),S(1),r(1),d(!1),F("Fill 2D table: Match = Diagonal + 1, Mismatch = Max(Top, Left).")},h=()=>{if(c>l)return;let m=n.map(T=>[...T]),f="";t[c-1]==="ACE"[g-1]?(m[c][g]=n[c-1][g-1]+1,f=`Match! ${t[c-1]} === ${"ACE"[g-1]}. dp[${c}][${g}] = dp[${c-1}][${g-1}] + 1 = ${m[c][g]}.`):(m[c][g]=Math.max(n[c-1][g],n[c][g-1]),f=`Mismatch! ${t[c-1]} != ${"ACE"[g-1]}. dp[${c}][${g}] = max(dp[${c-1}][${g}], dp[${c}][${g-1}]) = ${m[c][g]}.`),a(m),F(f);let x=g+1,R=c;x>u&&(x=1,R=c+1),S(R),r(x),R>l&&(d(!1),F(`Finished! LCS length is ${m[l][u]}.`))};return o.useEffect(()=>{let m;return p&&c<=l?m=setInterval(h,1e3):d(!1),()=>clearInterval(m)},[p,c,g]),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[e.jsx("div",{style:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center"},children:w}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{borderCollapse:"collapse",margin:"0 auto"},children:[e.jsxs("thead",{children:[e.jsxs("tr",{children:[e.jsx("th",{}),e.jsx("th",{}),"ACE".split("").map((m,f)=>e.jsx("th",{style:{padding:"8px",color:"#4F46E5",fontWeight:"800"},children:m},f))]}),e.jsxs("tr",{children:[e.jsx("th",{}),e.jsx("th",{style:{padding:"8px",border:"1px solid #E2E8F0",background:"#F8FAFC"},children:"0"}),"ACE".split("").map((m,f)=>e.jsx("th",{style:{padding:"8px",border:"1px solid #E2E8F0",background:"#F8FAFC"},children:f+1},f))]})]}),e.jsx("tbody",{children:n.map((m,f)=>e.jsxs("tr",{children:[e.jsx("th",{style:{padding:"8px",color:"#4F46E5",fontWeight:"800"},children:f===0?"":t[f-1]}),m.map((x,R)=>e.jsx(I.td,{animate:{backgroundColor:c===f&&g===R?"#FACC15":f>0&&R>0&&x>0?"#DCFCE7":"white",borderColor:c===f&&g===R?"#FACC15":"#E2E8F0"},style:{border:"1px solid",width:"40px",height:"40px",textAlign:"center",fontWeight:"bold",fontSize:"0.9rem"},children:x},R))]},f))})]})}),e.jsxs("div",{style:{display:"flex",gap:"12px",justifyContent:"center"},children:[e.jsx("button",{onClick:()=>d(!0),disabled:p||c>l,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer",opacity:p||c>l?.6:1},children:"Start Animation"}),e.jsx("button",{onClick:h,disabled:p||c>l,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer",opacity:p||c>l?.6:1},children:"Next Step"}),e.jsx("button",{onClick:y,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer"},children:"Reset"})]})]})},rr=()=>{const[n,a]=o.useState(()=>{let m=Array.from({length:4},()=>Array(4).fill(0));for(let f=0;f<=3;f++)m[f][0]=f;for(let f=0;f<=3;f++)m[0][f]=f;return m}),[c,S]=o.useState(1),[g,r]=o.useState(1),[p,d]=o.useState(!1),[w,F]=o.useState("Init first row/col: Distance from empty string."),y=()=>{let m=Array.from({length:4},()=>Array(4).fill(0));for(let f=0;f<=3;f++)m[f][0]=f;for(let f=0;f<=3;f++)m[0][f]=f;a(m),S(1),r(1),d(!1),F("Init first row/col: Distance from empty string.")},h=()=>{if(c>3)return;let m=n.map(T=>[...T]),f="";if("CAT"[c-1]==="CUT"[g-1])m[c][g]=n[c-1][g-1],f=`Same character! ${"CAT"[c-1]} === ${"CUT"[g-1]}. dp[${c}][${g}] = dp[${c-1}][${g-1}] = ${m[c][g]}.`;else{let T=n[c-1][g-1],L=n[c][g-1],W=n[c-1][g];m[c][g]=1+Math.min(T,L,W),f=`Different! ${"CAT"[c-1]} != ${"CUT"[g-1]}. dp[${c}][${g}] = 1 + min(replace:${T}, insert:${L}, delete:${W}) = ${m[c][g]}.`}a(m),F(f);let x=g+1,R=c;x>3&&(x=1,R=c+1),S(R),r(x),R>3&&(d(!1),F(`Finished! Edit Distance is ${m[3][3]}.`))};return o.useEffect(()=>{let m;return p&&c<=3?m=setInterval(h,1e3):d(!1),()=>clearInterval(m)},[p,c,g]),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[e.jsx("div",{style:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center"},children:w}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{borderCollapse:"collapse",margin:"0 auto"},children:[e.jsxs("thead",{children:[e.jsxs("tr",{children:[e.jsx("th",{}),e.jsx("th",{}),"CUT".split("").map((m,f)=>e.jsx("th",{style:{padding:"8px",color:"#4F46E5",fontWeight:"800"},children:m},f))]}),e.jsxs("tr",{children:[e.jsx("th",{}),Array.from({length:4}).map((m,f)=>e.jsx("th",{style:{padding:"8px",border:"1px solid #E2E8F0",background:"#F8FAFC"},children:f},f))]})]}),e.jsx("tbody",{children:n.map((m,f)=>e.jsxs("tr",{children:[e.jsx("th",{style:{padding:"8px",color:"#4F46E5",fontWeight:"800"},children:f===0?"":"CAT"[f-1]}),m.map((x,R)=>e.jsx(I.td,{animate:{backgroundColor:c===f&&g===R?"#FACC15":f>0&&R>0?"CAT"[f-1]==="CUT"[R-1]?"#DCFCE7":"#EFF6FF":"#F8FAFC",borderColor:c===f&&g===R?"#FACC15":"#E2E8F0"},style:{border:"1px solid",width:"40px",height:"40px",textAlign:"center",fontWeight:"bold",fontSize:"0.9rem"},children:x},R))]},f))})]})}),e.jsxs("div",{style:{display:"flex",gap:"12px",justifyContent:"center"},children:[e.jsx("button",{onClick:()=>d(!0),disabled:p||c>3,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer",opacity:p||c>3?.6:1},children:"Start Animation"}),e.jsx("button",{onClick:h,disabled:p||c>3,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer",opacity:p||c>3?.6:1},children:"Next Step"}),e.jsx("button",{onClick:y,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer"},children:"Reset"})]})]})},ir=()=>{const t=[1,5,11,5],i=11,l=t.length,[u,n]=o.useState(()=>{let h=Array.from({length:l+1},()=>Array(i+1).fill(!1));for(let m=0;m<=l;m++)h[m][0]=!0;return h}),[a,c]=o.useState(1),[S,g]=o.useState(1),[r,p]=o.useState(!1),[d,w]=o.useState("Subset sum of 0 is always possible (true)."),F=()=>{let h=Array.from({length:l+1},()=>Array(i+1).fill(!1));for(let m=0;m<=l;m++)h[m][0]=!0;n(h),c(1),g(1),p(!1),w("Subset sum of 0 is always possible (true).")},y=()=>{if(a>l)return;let h=u.map(T=>[...T]),m="",f=t[a-1];f<=S?(h[a][S]=u[a-1][S]||u[a-1][S-f],m=`Item ${f} fits in target ${S}. dp[${a}][${S}] = dp[${a-1}][${S}] (skip) || dp[${a-1}][${S-f}] (take) = ${h[a][S]?"TRUE":"FALSE"}.`):(h[a][S]=u[a-1][S],m=`Item ${f} too big for target ${S}. dp[${a}][${S}] = dp[${a-1}][${S}] (skip) = ${h[a][S]?"TRUE":"FALSE"}.`),n(h),w(m);let x=S+1,R=a;x>i&&(x=1,R=a+1),c(R),g(x),R>l&&(p(!1),w(`Finished! Target sum ${i} is ${h[l][i]?"POSSIBLE":"IMPOSSIBLE"}.`))};return o.useEffect(()=>{let h;return r&&a<=l?h=setInterval(y,600):p(!1),()=>clearInterval(h)},[r,a,S]),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[e.jsx("div",{style:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center"},children:d}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{borderCollapse:"collapse",margin:"0 auto"},children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{}),Array.from({length:i+1}).map((h,m)=>e.jsx("th",{style:{padding:"6px",border:"1px solid #E2E8F0",background:"#F8FAFC"},children:m},m))]})}),e.jsx("tbody",{children:u.map((h,m)=>e.jsxs("tr",{children:[e.jsx("th",{style:{padding:"6px",color:"#4F46E5",fontWeight:"800"},children:m===0?"None":`${t[m-1]}`}),h.map((f,x)=>e.jsx(I.td,{animate:{backgroundColor:a===m&&S===x?"#FACC15":f?"#DCFCE7":"white",borderColor:a===m&&S===x?"#FACC15":"#E2E8F0"},style:{border:"1px solid",width:"35px",height:"35px",textAlign:"center",fontWeight:"bold",fontSize:"0.7rem"},children:f?"T":"F"},x))]},m))})]})}),e.jsxs("div",{style:{display:"flex",gap:"12px",justifyContent:"center"},children:[e.jsx("button",{onClick:()=>p(!0),disabled:r||a>l,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer",opacity:r||a>l?.6:1},children:"Start Animation"}),e.jsx("button",{onClick:y,disabled:r||a>l,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer",opacity:r||a>l?.6:1},children:"Next Step"}),e.jsx("button",{onClick:F,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer"},children:"Reset"})]})]})},nr=()=>{const t=[{w:1,v:1},{w:2,v:3},{w:3,v:4}],i=5,l=t.length,[u,n]=o.useState(Array.from({length:l+1},()=>Array(i+1).fill(0))),[a,c]=o.useState(1),[S,g]=o.useState(1),[r,p]=o.useState(!1),[d,w]=o.useState("Rows = Items, Cols = Remaining Capacity."),F=()=>{n(Array.from({length:l+1},()=>Array(i+1).fill(0))),c(1),g(1),p(!1),w("Rows = Items, Cols = Remaining Capacity.")},y=()=>{if(a>l)return;let h=u.map(T=>[...T]),m="",f=t[a-1];if(f.w<=S){let T=f.v+u[a-1][S-f.w],L=u[a-1][S];h[a][S]=Math.max(T,L),m=`Item fits! Max(take:${f.v}+dp[${a-1}][${S-f.w}], leave:dp[${a-1}][${S}]) = ${h[a][S]}.`}else h[a][S]=u[a-1][S],m=`Doesn't fit. dp[${a}][${S}] = dp[${a-1}][${S}] = ${h[a][S]}.`;n(h),w(m);let x=S+1,R=a;x>i&&(x=1,R=a+1),c(R),g(x),R>l&&(p(!1),w(`Finished! Max Value possible is ${h[l][i]}.`))};return o.useEffect(()=>{let h;return r&&a<=l?h=setInterval(y,1e3):p(!1),()=>clearInterval(h)},[r,a,S]),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"20px"},children:[e.jsx("div",{style:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center"},children:d}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs("table",{style:{borderCollapse:"collapse",margin:"0 auto"},children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{}),Array.from({length:i+1}).map((h,m)=>e.jsx("th",{style:{padding:"8px",border:"1px solid #E2E8F0",background:"#F8FAFC"},children:m},m))]})}),e.jsx("tbody",{children:u.map((h,m)=>e.jsxs("tr",{children:[e.jsx("th",{style:{padding:"8px",color:"#4F46E5",fontWeight:"800"},children:m===0?"0":`v${t[m-1].v},w${t[m-1].w}`}),h.map((f,x)=>e.jsx(I.td,{animate:{backgroundColor:a===m&&S===x?"#FACC15":m>0&&x>0&&f>0?"#DCFCE7":"white",borderColor:a===m&&S===x?"#FACC15":"#E2E8F0"},style:{border:"1px solid",width:"40px",height:"40px",textAlign:"center",fontWeight:"bold",fontSize:"0.9rem"},children:f},x))]},m))})]})}),e.jsxs("div",{style:{display:"flex",gap:"12px",justifyContent:"center"},children:[e.jsx("button",{onClick:()=>p(!0),disabled:r||a>l,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer",opacity:r||a>l?.6:1},children:"Start Animation"}),e.jsx("button",{onClick:y,disabled:r||a>l,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer",opacity:r||a>l?.6:1},children:"Next Step"}),e.jsx("button",{onClick:F,style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer"},children:"Reset"})]})]})},or=[{id:"climbingstairs",title:"Climbing Stairs",difficulty:"Easy",description:"You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",example:"n = 3 => 3 ways (1+1+1, 1+2, 2+1)",python:`def climbStairs(n: int) -> int:
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
}`,algorithm:"For every item up to the limit capacity, decide if it contributes to the maximum value to either take the item, or leave it behind based on previous solutions."}],nt=t=>{switch(t){case"Easy":return"#22C55E";case"Medium":return"#F59E0B";case"Hard":return"#EF4444";default:return"#64748B"}},sr=()=>{const[t,i]=o.useState(null),[l,u]=o.useState("javascript");return e.jsx("div",{className:"dp-container",children:e.jsxs("div",{className:"dp-split-layout",children:[e.jsxs("div",{className:"dp-left-panel",children:[e.jsxs("div",{style:{marginBottom:"20px"},children:[e.jsx("h3",{style:{margin:"0 0 8px 0",fontSize:"1.5rem",color:"#1E293B",fontWeight:"800"},children:"Practice Problems"}),e.jsx("p",{style:{margin:0,color:"#64748B",fontSize:"1rem",lineHeight:"1.5"},children:"Master Dynamic Programming with these classic coding interview questions."})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"16px",overflowY:"auto"},children:or.map(n=>e.jsxs(I.div,{onClick:()=>i(n),whileHover:{scale:1.02,y:-2},whileTap:{scale:.98},style:{background:"white",borderRadius:"14px",padding:"16px",boxShadow:"0 4px 10px rgba(0,0,0,0.05)",cursor:"pointer",border:t?.id===n.id?"2px solid #4F46E5":"2px solid transparent",transition:"border 0.2s ease",display:"flex",flexDirection:"column",gap:"10px"},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx("h4",{style:{margin:0,color:"#1E293B",fontSize:"1.1rem",fontWeight:"bold"},children:n.title}),e.jsx("span",{style:{background:nt(n.difficulty)+"20",color:nt(n.difficulty),padding:"4px 10px",borderRadius:"999px",fontSize:"0.8rem",fontWeight:"700"},children:n.difficulty})]}),e.jsx("p",{style:{margin:0,color:"#64748B",fontSize:"0.9rem",lineHeight:"1.5",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"},children:n.description})]},n.id))})]}),e.jsx("div",{className:"dp-right-panel",children:e.jsx(ie,{mode:"wait",children:t?e.jsxs(I.div,{initial:{opacity:0,x:20},animate:{opacity:1,x:0},exit:{opacity:0,x:-20},transition:{duration:.3},className:"dp-solution-viewer",children:[e.jsxs("div",{style:{borderBottom:"2px solid #F1F5F9",paddingBottom:"20px",marginBottom:"20px"},children:[e.jsx("h2",{style:{margin:"0 0 10px 0",fontSize:"1.8rem",color:"#1E293B",fontWeight:"800"},children:t.title}),e.jsx("p",{style:{margin:"0 0 16px 0",color:"#475569",fontSize:"1.05rem",lineHeight:"1.6"},children:t.description}),e.jsxs("div",{style:{background:"#F8FAFC",padding:"12px 16px",borderRadius:"8px",borderLeft:"4px solid #4F46E5"},children:[e.jsx("span",{style:{fontWeight:"bold",color:"#1E293B"},children:"Example: "}),e.jsx("code",{style:{color:"#4F46E5",fontFamily:"monospace",fontSize:"0.95rem"},children:t.example})]})]}),e.jsxs("div",{style:{marginBottom:"24px"},children:[e.jsx("h3",{style:{margin:"0 0 16px 0",fontSize:"1.3rem",color:"#1E293B"},children:"Visualization & Animation"}),e.jsxs("div",{style:{background:"#F8FAFC",padding:"24px",borderRadius:"16px",border:"1px solid #E2E8F0",boxShadow:"inset 0 2px 4px rgba(0,0,0,0.02)"},children:[t.id==="climbingstairs"&&e.jsx(Yt,{}),t.id==="coinchange"&&e.jsx(Jt,{}),t.id==="houserobber"&&e.jsx(Zt,{}),t.id==="lis"&&e.jsx(er,{}),t.id==="lcs"&&e.jsx(tr,{}),t.id==="editdistance"&&e.jsx(rr,{}),t.id==="subsetsum"&&e.jsx(ir,{}),t.id==="knapsack01"&&e.jsx(nr,{})]})]}),e.jsxs("div",{style:{marginBottom:"24px"},children:[e.jsx("h3",{style:{margin:"0 0 12px 0",fontSize:"1.3rem",color:"#1E293B"},children:"Algorithm Approach"}),e.jsxs("div",{style:{background:"#EEF2FF",color:"#312E81",padding:"16px",borderRadius:"12px",fontSize:"1rem",lineHeight:"1.6"},children:["💡 ",t.algorithm]})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"},children:[e.jsx("h3",{style:{margin:0,fontSize:"1.3rem",color:"#1E293B"},children:"Solution Code"}),e.jsx("div",{style:{display:"flex",gap:"8px",background:"#F1F5F9",padding:"4px",borderRadius:"10px"},children:["python","javascript","cpp"].map(n=>e.jsx("button",{onClick:()=>u(n),style:{padding:"6px 14px",borderRadius:"6px",border:"none",fontWeight:"600",cursor:"pointer",transition:"all 0.2s",fontSize:"0.85rem",background:l===n?"#fff":"transparent",color:l===n?"#4F46E5":"#64748B",boxShadow:l===n?"0 2px 4px rgba(0,0,0,0.05)":"none"},children:n==="cpp"?"C++":n.charAt(0).toUpperCase()+n.slice(1)},n))})]}),e.jsx("pre",{style:{background:"#0F172A",color:"#E2E8F0",padding:"20px",borderRadius:"12px",overflowX:"auto",fontSize:"0.95rem",lineHeight:"1.6",margin:0,fontFamily:'"Fira Code", monospace',boxShadow:"inset 0 2px 4px rgba(0,0,0,0.1)"},children:e.jsx("code",{children:t[l]})})]})]},t.id):e.jsxs(I.div,{initial:{opacity:0},animate:{opacity:1},style:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",height:"100%",color:"#94A3B8"},children:[e.jsx("div",{style:{fontSize:"4rem",marginBottom:"16px"},children:"🧩"}),e.jsx("h3",{style:{margin:0},children:"Select a problem to view its solution"})]})})})]})})},ot=[{id:"climbingstairs",label:"Climbing Stairs"},{id:"coinchange",label:"Coin Change"},{id:"knapsack",label:"0/1 Knapsack"},{id:"practice",label:"DP Practice Problems"}],ar=({name:t})=>e.jsxs("div",{style:{padding:"3rem",textAlign:"center",color:"#64748b",fontFamily:"system-ui, sans-serif"},children:[e.jsx("div",{style:{fontSize:"3rem",marginBottom:"1rem"},children:"🚧"}),e.jsx("h3",{style:{fontSize:"1.5rem",fontWeight:"700",color:"#1e293b",marginBottom:"0.5rem"},children:t}),e.jsx("p",{style:{fontSize:"1rem"},children:"This metaphor is coming soon. Stay tuned!"})]}),lr=()=>{const[t,i]=o.useState("climbingstairs"),[l,u]=o.useState(null),n=()=>{switch(t){case"climbingstairs":return e.jsx(_t,{});case"coinchange":return e.jsx(Kt,{});case"knapsack":return e.jsx(Ut,{});case"practice":return e.jsx(sr,{});default:return e.jsx(ar,{name:ot.find(a=>a.id===t)?.label})}};return e.jsxs("div",{style:he.shell,children:[e.jsxs("div",{style:he.header,children:[e.jsx("h2",{style:he.title,children:"Dynamic Programming — Solving Problems Efficiently"}),e.jsx("p",{style:he.subtitle,children:"Dynamic Programming is a technique used to solve complex problems by breaking them into smaller subproblems and storing the results to avoid repeated computation."})]}),e.jsx("div",{style:he.tabBar,children:e.jsx("div",{style:he.tabScroll,children:ot.map(a=>e.jsx("button",{onClick:()=>i(a.id),onMouseEnter:()=>u(a.id),onMouseLeave:()=>u(null),style:{...he.tab,borderBottom:t===a.id?"3px solid #4F46E5":"3px solid transparent",color:t===a.id?"#4F46E5":l===a.id?"#1E293B":"#64748B",paddingBottom:t===a.id?"6px":"9px",fontWeight:t===a.id?"600":"normal"},children:a.label},a.id))})}),e.jsx("div",{style:he.content,children:n()})]})},he={shell:{width:"100%",maxWidth:"1000px",margin:"0 auto",fontFamily:"system-ui, sans-serif"},header:{textAlign:"center",padding:"1.5rem 1rem 0.5rem",marginBottom:"1rem"},title:{fontSize:"34px",fontWeight:"700",color:"#1e293b",marginBottom:"10px"},subtitle:{fontSize:"16px",color:"#64748B",lineHeight:"1.6",maxWidth:"680px",margin:"auto"},tabBar:{width:"100%",borderBottom:"2px solid #E2E8F0",paddingBottom:"10px",marginTop:"20px",marginBottom:"1.5rem"},tabScroll:{display:"flex",gap:"26px",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",padding:"0 0.5rem"},tab:{padding:"0.8rem 0",background:"none",border:"none",fontSize:"1rem",cursor:"pointer",transition:"all 0.2s",whiteSpace:"nowrap"},content:{}},Oe=[{id:"A",start:1,end:3},{id:"B",start:2,end:4},{id:"C",start:3,end:5},{id:"D",start:0,end:6},{id:"E",start:5,end:7}],dr=()=>{const[t,i]=o.useState([...Oe]),[l,u]=o.useState([]),[n,a]=o.useState([]),[c,S]=o.useState(-1),[g,r]=o.useState(!1),[p,d]=o.useState("Welcome! We want to schedule the maximum number of meetings."),[w,F]=o.useState("javascript"),y=()=>{i([...Oe]),u([]),a([]),S(-1),r(!1),d("Welcome! We want to schedule the maximum number of meetings.")},h=()=>{const x=[...Oe].sort((R,T)=>R.end-T.end);i(x),u([]),a([]),S(0),r(!0),d("Step 1: Sort meetings by their finishing times.")},m=()=>{if(c===-1){h();return}if(c>=t.length){r(!1),d(`Finished! Scheduled ${l.length} meetings.`);return}const x=t[c],R=l.length>0?t[l[l.length-1]]:null;!R||x.start>=R.end?(u(T=>[...T,c]),d(`Selected Meeting ${x.id} (${x.start}-${x.end}). It starts after the last meeting ends.`)):(a(T=>[...T,c]),d(`Rejected Meeting ${x.id} (${x.start}-${x.end}). it overlaps with the scheduled time.`)),S(T=>T+1)};o.useEffect(()=>{let x;return g&&c>=0&&c<t.length?x=setTimeout(m,1500):c===t.length&&(r(!1),d(`Done! Maximum meetings scheduled: ${l.length}.`)),()=>clearTimeout(x)},[g,c]);const f={python:`def activitySelection(start, end):
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
}`};return e.jsxs("div",{style:Z.container,children:[e.jsxs("div",{style:Z.card,children:[e.jsx("h3",{style:Z.cardTitle,children:"Activity Selection — Meeting Room Scheduler"}),e.jsxs("p",{style:Z.cardDesc,children:["You manage a meeting room. Many meetings request slots. Your goal is to schedule the maximum number of non-overlapping meetings by always picking the one that ",e.jsx("strong",{children:"ends earliest"}),"."]}),e.jsx("div",{style:Z.messageBox,children:p}),e.jsxs("div",{style:Z.timelineContainer,children:[e.jsx("div",{style:Z.timeRuler,children:[0,1,2,3,4,5,6,7].map(x=>e.jsxs("div",{style:Z.timeMark,children:[x,":00"]},x))}),e.jsx("div",{style:Z.slotsArea,children:t.map((x,R)=>{const T=l.includes(R),L=n.includes(R),W=c===R;return e.jsx(I.div,{layout:!0,initial:{opacity:0,x:-20},animate:{opacity:1,x:0,backgroundColor:T?"#DCFCE7":L?"#FEE2E2":W?"#FEF9C3":"#F1F5F9",borderColor:T?"#22C55E":L?"#EF4444":W?"#FACC15":"#E2E8F0",scale:W?1.05:1},style:{...Z.activityBlock,left:`${x.start*12.5}%`,width:`${(x.end-x.start)*12.5}%`,top:`${R*40}px`},children:e.jsxs("span",{style:{fontWeight:"bold",color:T?"#166534":L?"#991B1B":"#1E293B"},children:["Meeting ",x.id," (",x.start,"-",x.end,")"]})},x.id+R)})})]}),e.jsxs("div",{style:Z.legend,children:[e.jsxs("div",{style:Z.legendItem,children:[e.jsx("div",{style:{...Z.colorBox,background:"#DCFCE7",border:"1px solid #22C55E"}})," Selected"]}),e.jsxs("div",{style:Z.legendItem,children:[e.jsx("div",{style:{...Z.colorBox,background:"#FEE2E2",border:"1px solid #EF4444"}})," Rejected"]}),e.jsxs("div",{style:Z.legendItem,children:[e.jsx("div",{style:{...Z.colorBox,background:"#FEF9C3",border:"1px solid #FACC15"}})," Current"]})]}),e.jsxs("div",{style:Z.controls,children:[e.jsx("button",{onClick:h,disabled:g,style:Z.primaryBtn,children:"Start Simulation"}),e.jsx("button",{onClick:m,disabled:g||c>=t.length,style:Z.secondaryBtn,children:"Next Step"}),e.jsx("button",{onClick:y,style:Z.dangerBtn,children:"Reset"})]})]}),e.jsxs("div",{style:Z.card,children:[e.jsxs("div",{style:Z.codeHeader,children:[e.jsx("h3",{style:{margin:0},children:"Solution Code"}),e.jsx("div",{style:Z.langSelector,children:["python","javascript","cpp"].map(x=>e.jsx("button",{onClick:()=>F(x),style:{...Z.langBtn,background:w===x?"#4F46E5":"transparent",color:w===x?"#fff":"#64748B"},children:x==="cpp"?"C++":x.charAt(0).toUpperCase()+x.slice(1)},x))})]}),e.jsx("pre",{style:Z.pre,children:e.jsx("code",{children:f[w]})})]})]})},Z={container:{display:"flex",flexDirection:"column",gap:"2rem",padding:"1rem"},card:{background:"white",borderRadius:"16px",padding:"28px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)"},cardTitle:{margin:"0 0 10px 0",fontSize:"1.5rem",fontWeight:"800",color:"#1E293B"},cardDesc:{margin:"0 0 20px 0",color:"#64748B",lineHeight:"1.6"},messageBox:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",marginBottom:"30px",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center"},timelineContainer:{position:"relative",width:"100%",height:"300px",background:"#F8FAFC",borderRadius:"12px",border:"1px solid #E2E8F0",padding:"40px 20px 20px"},timeRuler:{position:"absolute",top:"10px",left:"20px",right:"20px",display:"flex",justifyContent:"space-between",borderBottom:"1px solid #E2E8F0",paddingBottom:"5px"},timeMark:{fontSize:"0.75rem",color:"#94A3B8",fontWeight:"bold"},slotsArea:{position:"relative",height:"100%",marginTop:"10px"},activityBlock:{position:"absolute",height:"34px",borderRadius:"8px",border:"2px solid",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem",whiteSpace:"nowrap",overflow:"hidden"},legend:{display:"flex",gap:"20px",justifyContent:"center",marginTop:"20px"},legendItem:{display:"flex",alignItems:"center",gap:"8px",fontSize:"0.9rem",color:"#64748B"},colorBox:{width:"16px",height:"16px",borderRadius:"4px"},controls:{display:"flex",gap:"12px",justifyContent:"center",marginTop:"30px"},primaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer"},secondaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer"},dangerBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer"},codeHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"},langSelector:{display:"flex",gap:"8px",background:"#F1F5F9",padding:"4px",borderRadius:"10px"},langBtn:{border:"none",padding:"4px 12px",borderRadius:"6px",fontSize:"0.85rem",fontWeight:"600",cursor:"pointer",transition:"all 0.2s"},pre:{background:"#0F172A",color:"#E2E8F0",padding:"20px",borderRadius:"12px",overflowX:"auto",fontSize:"0.9rem",lineHeight:"1.6",fontFamily:"monospace"}},st=[25,10,5,1],cr=()=>{const[t,i]=o.useState(63),[l,u]=o.useState(63),[n,a]=o.useState([]),[c,S]=o.useState(null),[g,r]=o.useState(!1),[p,d]=o.useState("Welcome to the Fast Vending Machine! Goal: Return change using the fewest coins."),[w,F]=o.useState("javascript"),y=()=>{u(t),a([]),S(null),r(!1),d("Reset complete. Enter a target amount or start the simulation.")},h=()=>{if(l<=0){r(!1),d(`Finished! Returned change using ${n.length} coins.`);return}const f=st.find(x=>x<=l);f?(S(f),d(`Step: Largest coin ≤ ${l} is ${f}. Subtracting it...`),setTimeout(()=>{a(x=>[...x,f]),u(x=>x-f),S(null)},800)):(r(!1),d("Cannot make exact change with available denominations."))};o.useEffect(()=>{let f;return g&&l>0&&(f=setTimeout(h,1500)),()=>clearTimeout(f)},[g,l,n]);const m={python:`def getChange(amount):
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
}`};return e.jsxs("div",{style:te.container,children:[e.jsxs("div",{style:te.card,children:[e.jsx("h3",{style:te.cardTitle,children:"Coin Change — Fast Vending Machine"}),e.jsxs("p",{style:te.cardDesc,children:["Greedy choice: Always pick the ",e.jsx("strong",{children:"largest possible coin"})," first to minimize the total number of coins quickly."]}),e.jsx("div",{style:te.messageBox,children:p}),e.jsxs("div",{style:te.vendingMachine,children:[e.jsxs("div",{style:te.displayArea,children:[e.jsxs("div",{style:te.remainingVal,children:[e.jsx("span",{style:{fontSize:"1rem",color:"#94A3B8"},children:"REMAINING"}),e.jsxs(I.div,{initial:{scale:1.2,color:"#FACC15"},animate:{scale:1,color:"#3B82F6"},style:{fontSize:"3rem",fontWeight:"900"},children:["¢",l]},l)]}),e.jsx("div",{style:te.coinVault,children:e.jsx(ie,{children:n.map((f,x)=>e.jsx(I.div,{initial:{y:-50,opacity:0,scale:0},animate:{y:0,opacity:1,scale:1},style:{...te.coin,background:"#10B981",boxShadow:"0 4px 0 #059669"},children:f},x))})})]}),e.jsx("div",{style:te.coinSlots,children:st.map(f=>e.jsxs(I.div,{animate:{scale:c===f?1.15:1,backgroundColor:c===f?"#FEF9C3":"#F1F5F9",borderColor:c===f?"#FACC15":"#E2E8F0"},style:te.slot,children:[e.jsx("div",{style:{...te.coin,background:"#F59E0B",marginBottom:"8px"},children:f}),c===f&&e.jsx(I.span,{initial:{opacity:0},animate:{opacity:1},style:te.bestLabel,children:"BEST CHOICE"})]},f))})]}),e.jsxs("div",{style:te.controls,children:[e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e.jsx("span",{style:{fontWeight:"bold"},children:"Target:"}),e.jsx("input",{type:"number",value:t,onChange:f=>{const x=parseInt(f.target.value)||0;i(x),u(x)},disabled:g||n.length>0,style:te.input})]}),e.jsx("button",{onClick:()=>r(!0),disabled:g||l<=0,style:te.primaryBtn,children:"Start Simulation"}),e.jsx("button",{onClick:h,disabled:g||l<=0,style:te.secondaryBtn,children:"Next Step"}),e.jsx("button",{onClick:y,style:te.dangerBtn,children:"Reset"})]})]}),e.jsxs("div",{style:te.card,children:[e.jsxs("div",{style:te.codeHeader,children:[e.jsx("h3",{style:{margin:0},children:"Solution Code"}),e.jsx("div",{style:te.langSelector,children:["python","javascript","cpp"].map(f=>e.jsx("button",{onClick:()=>F(f),style:{...te.langBtn,background:w===f?"#4F46E5":"transparent",color:w===f?"#fff":"#64748B"},children:f==="cpp"?"C++":f.charAt(0).toUpperCase()+f.slice(1)},f))})]}),e.jsx("pre",{style:te.pre,children:e.jsx("code",{children:m[w]})})]})]})},te={container:{display:"flex",flexDirection:"column",gap:"2rem",padding:"1rem"},card:{background:"white",borderRadius:"16px",padding:"28px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)"},cardTitle:{margin:"0 0 10px 0",fontSize:"1.5rem",fontWeight:"800",color:"#1E293B"},cardDesc:{margin:"0 0 20px 0",color:"#64748B",lineHeight:"1.6"},messageBox:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",marginBottom:"30px",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center"},vendingMachine:{background:"#F8FAFC",borderRadius:"16px",border:"2px solid #E2E8F0",padding:"30px",display:"flex",flexDirection:"column",gap:"30px"},displayArea:{display:"flex",justifyContent:"space-around",alignItems:"center",padding:"20px",background:"white",borderRadius:"12px",boxShadow:"inset 0 2px 4px rgba(0,0,0,0.05)"},remainingVal:{textAlign:"center"},coinVault:{display:"flex",flexWrap:"wrap",gap:"10px",maxWidth:"300px",minHeight:"60px",padding:"10px",justifyContent:"center"},coin:{width:"44px",height:"44px",borderRadius:"50%",border:"2px solid rgba(255,255,255,0.3)",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:"900",fontSize:"1.1rem"},coinSlots:{display:"flex",justifyContent:"center",gap:"20px"},slot:{flex:1,padding:"15px",borderRadius:"12px",border:"2px dashed #CBD5E1",display:"flex",flexDirection:"column",alignItems:"center",position:"relative"},bestLabel:{fontSize:"0.65rem",fontWeight:"800",color:"#F59E0B",marginTop:"4px"},controls:{display:"flex",gap:"15px",justifyContent:"center",marginTop:"30px",alignItems:"center"},input:{width:"80px",padding:"8px",borderRadius:"6px",border:"1px solid #E2E8F0",textAlign:"center",fontWeight:"bold"},primaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer"},secondaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer"},dangerBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer"},codeHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"},langSelector:{display:"flex",gap:"8px",background:"#F1F5F9",padding:"4px",borderRadius:"10px"},langBtn:{border:"none",padding:"4px 12px",borderRadius:"6px",fontSize:"0.85rem",fontWeight:"600",cursor:"pointer",transition:"all 0.2s"},pre:{background:"#0F172A",color:"#E2E8F0",padding:"20px",borderRadius:"12px",overflowX:"auto",fontSize:"0.9rem",lineHeight:"1.6",fontFamily:"monospace"}},pr=[{id:1,name:"Gold Dust",value:100,weight:20},{id:2,name:"Silver Bars",value:60,weight:10},{id:3,name:"Rare Spices",value:120,weight:30}],ur=()=>{const[t,i]=o.useState(50),[l,u]=o.useState(50),[n,a]=o.useState(0),[c,S]=o.useState([]),[g,r]=o.useState([]),[p,d]=o.useState(-1),[w,F]=o.useState([]),[y,h]=o.useState(!1),[m,f]=o.useState("Step 1: Calculate Value/Weight ratio for each item."),[x,R]=o.useState("javascript");o.useEffect(()=>{const v=pr.map(s=>({...s,ratio:s.value/s.weight}));S(v)},[]);const T=()=>{u(t),a(0),d(-1),F([]),h(!1),f("Reset complete. Adjust capacity or start the optimizer.")},L=()=>{const v=[...c].sort((s,b)=>b.ratio-s.ratio);r(v),F([]),a(0),u(t),d(0),h(!0),f("Step 2: Sort items by Value/Weight ratio (Greedy Choice).")},W=()=>{if(p===-1){L();return}if(p>=g.length||l<=0){h(!1),f(`Finished! Total Value in bag: $${n.toFixed(2)}.`);return}const v=g[p];let s,b,B;v.weight<=l?(s=v.weight,b=v.value,B=1,f(`Taking 100% of ${v.name}. Value added: $${b}.`)):(B=l/v.weight,s=l,b=v.value*B,f(`Only ${l}kg space left! Taking ${Math.round(B*100)}% of ${v.name}.`)),F(C=>[...C,{...v,takenWeight:s,takenValue:b,fraction:B}]),a(C=>C+b),u(C=>C-s),d(C=>C+1)};o.useEffect(()=>{let v;return y&&p>=0&&p<g.length&&l>0&&(v=setTimeout(W,2e3)),()=>clearTimeout(v)},[y,p]);const q={python:`def fractionalKnapsack(capacity, items):
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
}`};return e.jsxs("div",{style:V.container,children:[e.jsxs("div",{style:V.card,children:[e.jsx("h3",{style:V.cardTitle,children:"Fractional Knapsack — Treasure Bag Optimizer"}),e.jsxs("p",{style:V.cardDesc,children:["Unlike 0/1 knapsack, you can take ",e.jsx("strong",{children:"fractions"})," of items. Greedy choice: Always pick the item with the ",e.jsx("strong",{children:"highest value density (Value / Weight)"}),"."]}),e.jsx("div",{style:V.messageBox,children:m}),e.jsxs("div",{style:V.optimizerView,children:[e.jsx("div",{style:V.itemsGrid,children:c.map((v,s)=>{const b=g[p]?.id===v.id,B=w.some(C=>C.id===v.id);return e.jsxs(I.div,{animate:{scale:b?1.05:1,borderColor:b?"#FACC15":"#E2E8F0",backgroundColor:B?"#F1F5F9":"white",opacity:B?.6:1},style:V.itemCard,children:[e.jsxs("div",{style:V.itemHeader,children:[e.jsx("span",{style:V.itemName,children:v.name}),e.jsxs("span",{style:V.itemRatio,children:["$",v.ratio,"/kg"]})]}),e.jsxs("div",{style:V.itemStats,children:[e.jsxs("span",{children:["Value: $",v.value]}),e.jsxs("span",{children:["Weight: ",v.weight,"kg"]})]}),b&&e.jsx("div",{style:V.pointer,children:"FOCUS"})]},v.id)})}),e.jsx("div",{style:V.bagArea,children:e.jsxs("div",{style:V.bagVisual,children:[e.jsx(ie,{children:w.map((v,s)=>e.jsxs(I.div,{initial:{y:50,opacity:0},animate:{y:0,opacity:1},style:{...V.bagLayer,height:`${v.takenWeight/t*100}%`,background:v.fraction===1?"#10B981":"#A855F7"},children:[v.name," (",Math.round(v.fraction*100),"%)"]},s))}),e.jsxs("div",{style:V.bagInfo,children:[e.jsxs("div",{style:{fontSize:"1.5rem",fontWeight:"900"},children:["$",n.toFixed(1)]}),e.jsxs("div",{style:{fontSize:"0.8rem"},children:[Math.max(0,l),"kg left"]})]})]})})]}),e.jsxs("div",{style:V.legend,children:[e.jsxs("div",{style:V.legendItem,children:[e.jsx("div",{style:{...V.colorBox,background:"#10B981"}})," Full Item"]}),e.jsxs("div",{style:V.legendItem,children:[e.jsx("div",{style:{...V.colorBox,background:"#A855F7"}})," Fractional Item"]}),e.jsxs("div",{style:V.legendItem,children:[e.jsx("div",{style:{...V.colorBox,background:"#FACC15"}})," Current Best Ratio"]})]}),e.jsxs("div",{style:V.controls,children:[e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e.jsx("span",{style:{fontWeight:"bold"},children:"Bag Capacity (kg):"}),e.jsx("input",{type:"number",value:t,onChange:v=>{const s=parseInt(v.target.value)||0;i(s),u(s)},disabled:y||w.length>0,style:V.input})]}),e.jsx("button",{onClick:L,disabled:y||p>=g.length&&p!==-1,style:V.primaryBtn,children:"Start Optimizer"}),e.jsx("button",{onClick:W,disabled:y||p>=g.length&&p!==-1,style:V.secondaryBtn,children:"Next Step"}),e.jsx("button",{onClick:T,style:V.dangerBtn,children:"Reset"})]})]}),e.jsxs("div",{style:V.card,children:[e.jsxs("div",{style:V.codeHeader,children:[e.jsx("h3",{style:{margin:0},children:"Solution Code"}),e.jsx("div",{style:V.langSelector,children:["python","javascript","cpp"].map(v=>e.jsx("button",{onClick:()=>R(v),style:{...V.langBtn,background:x===v?"#4F46E5":"transparent",color:x===v?"#fff":"#64748B"},children:v==="cpp"?"C++":v.charAt(0).toUpperCase()+v.slice(1)},v))})]}),e.jsx("pre",{style:V.pre,children:e.jsx("code",{children:q[x]})})]})]})},V={container:{display:"flex",flexDirection:"column",gap:"2rem",padding:"1rem"},card:{background:"white",borderRadius:"16px",padding:"28px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)"},cardTitle:{margin:"0 0 10px 0",fontSize:"1.5rem",fontWeight:"800",color:"#1E293B"},cardDesc:{margin:"0 0 20px 0",color:"#64748B",lineHeight:"1.6"},messageBox:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",marginBottom:"30px",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center"},optimizerView:{display:"flex",gap:"30px",background:"#F8FAFC",padding:"20px",borderRadius:"12px",alignItems:"flex-start"},itemsGrid:{flex:1,display:"flex",flexDirection:"column",gap:"12px"},itemCard:{padding:"15px",borderRadius:"12px",border:"2px solid",position:"relative",boxShadow:"0 2px 4px rgba(0,0,0,0.02)"},itemHeader:{display:"flex",justifyContent:"space-between",marginBottom:"5px"},itemName:{fontWeight:"800",color:"#1E293B"},itemRatio:{color:"#4F46E5",fontSize:"0.85rem",fontWeight:"bold"},itemStats:{display:"flex",gap:"15px",fontSize:"0.85rem",color:"#64748B"},pointer:{position:"absolute",right:"-10px",top:"50%",transform:"translateY(-50%)",background:"#FACC15",color:"#000",fontSize:"0.6rem",fontWeight:"900",padding:"2px 6px",borderRadius:"4px"},bagArea:{width:"250px",display:"flex",justifyContent:"center"},bagVisual:{width:"160px",height:"240px",background:"#E2E8F0",border:"4px solid #94A3B8",borderRadius:"0 0 20px 20px",position:"relative",overflow:"hidden",display:"flex",flexDirection:"column-reverse"},bagLayer:{width:"100%",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.7rem",fontWeight:"bold",borderTop:"2px solid rgba(0,0,0,0.1)"},bagInfo:{position:"absolute",top:"20px",left:0,right:0,textAlign:"center",color:"#475569",zIndex:10,background:"rgba(255,255,255,0.8)",padding:"5px"},legend:{display:"flex",gap:"20px",justifyContent:"center",marginTop:"20px"},legendItem:{display:"flex",alignItems:"center",gap:"8px",fontSize:"0.9rem",color:"#64748B"},colorBox:{width:"16px",height:"16px",borderRadius:"4px"},controls:{display:"flex",gap:"15px",justifyContent:"center",marginTop:"30px",alignItems:"center",flexWrap:"wrap"},input:{width:"70px",padding:"8px",borderRadius:"6px",border:"1px solid #E2E8F0",textAlign:"center",fontWeight:"bold"},primaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer"},secondaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer"},dangerBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer"},codeHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"},langSelector:{display:"flex",gap:"8px",background:"#F1F5F9",padding:"4px",borderRadius:"10px"},langBtn:{border:"none",padding:"4px 12px",borderRadius:"6px",fontSize:"0.85rem",fontWeight:"600",cursor:"pointer",transition:"all 0.2s"},pre:{background:"#0F172A",color:"#E2E8F0",padding:"20px",borderRadius:"12px",overflowX:"auto",fontSize:"0.9rem",lineHeight:"1.6",fontFamily:"monospace"}},He=[{char:"A",freq:5},{char:"B",freq:9},{char:"C",freq:12},{char:"D",freq:13},{char:"E",freq:16},{char:"F",freq:45}],at=()=>He.map((t,i)=>({id:i,char:t.char,freq:t.freq,left:null,right:null,isLeaf:!0})),Te=(t,i="",l={})=>t?t.isLeaf?(l[t.char]=i||"0",l):(Te(t.left,i+"0",l),Te(t.right,i+"1",l),l):l,Pe=({node:t,depth:i=0,edgeLabel:l})=>{if(!t)return null;const u=t.isLeaf;return e.jsxs("div",{style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},children:[l!==void 0&&e.jsx("span",{style:{fontSize:"0.75rem",fontWeight:"800",color:"#4F46E5"},children:l}),e.jsxs(I.div,{initial:{scale:0,opacity:0},animate:{scale:1,opacity:1},transition:{duration:.4,delay:i*.05},style:{width:u?"52px":"48px",height:u?"52px":"48px",borderRadius:u?"10px":"50%",background:u?"#10B981":"#3B82F6",color:"white",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontWeight:"800",fontSize:u?"0.85rem":"0.8rem",boxShadow:"0 4px 10px rgba(0,0,0,0.12)",border:"2px solid rgba(255,255,255,0.3)"},children:[u&&e.jsx("span",{children:t.char}),e.jsx("span",{style:{fontSize:"0.7rem"},children:t.freq})]}),!u&&e.jsxs("div",{style:{display:"flex",gap:Math.max(8,60-i*12)+"px",marginTop:"4px"},children:[e.jsx(Pe,{node:t.left,depth:i+1,edgeLabel:"0"}),e.jsx(Pe,{node:t.right,depth:i+1,edgeLabel:"1"})]})]})},fe=[{q:"Why does Huffman Coding use a greedy strategy?",options:["It always picks the two smallest-frequency nodes to merge","It randomly picks two nodes","It picks the largest node first","It doesn't use greedy"],answer:0},{q:"Why are frequent characters given shorter codes?",options:["To increase file size","To reduce total encoded length","Because they are more important","No particular reason"],answer:1},{q:"What is a prefix code?",options:["A code where every code starts with 0","A code where no codeword is a prefix of another","A code that has fixed-length","A code with only single-bit values"],answer:1},{q:"Why does Huffman coding produce optimal compression?",options:["It always uses 8-bit codes","It minimizes the weighted path length of the code tree","It removes all duplicate characters","It uses run-length encoding"],answer:1}],mr=()=>{const[t,i]=o.useState(at),[l,u]=o.useState([]),[n,a]=o.useState(null),[c,S]=o.useState({}),[g,r]=o.useState([]),[p,d]=o.useState(!1),[w,F]=o.useState("Characters with frequencies are ready. Merge the two smallest nodes each step."),[y,h]=o.useState("javascript"),[m,f]=o.useState(He.length),[x,R]=o.useState(0),[T,L]=o.useState(null),[W,q]=o.useState(!1),[v]=o.useState("FACE"),s=()=>{i(at()),u([]),a(null),S({}),r([]),d(!1),F("Reset! Characters with frequencies are ready."),f(He.length),R(0),L(null),q(!1)},b=o.useCallback(()=>{i(j=>{if(j.length<=1){const oe=j[0];return a(oe),S(Te(oe)),d(!1),F("Tree complete! Binary codes have been generated."),r([]),j}const A=[...j].sort((oe,$e)=>oe.freq-$e.freq),k=A[0],z=A[1];r([k.id,z.id]);const $={id:m,char:null,freq:k.freq+z.freq,left:k,right:z,isLeaf:!1};f(oe=>oe+1);const se=[...A.slice(2),$].sort((oe,$e)=>oe.freq-$e.freq);return u(oe=>[...oe,{a:k.isLeaf?k.char:k.freq,b:z.isLeaf?z.char:z.freq,result:$.freq}]),F(`Merged ${k.isLeaf?k.char:"("+k.freq+")"} (${k.freq}) + ${z.isLeaf?z.char:"("+z.freq+")"} (${z.freq}) → ${$.freq}. ${se.length===1?"Done!":se.length+" nodes remain."}`),se.length===1&&(a($),S(Te($)),d(!1),r([])),se})},[m]),B=()=>{d(!0);const j=()=>{i(A=>A.length<=1?(d(!1),A):(setTimeout(j,1200),A)),b()};j()},C={python:`import heapq

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
}`},E=Object.keys(c).length>0?v.split("").map(j=>c[j]||"?").join(""):"";return e.jsxs("div",{style:U.container,children:[e.jsxs("div",{style:U.card,children:[e.jsx("h3",{style:U.cardTitle,children:"Huffman Coding — Signal Compression Network"}),e.jsxs("p",{style:U.cardDesc,children:["Assign ",e.jsx("strong",{children:"shorter codes"})," to frequent characters and ",e.jsx("strong",{children:"longer codes"})," to rare ones. The greedy choice merges the two smallest-frequency nodes at each step, building an optimal prefix-free binary tree."]}),e.jsx("div",{style:U.messageBox,children:w}),e.jsxs("div",{style:{marginBottom:"24px"},children:[e.jsx("h4",{style:{margin:"0 0 12px",color:"#1E293B"},children:"Priority Queue"}),e.jsx("div",{style:U.queueRow,children:e.jsx(ie,{children:[...t].sort((j,A)=>j.freq-A.freq).map(j=>e.jsxs(I.div,{layout:!0,initial:{scale:0},animate:{scale:1,backgroundColor:g.includes(j.id)?"#FACC15":j.isLeaf?"#F1F5F9":"#DBEAFE",borderColor:g.includes(j.id)?"#FACC15":"#E2E8F0"},exit:{scale:0,opacity:0},style:U.queueNode,children:[e.jsx("span",{style:{fontWeight:"900",color:"#1E293B"},children:j.isLeaf?j.char:"⊕"}),e.jsx("span",{style:{fontSize:"0.75rem",color:"#64748B"},children:j.freq})]},j.id))})})]}),n&&e.jsxs("div",{style:{marginBottom:"24px"},children:[e.jsx("h4",{style:{margin:"0 0 12px",color:"#1E293B"},children:"Huffman Tree"}),e.jsx("div",{style:U.treeContainer,children:e.jsx(Pe,{node:n})})]}),Object.keys(c).length>0&&e.jsxs("div",{style:{marginBottom:"24px"},children:[e.jsx("h4",{style:{margin:"0 0 12px",color:"#1E293B"},children:"Generated Binary Codes"}),e.jsx("div",{style:U.codesGrid,children:Object.entries(c).sort((j,A)=>j[1].length-A[1].length).map(([j,A])=>e.jsxs("div",{style:U.codeEntry,children:[e.jsx("span",{style:{fontWeight:"900",fontSize:"1.1rem",color:"#10B981"},children:j}),e.jsx("span",{style:{fontFamily:"monospace",color:"#4F46E5",fontWeight:"700"},children:A})]},j))}),e.jsxs("div",{style:U.encodeDemo,children:[e.jsx("h4",{style:{margin:"0 0 8px",color:"#1E293B"},children:"Message Encoding Demo"}),e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center",flexWrap:"wrap"},children:[e.jsxs("span",{style:{fontWeight:"700"},children:['"',v,'"']}),e.jsx("span",{style:{color:"#94A3B8"},children:"→"}),e.jsx("span",{style:{fontFamily:"monospace",background:"#0F172A",color:"#22D3EE",padding:"6px 14px",borderRadius:"8px",fontWeight:"700",letterSpacing:"2px"},children:E}),e.jsxs("span",{style:{color:"#64748B",fontSize:"0.85rem"},children:["(",E.length," bits)"]})]})]})]}),e.jsxs("div",{style:U.legend,children:[e.jsxs("div",{style:U.legendItem,children:[e.jsx("div",{style:{...U.colorBox,background:"#FACC15"}})," Selected"]}),e.jsxs("div",{style:U.legendItem,children:[e.jsx("div",{style:{...U.colorBox,background:"#3B82F6"}})," Merged"]}),e.jsxs("div",{style:U.legendItem,children:[e.jsx("div",{style:{...U.colorBox,background:"#10B981"}})," Leaf (Final)"]})]}),e.jsxs("div",{style:U.controls,children:[e.jsx("button",{onClick:b,disabled:p||t.length<=1,style:{...U.secondaryBtn,opacity:p||t.length<=1?.5:1},children:"Build Next Merge"}),e.jsx("button",{onClick:B,disabled:p||t.length<=1,style:{...U.primaryBtn,opacity:p||t.length<=1?.5:1},children:"Auto Build Tree"}),e.jsx("button",{onClick:s,style:U.dangerBtn,children:"Reset"})]})]}),e.jsxs("div",{style:U.card,children:[e.jsxs("div",{style:U.codeHeader,children:[e.jsx("h3",{style:{margin:0},children:"Solution Code"}),e.jsx("div",{style:U.langSelector,children:["python","javascript","cpp"].map(j=>e.jsx("button",{onClick:()=>h(j),style:{...U.langBtn,background:y===j?"#4F46E5":"transparent",color:y===j?"#fff":"#64748B"},children:j==="cpp"?"C++":j.charAt(0).toUpperCase()+j.slice(1)},j))})]}),e.jsx("pre",{style:U.pre,children:e.jsx("code",{children:C[y]})})]}),e.jsxs("div",{style:U.card,children:[e.jsx("h3",{style:{margin:"0 0 16px",fontSize:"1.3rem",color:"#1E293B"},children:"🧠 Knowledge Check"}),W?e.jsxs("div",{children:[e.jsxs("p",{style:{fontWeight:"700",color:"#1E293B",marginBottom:"12px"},children:["Q",x+1,": ",fe[x].q]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"8px"},children:fe[x].options.map((j,A)=>e.jsx("button",{onClick:()=>L(A),disabled:T!==null,style:{textAlign:"left",padding:"10px 16px",borderRadius:"8px",border:"2px solid",borderColor:T===null?"#E2E8F0":A===fe[x].answer?"#22C55E":T===A?"#EF4444":"#E2E8F0",background:T!==null&&A===fe[x].answer?"#DCFCE7":T===A&&A!==fe[x].answer?"#FEE2E2":"white",cursor:T!==null?"default":"pointer",fontWeight:"500",fontSize:"0.95rem"},children:j},A))}),T!==null&&e.jsxs("div",{style:{marginTop:"16px"},children:[e.jsx("p",{style:{color:T===fe[x].answer?"#22C55E":"#EF4444",fontWeight:"700"},children:T===fe[x].answer?"✅ Correct!":"❌ Incorrect."}),x<fe.length-1&&e.jsx("button",{onClick:()=>{R(j=>j+1),L(null)},style:U.secondaryBtn,children:"Next Question →"})]})]}):e.jsx("button",{onClick:()=>q(!0),style:U.primaryBtn,children:"Start Quiz"})]})]})},U={container:{display:"flex",flexDirection:"column",gap:"2rem",padding:"1rem"},card:{background:"white",borderRadius:"16px",padding:"28px",boxShadow:"0 6px 16px rgba(0,0,0,0.06)"},cardTitle:{margin:"0 0 10px 0",fontSize:"1.5rem",fontWeight:"800",color:"#1E293B"},cardDesc:{margin:"0 0 20px 0",color:"#64748B",lineHeight:"1.6"},messageBox:{background:"#1E293B",color:"white",padding:"16px",borderRadius:"12px",textAlign:"center",fontWeight:"600",marginBottom:"30px",minHeight:"60px",display:"flex",alignItems:"center",justifyContent:"center"},queueRow:{display:"flex",gap:"12px",flexWrap:"wrap",justifyContent:"center"},queueNode:{width:"56px",height:"56px",borderRadius:"10px",border:"2px solid",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"2px"},treeContainer:{display:"flex",justifyContent:"center",padding:"20px",background:"#F8FAFC",borderRadius:"12px",border:"1px solid #E2E8F0",overflowX:"auto",minHeight:"180px"},codesGrid:{display:"flex",gap:"12px",flexWrap:"wrap",justifyContent:"center"},codeEntry:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px",background:"#F8FAFC",padding:"10px 18px",borderRadius:"10px",border:"1px solid #E2E8F0"},encodeDemo:{marginTop:"20px",padding:"16px",background:"#F8FAFC",borderRadius:"12px",border:"1px solid #E2E8F0"},legend:{display:"flex",gap:"20px",justifyContent:"center",marginTop:"20px",marginBottom:"10px"},legendItem:{display:"flex",alignItems:"center",gap:"8px",fontSize:"0.9rem",color:"#64748B"},colorBox:{width:"16px",height:"16px",borderRadius:"4px"},controls:{display:"flex",gap:"12px",justifyContent:"center",marginTop:"20px"},primaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#4F46E5",color:"white",fontWeight:"700",cursor:"pointer"},secondaryBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#10B981",color:"white",fontWeight:"700",cursor:"pointer"},dangerBtn:{padding:"10px 20px",borderRadius:"8px",border:"none",background:"#EF4444",color:"white",fontWeight:"700",cursor:"pointer"},codeHeader:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"},langSelector:{display:"flex",gap:"8px",background:"#F1F5F9",padding:"4px",borderRadius:"10px"},langBtn:{border:"none",padding:"4px 12px",borderRadius:"6px",fontSize:"0.85rem",fontWeight:"600",cursor:"pointer",transition:"all 0.2s"},pre:{background:"#0F172A",color:"#E2E8F0",padding:"20px",borderRadius:"12px",overflowX:"auto",fontSize:"0.9rem",lineHeight:"1.6",fontFamily:"monospace",margin:0}},lt=[{id:"activity",label:"Activity Selection"},{id:"coinchange",label:"Coin Change (Greedy)"},{id:"knapsack",label:"Fractional Knapsack"},{id:"huffman",label:"Huffman Coding"}],gr=({name:t})=>e.jsxs("div",{style:{padding:"3rem",textAlign:"center",color:"#64748b",fontFamily:"system-ui, sans-serif"},children:[e.jsx("div",{style:{fontSize:"3rem",marginBottom:"1rem"},children:"🚧"}),e.jsx("h3",{style:{fontSize:"1.5rem",fontWeight:"700",color:"#1e293b",marginBottom:"0.5rem"},children:t}),e.jsx("p",{style:{fontSize:"1rem"},children:"This metaphor is coming soon. Stay tuned!"})]}),hr=()=>{const[t,i]=o.useState("activity"),[l,u]=o.useState(null),n=()=>{switch(t){case"activity":return e.jsx(dr,{});case"coinchange":return e.jsx(cr,{});case"knapsack":return e.jsx(ur,{});case"huffman":return e.jsx(mr,{});default:return e.jsx(gr,{name:lt.find(a=>a.id===t)?.label})}};return e.jsxs("div",{style:xe.shell,children:[e.jsxs("div",{style:xe.header,children:[e.jsx("h2",{style:xe.title,children:"Greedy Algorithms — Making the Best Immediate Choice"}),e.jsx("p",{style:xe.subtitle,children:"Greedy algorithms solve problems by making the best possible decision at each step. They choose the locally optimal option in the hope that it leads to a globally optimal solution."})]}),e.jsx("div",{style:xe.tabBar,children:e.jsx("div",{style:xe.tabScroll,children:lt.map(a=>e.jsx("button",{onClick:()=>i(a.id),onMouseEnter:()=>u(a.id),onMouseLeave:()=>u(null),style:{...xe.tab,borderBottom:t===a.id?"3px solid #4F46E5":"3px solid transparent",color:t===a.id?"#4F46E5":l===a.id?"#1E293B":"#64748B",paddingBottom:t===a.id?"6px":"9px",fontWeight:t===a.id?"600":"normal"},children:a.label},a.id))})}),e.jsx("div",{style:xe.content,children:n()})]})},xe={shell:{width:"100%",maxWidth:"1000px",margin:"0 auto",fontFamily:"system-ui, sans-serif"},header:{textAlign:"center",padding:"1.5rem 1rem 0.5rem",marginBottom:"1rem"},title:{fontSize:"34px",fontWeight:"700",color:"#1e293b",marginBottom:"10px"},subtitle:{fontSize:"16px",color:"#64748B",lineHeight:"1.6",maxWidth:"680px",margin:"auto"},tabBar:{width:"100%",borderBottom:"2px solid #E2E8F0",paddingBottom:"10px",marginTop:"20px",marginBottom:"1.5rem"},tabScroll:{display:"flex",gap:"26px",overflowX:"auto",scrollbarWidth:"none",msOverflowStyle:"none",padding:"0 0.5rem"},tab:{padding:"0.8rem 0",background:"none",border:"none",fontSize:"1rem",cursor:"pointer",transition:"all 0.2s",whiteSpace:"nowrap"},content:{}},dt=[{id:"sorting",label:"Sorting Algorithms",icon:"🔢",description:"Arrange elements in ascending or descending order. Covers Bubble, Selection, Insertion, Merge, Quick and Heap Sort.",difficulty:"Beginner–Advanced"},{id:"searching",label:"Searching Algorithms",icon:"🔍",description:"Find elements in arrays and trees efficiently. Covers Linear Search, Binary Search, BFS, and DFS.",difficulty:"Beginner"},{id:"dp",label:"Dynamic Programming",icon:"🧩",description:"Solve complex problems by breaking them into overlapping subproblems. Covers Fibonacci, Knapsack, LCS, and more.",difficulty:"Advanced"},{id:"greedy",label:"Greedy Algorithms",icon:"🏆",description:"Build solutions step-by-step by always picking the locally optimal choice. Covers interval scheduling, Huffman coding.",difficulty:"Intermediate"},{id:"divide",label:"Divide & Conquer",icon:"⚔️",description:"Divide problems into smaller subproblems, solve independently, then combine. Covers Merge Sort, Binary Search, and more.",difficulty:"Intermediate"},{id:"backtrack",label:"Backtracking",icon:"↩️",description:"Explore all possibilities and backtrack on encountering invalid states. Covers N-Queens, Sudoku, and permutations.",difficulty:"Advanced"}],fr=({topic:t})=>e.jsx("div",{style:be.wrap,children:e.jsxs("div",{style:be.card,children:[e.jsx("span",{style:be.icon,children:t.icon}),e.jsx("h3",{style:be.name,children:t.label}),e.jsx("p",{style:be.desc,children:t.description}),e.jsx("span",{style:{...be.badge,backgroundColor:t.difficulty==="Beginner–Advanced"?"#ede9fe":t.difficulty==="Beginner"?"#dcfce7":t.difficulty==="Intermediate"?"#fef9c3":"#fee2e2",color:"#1e293b"},children:t.difficulty}),e.jsx("div",{style:be.soon,children:"🚧 Coming Soon"})]})}),be={wrap:{display:"flex",justifyContent:"center",padding:"2rem"},card:{background:"#fff",borderRadius:"16px",padding:"2.5rem",maxWidth:"600px",width:"100%",textAlign:"center",boxShadow:"0 4px 16px rgba(0,0,0,0.06)",border:"1px solid #e2e8f0"},icon:{fontSize:"3rem"},name:{fontSize:"1.5rem",fontWeight:"800",color:"#1e293b",margin:"0.75rem 0 0.5rem"},desc:{color:"#64748b",lineHeight:"1.6",marginBottom:"1rem"},badge:{display:"inline-block",padding:"4px 12px",borderRadius:"999px",fontWeight:"600",fontSize:"0.85rem",marginBottom:"1.5rem"},soon:{padding:"0.75rem 1.5rem",background:"#f1f5f9",borderRadius:"999px",display:"inline-block",fontWeight:"700",color:"#64748b",fontSize:"0.95rem"}},jr=()=>{const[t,i]=o.useState(null),[l,u]=o.useState(null);if(t){const n=dt.find(a=>a.id===t);return e.jsxs("div",{style:de.container,children:[e.jsx("button",{onClick:()=>i(null),style:de.backBtn,onMouseEnter:a=>a.currentTarget.style.background="#E2E8F0",onMouseLeave:a=>a.currentTarget.style.background="#F1F5F9",children:"← Back to Algorithms"}),e.jsx(ie,{mode:"wait",children:e.jsx(I.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},transition:{duration:.25},children:t==="sorting"?e.jsx(zt,{}):t==="searching"?e.jsx(Nt,{}):t==="dp"?e.jsx(lr,{}):t==="greedy"?e.jsx(hr,{}):e.jsx(fr,{topic:n})},t)})]})}return e.jsxs("div",{style:de.container,children:[e.jsxs("div",{style:de.header,children:[e.jsx("h2",{style:de.mainTitle,children:"🧮 Algorithms"}),e.jsx("p",{style:de.mainSub,children:"Explore essential algorithm families — from sorting and searching to dynamic programming and beyond."})]}),e.jsx("div",{style:de.grid,children:dt.map(n=>e.jsxs(I.div,{whileHover:{translateY:-4,boxShadow:"0 8px 24px rgba(79,70,229,0.12)"},transition:{duration:.2},style:de.topicCard,onClick:()=>i(n.id),children:[e.jsx("span",{style:de.topicIcon,children:n.icon}),e.jsx("h3",{style:de.topicName,children:n.label}),e.jsx("p",{style:de.topicDesc,children:n.description}),e.jsx("span",{style:{...de.diffBadge,backgroundColor:n.difficulty==="Beginner"?"#dcfce7":n.difficulty==="Beginner–Advanced"?"#ede9fe":n.difficulty==="Intermediate"?"#fef9c3":"#fee2e2",color:"#1e293b"},children:n.difficulty})]},n.id))})]})},de={container:{width:"100%",maxWidth:"1000px",margin:"0 auto",fontFamily:"system-ui, sans-serif"},header:{textAlign:"center",padding:"1.5rem 1rem 0.5rem",marginBottom:"1.5rem"},mainTitle:{fontSize:"2rem",fontWeight:"900",color:"#1e293b",marginBottom:"0.5rem"},mainSub:{fontSize:"1rem",color:"#64748b",lineHeight:"1.6",maxWidth:"600px",margin:"0 auto"},grid:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:"1.25rem",padding:"0 0.5rem"},topicCard:{backgroundColor:"#fff",borderRadius:"16px",padding:"1.75rem",border:"1px solid #e2e8f0",cursor:"pointer",display:"flex",flexDirection:"column",gap:"8px",boxShadow:"0 2px 8px rgba(0,0,0,0.04)"},topicIcon:{fontSize:"2rem"},topicName:{fontSize:"1.1rem",fontWeight:"800",color:"#1e293b",margin:0},topicDesc:{fontSize:"0.9rem",color:"#64748b",lineHeight:"1.5",margin:0},diffBadge:{display:"inline-block",padding:"3px 10px",borderRadius:"999px",fontWeight:"600",fontSize:"0.8rem",alignSelf:"flex-start"},backBtn:{background:"#F1F5F9",padding:"8px 16px",borderRadius:"999px",fontWeight:"600",border:"none",cursor:"pointer",transition:"background 0.2s",fontSize:"0.95rem",color:"#0f172a",marginBottom:"1.5rem",display:"inline-block"}};export{jr as default};
