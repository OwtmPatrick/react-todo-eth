import React from 'react';
import {Stack, Checkbox} from '@fluentui/react';

interface ITask {
	id: string;
	content: string;
	completed: boolean;
}

interface ITodoList {
	tasks: ITask[] | [];
	toggleTodo: Function;
}

const stackTokens = {childrenGap: 12};

const TodoList: React.FC<ITodoList> = ({tasks, toggleTodo}): JSX.Element => {
	const onToggleTodo = (id: string): void => toggleTodo(id);

	return (
		<Stack tokens={stackTokens}>
			{tasks.map(
				({id, content, completed}: ITask): JSX.Element => (
					<Checkbox
						key={id}
						label={content}
						checked={completed}
						onChange={() => onToggleTodo(id)}
					/>
				)
			)}
		</Stack>
	);
};

export default TodoList;
