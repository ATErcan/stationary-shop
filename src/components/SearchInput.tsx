'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "./ui/input";
import useDebounce from "./hooks/useDebounce";

export default function SearchInput() {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");

  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      router.push(`?search=${debouncedSearch.trim()}`);
    } else {
      router.push("/");
    }
  }, [debouncedSearch, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="w-full lg:max-w-[75rem] mx-auto">
      <Input
        name="search"
        type="search"
        placeholder="Search for a product"
        onChange={handleChange}
        value={searchInput}
        className="max-w-96"
      />
    </div>
  );
}