import './App.css'

// Placeholder components - to be implemented in later steps
const PasswordFormPlaceholder = () => (
  <div className="border-2 border-dashed border-gray-300 p-8 rounded-lg text-center">
    <h2 className="text-lg font-semibold text-gray-600">Password Form Component</h2>
    <p className="text-gray-500">Will be implemented in Step 3.3</p>
  </div>
)

const PasswordListPlaceholder = () => (
  <div className="border-2 border-dashed border-gray-300 p-8 rounded-lg text-center">
    <h2 className="text-lg font-semibold text-gray-600">Password List Component</h2>
    <p className="text-gray-500">Will be implemented in Step 3.4</p>
  </div>
)

function App() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Password Generator</h1>
        <p className="text-gray-600 mt-2">Generate secure, memorable passwords</p>
      </header>

      <main className="space-y-8">
        <PasswordFormPlaceholder />
        <PasswordListPlaceholder />
      </main>
    </div>
  )
}

export default App
