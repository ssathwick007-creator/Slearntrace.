import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://xtyqttxulvgxtecgwgbc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0eXF0dHh1bHZneHRlY2d3Z2JjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjY4NDM5NiwiZXhwIjoyMTAyMjYwMzk2fQ.vQ3SmuqaGn961hG14U1lEE6EZqDp-0lMGZmGBHBc4W4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
    console.log('Starting full migration...');

    // 1. Ensure Subjects exist
    const subjects = [
        { name: 'Data Structures', slug: 'data-structures', description: 'Arrays, Trees, Graphs, Hash Tables', sort_order: 1 },
        { name: 'Algorithms', slug: 'algorithms', description: 'Sorting, Searching, Dynamic Programming', sort_order: 2 },
        { name: 'Operating Systems', slug: 'operating-systems', description: 'Processes, Threads, Memory Management', sort_order: 3 },
        { name: 'Computer Networks', slug: 'computer-networks', description: 'OSI Model, TCP/IP, Routing', sort_order: 4 },
        { name: 'DBMS', slug: 'dbms', description: 'SQL, Normalization, ACID Properties', sort_order: 5 },
        { name: 'Object Oriented Prog.', slug: 'oop', description: 'Inheritance, Polymorphism, Abstraction', sort_order: 6 }
    ];

    for (const sub of subjects) {
        const { data, error } = await supabase.from('subjects').upsert(sub, { onConflict: 'slug' }).select();
        if (error) console.error('Error subject:', error.message);
        else console.log('Upserted subject:', sub.name);
    }

    // 2. Ensure Topics exist
    const { data: dbSubs } = await supabase.from('subjects').select('*');
    const dsId = dbSubs.find(s => s.slug === 'data-structures').id;

    const topics = [
        { subject_id: dsId, name: 'Arrays', slug: 'arrays', icon: '📦', description: 'Arrays are contiguous blocks...', difficulty: 'Beginner', sort_order: 1 },
        { subject_id: dsId, name: 'Linked Lists', slug: 'linked-lists', icon: '🔗', description: 'Linked lists consist of nodes...', difficulty: 'Beginner', sort_order: 2 },
        { subject_id: dsId, name: 'Stacks', slug: 'stacks', icon: '🥞', description: 'Stacks follow LIFO...', difficulty: 'Beginner', sort_order: 3 },
        { subject_id: dsId, name: 'Queues', slug: 'queues', icon: '🚶', description: 'Queues operate on FIFO...', difficulty: 'Beginner', sort_order: 4 },
        { subject_id: dsId, name: 'Trees', slug: 'trees', icon: '🌳', description: 'Trees represent hierarchical...', difficulty: 'Intermediate', sort_order: 5 },
        { subject_id: dsId, name: 'Graphs', slug: 'graphs', icon: '🌐', description: 'Graphs represent networks...', difficulty: 'Intermediate', sort_order: 6 },
        { subject_id: dsId, name: 'Hash Tables', slug: 'hash-tables', icon: '🗂️', description: 'Hash tables map keys...', difficulty: 'Advanced', sort_order: 7 }
    ];

    for (const topic of topics) {
        const { data, error } = await supabase.from('topics').upsert(topic, { onConflict: 'slug' }).select();
        if (error) console.error('Error topic:', error.message);
        else console.log('Upserted topic:', topic.name);
    }

    // 3. Metaphors
    const { data: dbTopics } = await supabase.from('topics').select('*');
    
    const inventory = fs.readFileSync('LEARNTRACE_CONTENT_INVENTORY.md', 'utf8');
    let parsing = false;
    let metaphors = [];
    for (const line of inventory.split('\n')) {
        if (line.includes('## 3. Metaphor Details')) parsing = true;
        if (line.includes('## 4. Visual Coding')) parsing = false;
        if (parsing && line.startsWith('| `')) {
            const parts = line.split('|').map(p => p.trim());
            if (parts.length > 4) {
                const topicSlug = parts[1].replace(/`/g, '');
                const title = parts[2];
                let comp = parts[3];
                // Extract file name from component map (e.g. [`ArrayTrain.jsx`](...))
                const fileMatch = comp.match(/\[\`([^`]+)\`\]/);
                const id = fileMatch ? fileMatch[1].replace('.jsx', '') : title.replace(/\s+/g, '');
                const desc = parts[4];
                metaphors.push({ topicSlug, id, title, desc });
            }
        }
    }

    let mOrder = 1;
    for (const m of metaphors) {
        const t = dbTopics.find(dt => dt.slug === m.topicSlug);
        if (!t) continue;
        const payload = {
            id: m.id,
            topic_id: t.id,
            title: m.title,
            description: m.desc,
            sort_order: mOrder++
        };
        const { error } = await supabase.from('metaphors').upsert(payload);
        if (error) console.error('Error metaphor:', error.message);
        else console.log('Upserted metaphor:', m.id);
    }

    console.log('Done with Core Content');
}

migrate();
