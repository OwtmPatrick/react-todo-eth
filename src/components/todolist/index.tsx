import React from 'react';
import {Stack, Checkbox} from '@fluentui/react';

interface ITask {
	id: string;
	content: string;
	completed: boolean;
}

interface ITodoList {
	tasks: ITask[] | [];
}

const stackTokens = {childrenGap: 16};

const TodoList: React.FC<ITodoList> = ({tasks}): JSX.Element => {
	const onChange = (
		ev?: React.FormEvent<HTMLElement | HTMLInputElement>,
		isChecked?: boolean
	) => {
		console.log(`The option has been changed to ${isChecked}.`);
	};

	return (
		<Stack tokens={stackTokens}>
			{tasks.map(
				({id, content, completed}: ITask): JSX.Element => (
					<Checkbox
						key={id}
						label={content}
						checked={completed}
						onChange={onChange}
					/>
				)
			)}
		</Stack>
	);
};

export default TodoList;
