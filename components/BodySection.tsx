import { useIsMobile } from "@/hooks/useIsMobileScreen";
import Image from "next/image";
import { useState } from "react";
import check from "../public/icons/icon-check.svg";
import cross from "../public/icons/icon-cross.svg";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export const BodySection = () => {
  const isMobileScreen = useIsMobile();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const handleAddTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTodo.trim()) {
      const newItem: Todo = {
        id: Date.now(),
        title: newTodo.trim(),
        completed: false,
      };
      setTodos((prev) => [...prev, newItem]);
      setNewTodo("");
    }
  };

  const submitTodo = () => {
    if (newTodo.trim()) {
      const newItem: Todo = {
        id: Date.now(),
        title: newTodo.trim(),
        completed: false,
      };
      setTodos((prev) => [...prev, newItem]);
      setNewTodo("");
    }
  };

  const toggleComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <section className="mt-10">
      {/* Input */}
      <div className="dark:bg-dark-veryDarkDesaturatedBlue bg-light-veryLightGray gap-8 ps-7 pe-4 flex items-center rounded-md shadow-lg">
        <div className="p-3 md:p-4 border dark:border-dark-veryDarkGrayishBlue rounded-full" />

        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={handleAddTodo}
          className="h-14 md:h-[75px] flex-1 bg-transparent p-0 m-0 outline-none md:text-2xl dark:text-dark-lightGrayishBlue text-light-darkGrayishBlue"
          placeholder="Create a new todo..."
        />

        {isMobileScreen && (
          <p
            onClick={submitTodo}
            className="dark:text-dark-lightGrayishBlue text-light-darkGrayishBlue p-4 cursor-pointer"
          >
            SUBMIT
          </p>
        )}
      </div>

      {/* Todo List */}
      <div className="dark:bg-dark-veryDarkDesaturatedBlue bg-light-veryLightGray rounded-md mt-4 md:mt-8 shadow-lg">
        <div className="max-h-[450px] rounded-t-md overflow-y-scroll">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleComplete}
              onDelete={deleteTodo}
            />
          ))}
        </div>

        {/* Filter Desktop */}
        <div className="gap-8 py-5 px-7 flex justify-between items-center">
          <p className="dark:text-dark-darkGrayishBlue text-light-darkGrayishBlue cursor-pointer">
            {todos.filter((t) => !t.completed).length} items left
          </p>

          <div className="hidden gap-4 md:flex">
            {(["all", "active", "completed"] as const).map((f) => (
              <p
                key={f}
                onClick={() => setFilter(f)}
                className={`${
                  filter === f
                    ? "text-primary-blue dark:text-primary-blue"
                    : "dark:text-dark-darkGrayishBlue text-light-darkGrayishBlue"
                } font-semibold cursor-pointer`}
              >
                {f[0].toUpperCase() + f.slice(1)}
              </p>
            ))}
          </div>

          <p
            onClick={clearCompleted}
            className="dark:text-dark-darkGrayishBlue text-light-darkGrayishBlue cursor-pointer"
          >
            Clear Completed
          </p>
        </div>
      </div>

      {/* Filter mobile */}
      <div className="flex justify-center gap-4 mt-4 p-4 rounded-md md:hidden dark:bg-dark-veryDarkDesaturatedBlue bg-light-veryLightGray shadow-lg">
        {(["all", "active", "completed"] as const).map((f) => (
          <p
            key={f}
            onClick={() => setFilter(f)}
            className={`${
              filter === f
                ? "text-primary-blue dark:text-primary-blue"
                : "dark:text-dark-darkGrayishBlue text-light-darkGrayishBlue"
            } font-semibold cursor-pointer`}
          >
            {f[0].toUpperCase() + f.slice(1)}
          </p>
        ))}
      </div>
    </section>
  );
};

const TodoItem = ({
  todo,
  onToggle,
  onDelete,
}: {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="gap-8 p-5 ps-7 flex items-center border-b dark:border-b-dark-veryDarkGrayishBlue"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        onClick={() => onToggle(todo.id)}
        className={`p-[1px] rounded-full bg-gradient-to-r hover:from-primary-gradientFrom hover:to-primary-gradientTo cursor-pointer ${
          !todo.completed && "border dark:border-dark-veryDarkGrayishBlue"
        }`}
      >
        <div
          className={`w-[22px] h-[22px] md:w-[30px] md:h-[30px] rounded-full flex items-center justify-center ${
            todo.completed
              ? "bg-gradient-to-r from-primary-gradientFrom to-primary-gradientTo"
              : "bg-light-veryLightGray dark:bg-dark-veryDarkDesaturatedBlue"
          }`}
        >
          {todo.completed && <Image src={check} alt="check" />}
        </div>
      </div>

      <div className="flex flex-1 justify-between items-center">
        <p
          className={
            todo.completed
              ? "md:text-2xl line-through dark:text-dark-darkGrayishBlue text-light-lightGrayishBlue"
              : "md:text-2xl dark:text-dark-lightGrayishBlue text-light-darkGrayishBlue"
          }
        >
          {todo.title}
        </p>

        {hover && (
          <Image
            src={cross}
            alt="cross"
            onClick={() => onDelete(todo.id)}
            className="h-5 w-5 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};
