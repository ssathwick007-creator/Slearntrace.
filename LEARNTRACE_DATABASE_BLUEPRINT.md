# LearnTrace — Database Blueprint

This blueprint defines the architecture to transition LearnTrace into a professional, data-driven learning platform using Supabase PostgreSQL.

---

## 1. Current Data Inventory
Currently, LearnTrace manages data across two layers:
1. **Hardcoded Content Layer**: All courses, topics, concept counts, and problem sets are hardcoded in static arrays within frontend files (e.g. `src/learning.js` and `src/ProgressContext.jsx`).
2. **Local Session Layer**: The platform tracks user learning logs locally inside the browser's `localStorage` (`lt_ds_progress_v1` and `learnTraceAttempts`).
3. **Local Profile State**: Synthetic learner profiles (streaks, average correctness) are compiled dynamically on page load based on these local logs.

---

## 2. Metaphor Inventory (Currently Discovered)
Each of the core topics implements structured metaphors to explain computer science operations:
* **Arrays**:
  1. *Fixed Train* (`ArrayTrain.jsx`) — Contiguous data visualization using a train metaphor.
  2. *Concert Seating* (`ConcertSeating.jsx`) — Array indexes represented as physical seats in a row.
  3. *Elevator Zoom* (`ElevatorAccess.jsx`) — Multidimensional indexing represented as floor levels.
  4. *Library Bookshelf* (`LibraryBookshelf.jsx`) — Contiguous bookshelf indexes.
  5. *Parking Lot 2D* (`ParkingLotGrid.jsx`) — Grid index mapping.
* **Linked Lists**:
  1. *Treasure Hunt* (`TreasureHuntChain.jsx`) — Nodes representing clues pointing to the next address location.
  2. *Detachable Train* (`LinkedListTrain.jsx`) — Singly linked nodes modeled as train cars.
  3. *Message Relay* (`MessageRelayRace.jsx`) — Relay race handoffs.
  4. *Doubly Linked* (`DoublyLinkedCircle.jsx`) — Bidirectional references.
  5. *Circular Loop* (`CircularBottleChain.jsx`) — Cycles in nodes.
  6. *Sentinel Guardians* (`SentinelGuardian.jsx`) — Null-guard nodes.
  7. *Skip List* (`SkipListMountain.jsx`) — Index hierarchies.
* **Stacks**:
  1. *Plate Tower* (`CafeteriaPlateTower.jsx`) — LIFO sequence modeled as plate stackers.
  2. *Browser History* (`BrowserHistoryStack.jsx`) — Forward/backward navigation logs.
  3. *Undo/Redo* (`UndoRedoPalette.jsx`) — Palette command history.
  4. *Call Stack* (`CallStackDolls.jsx`) — Russian nesting dolls representing stacked function evaluations.
  5. *Calculator* (`ExpressionCalculator.jsx`) — Arithmetic evaluations.
  6. *Tower of Hanoi* (`TowerOfHanoi.jsx`) — Recursive disk placement.
* **Queues**:
  1. *Ticket Counter* (`TicketCounterQueue.jsx`) — FIFO queue visualization.
  2. *Printer Queue* (`PrinterJobQueue.jsx`) — Shared network buffer tasks.
  3. *Circular Buffer* (`CircularBuffer.jsx`) — Ring buffers.
  4. *ER Triage* (`PriorityQueueER.jsx`) — Priority evaluations.
  5. *Subway Line* (`SubwayDeque.jsx`) — Double-ended queues.
  6. *Coffee Shop* (`BlockingQueue.jsx`) — Producer-consumer queue dynamics.
  7. *Email Pipeline* (`MessageQueue.jsx`) — Async tasks.
  8. *Airport Security* (`AirportPriorityQueue.jsx`) — Prioritization lists.
  9. *Sliding Max* (`SlidingWindowMax.jsx`) — Array sliding boundaries.
* **Trees**:
  1. *Family Tree* (`FamilyTree.jsx`) — Hierarchical parent-child node layout.
  2. *Bookshelf BST* (`BinarySearchTree.jsx`) — Sorting libraries.
  3. *Family Reunion* (`TreeTraversal.jsx`) — Traversal sequences (pre-order, in-order, post-order).
  4. *Tree Balance* (`TreeHeightBalance.jsx`) — AVL self-balancing.
  5. *Tree Diameter* (`TreeDiameter.jsx`) — Furthest path evaluations.
  6. *Level Order* (`LevelOrderTraversal.jsx`) — Breadth-first traversal.
  7. *Tree Views* (`TreeViews.jsx`) — Edge visibility algorithms.

---

## 3. Proposed Schema Blueprint (Table-by-Table)

All entity tables will use the consistent lower snake-case naming standard.

### Table: `subjects`
Stores broad domains of computer science.
* `id` (`uuid`, PRIMARY KEY) — Default `gen_random_uuid()`
* `name` (`text`, UNIQUE, NOT NULL) — e.g. "Data Structures"
* `slug` (`text`, UNIQUE, NOT NULL) — e.g. "data-structures"
* `description` (`text`)
* `sort_order` (`integer`, NOT NULL, DEFAULT 0)
* `status` (`text`, DEFAULT 'published') — e.g. 'draft', 'published', 'archived'
* `created_at` (`timestamp with time zone`, DEFAULT `now()`)
* `updated_at` (`timestamp with time zone`, DEFAULT `now()`)

