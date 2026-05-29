import { Input } from '../atoms/input';
import { Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SearchBar = () => {
  const [params, setParams] = useSearchParams();

  const search = params.get('search') || '';

  const [input, setInput] = useState(search);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setParams((prev) => {
        const next = new URLSearchParams(prev);
        if (input) {
          next.set('search', input);
        } else {
          next.delete('search');
        }
        return next;
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [input]);

  return (
    <div className="relative w-full md:w-72 lg:w-80">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

      <Input
        value={input}
        type="text"
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search products..."
        className="w-full pl-10 border border-gray-400 transition-colors"
      />
    </div>
  );
};

export default SearchBar;
