-- Seed Data for LearnTrace

-- =============================================================================
-- 1. Seed Subjects
-- =============================================================================
INSERT INTO public.subjects (id, name, slug, description, sort_order) VALUES
('d290c000-0000-0000-0000-000000000001', 'Data Structures', 'data-structures', 'Arrays, Trees, Graphs, Hash Tables', 1),
('d290c000-0000-0000-0000-000000000002', 'Algorithms', 'algorithms', 'Sorting, Searching, Dynamic Programming', 2);

-- =============================================================================
-- 2. Seed Topics
-- =============================================================================
INSERT INTO public.topics (id, subject_id, name, slug, icon, description, difficulty, sort_order) VALUES
('e390c000-0000-0000-0000-000000000001', 'd290c000-0000-0000-0000-000000000001', 'Arrays', 'arrays', '📦', 'Arrays are contiguous blocks of memory...', 'Beginner', 1),
('e390c000-0000-0000-0000-000000000002', 'd290c000-0000-0000-0000-000000000001', 'Linked Lists', 'linked-lists', '🔗', 'Linked lists consist of nodes...', 'Beginner', 2),
('e390c000-0000-0000-0000-000000000003', 'd290c000-0000-0000-0000-000000000001', 'Stacks', 'stacks', '🥞', 'Stacks follow Last-In-First-Out (LIFO)...', 'Beginner', 3),
('e390c000-0000-0000-0000-000000000004', 'd290c000-0000-0000-0000-000000000001', 'Queues', 'queues', '🚶', 'Queues operate on First-In-First-Out (FIFO)...', 'Beginner', 4),
('e390c000-0000-0000-0000-000000000005', 'd290c000-0000-0000-0000-000000000001', 'Trees', 'trees', '🌳', 'Trees represent hierarchical structures...', 'Intermediate', 5);

-- =============================================================================
-- 3. Seed Metaphors
-- =============================================================================
INSERT INTO public.metaphors (id, topic_id, title, description, analogy, explanation, sort_order) VALUES
('ArrayTrain', 'e390c000-0000-0000-0000-000000000001', 'Fixed Train', 'Contiguous train cars', 'A train with fixed locked cars', 'Contiguous slots in memory', 1),
('ConcertSeating', 'e390c000-0000-0000-0000-000000000001', 'Concert Seating', 'Row seating', 'Numbered seating in rows', 'Constant time index lookup', 2),
('TreasureHuntChain', 'e390c000-0000-0000-0000-000000000002', 'Treasure Hunt', 'Pointer chain clues', 'Clues pointing to next location', 'Nodes storing memory addresses', 1),
('CafeteriaPlateTower', 'e390c000-0000-0000-0000-000000000003', 'Plate Tower', 'LIFO plate dispenser', 'Stack of plates at dispenser', 'LIFO push and pop operations', 1);
