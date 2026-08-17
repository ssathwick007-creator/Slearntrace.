# LearnTrace — Content Inventory

This document maps all hardcoded CSE subjects, topics, and metaphors currently present in the LearnTrace frontend code to their respective source files.

---

## 1. Subjects Registry
All high-level subjects are currently hardcoded in:
* [`src/learning.js`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/learning.js)

| Subject ID | Name | Description | Related React Hub Component |
|---|---|---|---|
| `ds` | Data Structures | Arrays, Trees, Graphs, Hash Tables | `DataStructuresHub.jsx` |
| `algo` | Algorithms | Sorting, Searching, Dynamic Programming | `AlgorithmsHub.jsx` |
| `os` | Operating Systems | Processes, Threads, Memory Management | `OperatingSystemsHub.jsx` |
| `cn` | Computer Networks | OSI Model, TCP/IP, Routing | `ComputerNetworksHub.jsx` |
| `dbms` | DBMS | SQL, Normalization, ACID Properties | `DBMSHub.jsx` |
| `oop` | Object Oriented Prog. | Inheritance, Polymorphism, Abstraction | Fallback UI |

---

## 2. Topics Registry (Data Structures Sub-concepts)
Specific sub-topics for the Data Structures subject are configured under:
* [`src/ProgressContext.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/ProgressContext.jsx)

| Topic ID | Title | Icon | Description | Difficulty | Metaphors count |
|---|---|---|---|---|---|
| `arrays` | Arrays | 📦 | Arrays are contiguous blocks of memory... | Beginner | 5 |
| `linked-lists` | Linked Lists | 🔗 | Linked lists consist of nodes... | Beginner | 5 |
| `stacks` | Stacks | 🥞 | Stacks follow LIFO... | Beginner | 4 |
| `queues` | Queues | 🚶 | Queues operate on LIFO... | Beginner | 4 |
| `trees` | Trees | 🌳 | Trees represent hierarchical data... | Intermediate | 8 |
| `graphs` | Graphs | 🌐 | Graphs represent networks... | Intermediate | 9 |
| `hash-tables` | Hash Tables | 🗂️ | Hash tables map keys to values... | Advanced | 7 |

---

## 3. Metaphor Details & Components Map

| Topic ID | Metaphor Name | Component File | Current Visual / Interactive Elements |
|---|---|---|---|
| `arrays` | Fixed Train | [`ArrayTrain.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/ArrayTrain.jsx) | Interactive train cars representing contiguous slots. |
| `arrays` | Concert Seating | [`ConcertSeating.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/ConcertSeating.jsx) | Row-based seating map indexes. |
| `arrays` | Elevator Zoom | [`ElevatorAccess.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/ElevatorAccess.jsx) | Multi-floor grid representing double dimension array. |
| `arrays` | Library Bookshelf | [`LibraryBookshelf.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/LibraryBookshelf.jsx) | Shelf books array slot representation. |
| `arrays` | Parking Lot 2D | [`ParkingLotGrid.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/ParkingLotGrid.jsx) | Interactive 2D coordinate slot visualization. |
| `linked-lists` | Treasure Hunt | [`TreasureHuntChain.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/TreasureHuntChain.jsx) | Clue boxes referencing the next clue target. |
| `linked-lists` | Detachable Train | [`LinkedListTrain.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/LinkedListTrain.jsx) | Separable train carriages linked via nodes. |
| `linked-lists` | Message Relay | [`MessageRelayRace.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/MessageRelayRace.jsx) | Runners transferring values iteratively. |
| `linked-lists` | Doubly Linked | [`DoublyLinkedCircle.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/DoublyLinkedCircle.jsx) | Nodes storing previous and next pointers. |
| `linked-lists` | Circular Loop | [`CircularBottleChain.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/CircularBottleChain.jsx) | Infinite cycle loop representation. |
| `linked-lists` | Sentinel Guardians | [`SentinelGuardian.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/SentinelGuardian.jsx) | Sentinel dummy head/tail pointers. |
| `linked-lists` | Skip List | [`SkipListMountain.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/SkipListMountain.jsx) | Hierarchical node levels. |
| `stacks` | Plate Tower | [`CafeteriaPlateTower.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/CafeteriaPlateTower.jsx) | Plate stack representation. |
| `stacks` | Browser History | [`BrowserHistoryStack.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/BrowserHistoryStack.jsx) | Navigation logs mimicking back/forward stack actions. |
| `stacks` | Undo/Redo | [`UndoRedoPalette.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/UndoRedoPalette.jsx) | Command lists. |
| `stacks` | Call Stack | [`CallStackDolls.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/CallStackDolls.jsx) | Nesting dolls. |
| `stacks` | Calculator | [`ExpressionCalculator.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/ExpressionCalculator.jsx) | Infix-to-postfix stack conversions. |
| `stacks` | Tower of Hanoi | [`TowerOfHanoi.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/TowerOfHanoi.jsx) | Visual hanoi towers. |
| `queues` | Ticket Counter | [`TicketCounterQueue.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/TicketCounterQueue.jsx) | Line queue. |
| `queues` | Printer Queue | [`PrinterJobQueue.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/PrinterJobQueue.jsx) | Job spool buffers. |
| `queues` | Circular Buffer | [`CircularBuffer.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/CircularBuffer.jsx) | Ring elements. |
| `queues` | ER Triage | [`PriorityQueueER.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/PriorityQueueER.jsx) | Patient sorting triage. |
| `queues` | Subway Line | [`SubwayDeque.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/SubwayDeque.jsx) | Dual-ended passenger boarding. |
| `queues` | Coffee Shop | [`BlockingQueue.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/BlockingQueue.jsx) | Buffer sizes. |
| `queues` | Email Pipeline | [`MessageQueue.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/MessageQueue.jsx) | Message lists. |
| `queues` | Airport Security | [`AirportPriorityQueue.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/AirportPriorityQueue.jsx) | Priority levels. |
| `queues` | Sliding Max | [`SlidingWindowMax.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/SlidingWindowMax.jsx) | Window values. |
| `trees` | Family Tree | [`FamilyTree.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/FamilyTree.jsx) | Parent-child nodes. |
| `trees` | Bookshelf BST | [`BinarySearchTree.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/BinarySearchTree.jsx) | Ordered libraries. |
| `trees` | Family Reunion | [`TreeTraversal.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/TreeTraversal.jsx) | Traversal orders. |
| `trees` | Tree Balance | [`TreeHeightBalance.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/TreeHeightBalance.jsx) | AVL heights. |
| `trees` | Tree Diameter | [`TreeDiameter.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/TreeDiameter.jsx) | Path nodes. |
| `trees` | Level Order | [`LevelOrderTraversal.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/LevelOrderTraversal.jsx) | Breadth order. |
| `trees` | Tree Views | [`TreeViews.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/TreeViews.jsx) | Edges views. |

---

## 4. Visual Coding Practice Challenges (Local Visualizers)
These step-by-step logic exercises are stored locally inside topic modules:

| Topic | Problem Title | Component | Type |
|---|---|---|---|
| `arrays` | Reverse an Array | [`ArrayPracticeProblems.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/ArrayPracticeProblems.jsx) | Reversing `[1,2,3,4,5]` in-place |
| `arrays` | Find Maximum Element | [`ArrayPracticeProblems.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/ArrayPracticeProblems.jsx) | Sifting `[7,2,9,4,1]` elements |
| `arrays` | Rotate Left by 2 | [`ArrayPracticeProblems.jsx`](file:///c:/Users/S%20SATHWICK/Desktop/Desktop/START-UP'S/LearnTrace/src/ArrayPracticeProblems.jsx) | Shift shift left rotations |
