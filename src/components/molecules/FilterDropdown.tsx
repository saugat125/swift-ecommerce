import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/atoms/select';
import { useSearchParams } from 'react-router-dom';

const FilterDropdown = ({ categories }: { categories: string[] }) => {
  const [params, setParams] = useSearchParams();

  const category = params.get('category') || '';

  const handleChange = (value: string) => {
    const newParams = new URLSearchParams(params);

    if (value === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', value);
    }

    setParams(newParams);
  };

  return (
    <Select value={category || 'all'} onValueChange={handleChange}>
      <SelectTrigger className="w-45 border border-gray-400">
        <SelectValue placeholder="Filter category" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="all">All</SelectItem>

        {categories.map((category) => (
          <SelectItem key={category} value={category}>
            {category}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default FilterDropdown;
