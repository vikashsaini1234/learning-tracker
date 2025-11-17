import { useEffect, useState, useRef } from "react";
import api from "../services/api";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import CategoryTile from "../components/CategoryTile";
import AddCategoryForm from "../components/AddCategoryForm";
import FloatingPanel from "../components/FloatingPanel";

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showAdd, setShowAdd] = useState(false);
  const addRef = useRef(null);

  const load = () => {
    setLoading(true);
    api.get('/categories').then(r=>setCategories(r.data)).catch((err) => {
  if (err.isColdStart) {
    setError(err.message);
  } else {
    setError(err.message || "Failed to load data");
  }
}).finally(()=>setLoading(false));
  };

  useEffect(()=>{ load(); }, []);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold"></h1>
        <div className="flex items-center gap-3">
          <button ref={addRef} onClick={()=>setShowAdd(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg">+ Add Category</button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((c,i)=>(<CategoryTile key={c.id} category={c} index={i}/>))}
      </div>

      <FloatingPanel open={showAdd} onClose={()=>setShowAdd(false)} anchorRef={addRef}>
        <AddCategoryForm onClose={()=>setShowAdd(false)} onCreated={load} />
      </FloatingPanel>
    </div>
  );
}
