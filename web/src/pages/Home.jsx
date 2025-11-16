import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <div className="space-y-10">
      <section className="bg-gradient-to-r from-indigo-50 via-white to-pink-50 rounded-2xl p-10 shadow-lg">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold mb-4">Learning Tracker — Plan. Learn. Win.</h1>
          <p className="text-gray-600 mb-6">Organize your learning into categories and topics, track progress, import bulk topics, and stay focused.</p>
          <div className="flex justify-center gap-4">
            <Link to="/category" className="px-6 py-3 rounded-lg border border-gray-200">Browse Categories</Link>
            <Link to="/topics" className="px-6 py-3 rounded-lg border border-gray-200">Browse Topics</Link>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="font-semibold mb-2">Organize</h3>
          <p className="text-sm text-gray-600">Create categories and topics to structure your study plan.</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="font-semibold mb-2">Track</h3>
          <p className="text-sm text-gray-600">Visual progress bars and status chips help you know what's next.</p>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <h3 className="font-semibold mb-2">Import</h3>
          <p className="text-sm text-gray-600">Import topics via Excel for rapid setup.</p>
        </div>
      </section>

      <section className="bg-white rounded-xl p-6 shadow flex items-center gap-6">
        <div className="w-24 h-24 bg-gradient-to-br from-indigo-400 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">✨</div>
        <div>
          <h4 className="font-semibold">Future: Profiles & Learning Material</h4>
          <p className="text-sm text-gray-600">Multi-user profiles, saved resources, and recommended learning paths are planned for future versions.</p>
        </div>
      </section>
    </div>
  );
}
