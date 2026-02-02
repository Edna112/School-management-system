# 🚀 Quick Reference Cheat Sheet

## File Locations

| What You Need | Where It Is |
|--------------|-------------|
| Main app setup | `src/App.tsx` |
| Subject list page | `src/pages/subjects/list.tsx` |
| Create subject page | `src/pages/subjects/create.tsx` |
| Mock data | `src/providers/constants.ts` |
| Data fetching | `src/providers/data.ts` |
| Type definitions | `src/types/index.ts` |
| Department options | `src/constants/index.tsx` |

---

## Common Code Snippets

### Create State
```tsx
const [value, setValue] = useState("")
const [number, setNumber] = useState(0)
const [array, setArray] = useState([])
```

### Create a Component
```tsx
const MyComponent = () => {
  return <div>Hello</div>
}

export default MyComponent
```

### Create a Table
```tsx
const table = useTable<YourType>({
  columns: useMemo(() => [
    {
      id: 'field',
      accessorKey: 'field',
      header: () => <p>Header</p>,
      cell: ({getValue}) => <p>{getValue<string>()}</p>,
    }
  ], []),
  refineCoreProps: {
    resource: 'yourResource',
    pagination: {pageSize: 10, mode: 'server'},
  }
})
```

### Add a Route
```tsx
// In App.tsx resources array:
{
  name: "YourPage",
  list: "/your-page",
  meta: { label: "Your Page", icon: <YourIcon /> }
}

// In Routes:
<Route path="your-page">
  <Route index element={<YourComponent />} />
</Route>
```

### Filter Data
```tsx
const filters = condition ? [{
  field: 'fieldName',
  operator: 'eq',  // or 'contains', 'gte', etc.
  value: filterValue,
}] : []
```

### Input Field
```tsx
<Input 
  type="text"
  placeholder="Enter text..."
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### Dropdown Select
```tsx
<Select value={selected} onValueChange={setSelected}>
  <SelectTrigger>
    <SelectValue placeholder="Choose..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

---

## TypeScript Types

### Define a Type
```tsx
export type MyType = {
  id: number
  name: string
  email: string
  isActive: boolean
}
```

### Use a Type
```tsx
const item: MyType = {
  id: 1,
  name: "John",
  email: "john@example.com",
  isActive: true
}
```

---

## Common Tailwind Classes

| Class | What It Does |
|-------|--------------|
| `flex` | Display flex |
| `gap-2` | Gap between items |
| `p-4` | Padding all sides |
| `m-2` | Margin all sides |
| `bg-blue-500` | Blue background |
| `text-white` | White text |
| `rounded` | Rounded corners |
| `w-full` | Full width |
| `hidden` | Hide element |
| `block` | Display block |

---

## Import Paths

```tsx
// Same folder
import Component from "./component"

// Parent folder
import Component from "../component"

// From src (using @ alias)
import Component from "@/components/component"
import { Type } from "@/types"
import { CONSTANT } from "@/constants"
```

---

## Common Errors & Fixes

| Error | Fix |
|-------|-----|
| `Cannot find module` | Check import path |
| `'X' is not defined` | Import it or define it |
| `Type 'X' is not assignable` | Check types match |
| `Unexpected token` | Check syntax (missing comma, bracket, etc.) |
| `Cannot read property` | Check if value exists before accessing |

---

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Check for errors
npm run build  # TypeScript will show errors
```

---

## Component Structure Template

```tsx
// 1. Imports
import { useState } from "react"
import { YourType } from "@/types"

// 2. Component definition
const YourComponent = () => {
  // 3. State (if needed)
  const [value, setValue] = useState("")
  
  // 4. Calculations/filters (if needed)
  const filters = value ? [...] : []
  
  // 5. Table/hooks (if needed)
  const table = useTable({...})
  
  // 6. Return JSX
  return (
    <div>
      {/* Your UI here */}
    </div>
  )
}

// 7. Export
export default YourComponent
```

---

## Data Flow Checklist

When building a new feature:

- [ ] Define the type in `types/index.ts`
- [ ] Create mock data in `providers/constants.ts`
- [ ] Update `dataProvider.getList()` in `providers/data.ts`
- [ ] Create the page component in `pages/`
- [ ] Add route in `App.tsx` resources
- [ ] Add route in `App.tsx` Routes
- [ ] Test it!

---

## Debugging Tips

1. **Use console.log()**
   ```tsx
   console.log("Value:", value)
   console.log("Data:", data)
   ```

2. **Check Browser Console**
   - Press F12
   - Look at Console tab for errors

3. **Check Network Tab**
   - See if API calls are working
   - Check response data

4. **Use React DevTools**
   - Install React DevTools browser extension
   - Inspect component state

---

## Remember

- **Components** = Reusable UI pieces
- **State** = Data that changes
- **Props** = Passing data to components
- **Hooks** = Special React functions
- **JSX** = HTML in JavaScript
- **Types** = Data shapes/blueprints

---

**Keep this file open while coding!** 📝
