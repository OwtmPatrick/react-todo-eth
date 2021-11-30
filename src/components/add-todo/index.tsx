import React, {useState, FormEvent} from 'react';
import {Stack, IStackTokens} from '@fluentui/react';
import {TextField} from '@fluentui/react/lib/TextField';
import {PrimaryButton} from '@fluentui/react/lib/Button';

interface IAddTodo {
	addTodo: Function;
}

const stackTokens: IStackTokens = {childrenGap: 10};

const AddTodo: React.FC<IAddTodo> = ({addTodo}): JSX.Element => {
	const [todoName, setTodoName] = useState<string>('');

	const onChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
		const target = event.target as HTMLInputElement;

		setTodoName(target.value);
	};

	return (
		<Stack horizontal tokens={stackTokens}>
			<TextField value={todoName} onChange={onChange} />

			<PrimaryButton onClick={() => addTodo(todoName)} disabled={!todoName}>
				Add todo
			</PrimaryButton>
		</Stack>
	);
};

export default AddTodo;