### Table: `topics`
Stores specific topics belonging to a subject.
* `id` (`uuid`, PRIMARY KEY)
* `subject_id` (`uuid`, FOREIGN KEY REFERENCES `subjects.id` ON DELETE CASCADE)
* `name` (`text`, NOT NULL) — e.g. "Arrays"
* `slug` (`text`, UNIQUE, NOT NULL) — e.g. "arrays"
* `icon` (`text`) — e.g. "📦"
* `description` (`text`)
* `difficulty` (`text`) — e.g. "Beginner"
* `sort_order` (`integer`, DEFAULT 0)
* `status` (`text`, DEFAULT 'published')
* `created_at` (`timestamp with time zone`, DEFAULT `now()`)
* `updated_at` (`timestamp with time zone`, DEFAULT `now()`)

### Table: `metaphors`
Stores metaphor definitions.
* `id` (`text`, PRIMARY KEY) — Matches current React identifiers (e.g. "ConcertSeating")
* `topic_id` (`uuid`, FOREIGN KEY REFERENCES `topics.id` ON DELETE CASCADE)
* `title` (`text`, NOT NULL) — e.g. "Concert Seating"
* `description` (`text`)
* `analogy` (`text`) — Real-world comparison text
* `explanation` (`text`) — CS topic mapping text
* `sort_order` (`integer`, DEFAULT 0)
* `status` (`text`, DEFAULT 'published')
* `created_at` (`timestamp with time zone`, DEFAULT `now()`)
* `updated_at` (`timestamp with time zone`, DEFAULT `now()`)

### Table: `metaphor_steps`
Stores sequential slides/steps for a metaphor presentation.
* `id` (`uuid`, PRIMARY KEY)
* `metaphor_id` (`text`, FOREIGN KEY REFERENCES `metaphors.id` ON DELETE CASCADE)
* `step_number` (`integer`, NOT NULL)
* `title` (`text`)
* `description` (`text`)
* `visual_state` (`jsonb`) — Config properties governing DOM animations/highlights for this step
* `created_at` (`timestamp with time zone`, DEFAULT `now()`)

### Table: `problems`
Stores practice problems.
* `id` (`uuid`, PRIMARY KEY)
* `topic_id` (`uuid`, FOREIGN KEY REFERENCES `topics.id` ON DELETE CASCADE)
* `title` (`text`, NOT NULL)
* `question` (`text`, NOT NULL)
* `solution` (`text`)
* `code_template` (`jsonb`) — Language templates (Python, C++, Java)
* `sort_order` (`integer`, DEFAULT 0)
* `created_at` (`timestamp with time zone`, DEFAULT `now()`)

### Table: `profiles`
Maps Supabase auth profiles to client credentials.
* `id` (`uuid`, PRIMARY KEY FOREIGN KEY REFERENCES `auth.users.id` ON DELETE CASCADE)
* `display_name` (`text`)
* `photo_url` (`text`)
* `created_at` (`timestamp with time zone`, DEFAULT `now()`)
* `updated_at` (`timestamp with time zone`, DEFAULT `now()`)

### Table: `learning_progress`
Tracks user completion status.
* `id` (`uuid`, PRIMARY KEY)
* `profile_id` (`uuid`, FOREIGN KEY REFERENCES `profiles.id` ON DELETE CASCADE)
* `topic_id` (`uuid`, FOREIGN KEY REFERENCES `topics.id` ON DELETE CASCADE)
* `metaphors_completed` (`text[]`, DEFAULT '{}') — Array of completed metaphor IDs
* `problems_completed` (`uuid[]`, DEFAULT '{}') — Array of solved problem IDs
* `updated_at` (`timestamp with time zone`, DEFAULT `now()`)
* UNIQUE (`profile_id`, `topic_id`)

### Table: `thinktrace_sessions`
Tracks ThinkTrace logs.
* `id` (`uuid`, PRIMARY KEY)
* `profile_id` (`uuid`, FOREIGN KEY REFERENCES `profiles.id` ON DELETE CASCADE)
* `question_id` (`text`, NOT NULL)
* `question_text` (`text`, NOT NULL)
* `response_text` (`text`, NOT NULL)
* `time_spent_seconds` (`integer`, NOT NULL)
* `keystrokes_count` (`integer`, NOT NULL)
* `edits_count` (`integer`, NOT NULL)
* `idle_seconds` (`integer`, NOT NULL)
* `retries_count` (`integer`, NOT NULL)
* `learner_pattern` (`text`)
* `feedback_text` (`text`)
* `insight_text` (`text`)
* `created_at` (`timestamp with time zone`, DEFAULT `now()`)

---

## 4. Security Model & Row Level Security (RLS)

* **Global Content (`subjects`, `topics`, `metaphors`, `metaphor_steps`, `problems`)**:
  * Read: `PUBLIC` (anonymous and authenticated users can view content)
  * Write/Update/Delete: `ADMIN ONLY`
* **User Content (`profiles`, `learning_progress`, `thinktrace_sessions`)**:
  * Read: `OWNER ONLY` (users can query only their matching profiles/progress records)
  * Write/Update: `OWNER ONLY`
  * Delete: `OWNER ONLY`

---

## 5. Migration Strategy

1. **Schema Initialization**: Create a migration file containing definitions for tables, keys, indexes, and RLS policies.
2. **Seed Data**: Map all current hardcoded topics, descriptions, and metaphors into SQL insert rows.
3. **Data Service Integration**: Replace local storage retrieval loops inside `ProgressContext.jsx` with real asynchronous Supabase calls querying progress and content tables.
