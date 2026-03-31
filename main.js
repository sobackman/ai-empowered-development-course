import { VibeKanbanWebCompanion } from 'vibe-kanban-web-companion';
import { parseISO, format, isToday, isTomorrow, isBefore, startOfToday } from 'date-fns';

// Todos array (Feature 1)
let todos = [];
let nextId = 1;

// Current filter (Feature 2)
let currentFilter = 'all';

// Sort by due date (Feature 3)
let sortByDueDate = false;

// localStorage helper functions
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    const saved = localStorage.getItem('todos');
    if (saved) {
        todos = JSON.parse(saved);
        // Update nextId to be higher than any existing id
        if (todos.length > 0) {
            nextId = Math.max(...todos.map(t => t.id)) + 1;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    init();
    initVibeKanban();
});

function init() {
    // Load todos from localStorage
    loadTodos();

    // Wire up add button
    const addBtn = document.getElementById('addBtn');
    const todoInput = document.getElementById('todoInput');

    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodo();
    });

    // Wire up filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => setFilter(btn.dataset.filter));
    });

    // Wire up sort button
    document.getElementById('sortDueDateBtn').addEventListener('click', toggleSortByDueDate);

    renderTodos();
}

function initVibeKanban() {
    const companion = new VibeKanbanWebCompanion();
    companion.render(document.body);
}

// Feature 1: Add, toggle, delete todos
function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();

    if (text === '') return;

    const dueDateInput = document.getElementById('dueDateInput');
    const dueDate = dueDateInput.value || null;

    todos.push({
        id: nextId++,
        text: text,
        completed: false,
        dueDate: dueDate
    });

    saveTodos();
    input.value = '';
    dueDateInput.value = '';
    renderTodos();
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveTodos();
        renderTodos();
    }
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    saveTodos();
    renderTodos();
}

// Feature 3: Format due date for display
function formatDueDate(dateStr) {
    const date = parseISO(dateStr);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isBefore(date, startOfToday())) return `Overdue · ${format(date, 'MMM d')}`;
    const currentYear = new Date().getFullYear();
    return date.getFullYear() !== currentYear
        ? format(date, 'MMM d, yyyy')
        : format(date, 'MMM d');
}

// Feature 3: Get CSS class for due date badge
function getDueDateClass(dateStr) {
    const date = parseISO(dateStr);
    if (isBefore(date, startOfToday())) return 'due-overdue';
    if (isToday(date)) return 'due-today';
    return 'due-upcoming';
}

// Feature 1: Render todos
function renderTodos() {
    const todoList = document.getElementById('todoList');
    let displayTodos = getFilteredTodos();

    if (sortByDueDate) {
        displayTodos = [...displayTodos].sort((a, b) => {
            if (!a.dueDate && !b.dueDate) return 0;
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return a.dueDate < b.dueDate ? -1 : a.dueDate > b.dueDate ? 1 : 0;
        });
    }

    todoList.innerHTML = '';

    displayTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        if (todo.completed) li.classList.add('completed');

        const dueDateHtml = todo.dueDate
            ? `<span class="due-badge ${getDueDateClass(todo.dueDate)}">${escapeHtml(formatDueDate(todo.dueDate))}</span>`
            : '';

        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
            <div class="todo-content">
                <span class="todo-text">${escapeHtml(todo.text)}</span>
                ${dueDateHtml}
            </div>
            <button class="todo-delete">Delete</button>
        `;

        li.querySelector('.todo-checkbox').addEventListener('change', () => toggleTodo(todo.id));
        li.querySelector('.todo-delete').addEventListener('click', () => deleteTodo(todo.id));

        todoList.appendChild(li);
    });
}

// Feature 2: Filter todos based on current filter
function getFilteredTodos() {
    if (currentFilter === 'active') {
        return todos.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        return todos.filter(t => t.completed);
    }
    return todos; // 'all'
}

// Feature 2: Set filter and update UI
function setFilter(filter) {
    currentFilter = filter;

    // Update button styling
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) {
            btn.classList.add('active');
        }
    });

    renderTodos();
}

// Feature 3: Toggle sort by due date
function toggleSortByDueDate() {
    sortByDueDate = !sortByDueDate;
    document.getElementById('sortDueDateBtn').classList.toggle('active', sortByDueDate);
    renderTodos();
}

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
