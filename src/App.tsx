import {useEffect, useState} from 'react';
import Web3 from 'web3';
import {Stack, IStackStyles, IStackTokens} from '@fluentui/react/lib/Stack';
import {Spinner, SpinnerSize} from '@fluentui/react/lib/Spinner';
import {Label} from '@fluentui/react/lib/Label';
import {DefaultPalette} from '@fluentui/react/lib/Styling';
import TodoList from './build/contracts/TodoList.json';
import Account from './components/account';
import AddTodo from './components/add-todo';
import List from './components/todolist';
import './App.css';

const LOCAL_PROVIDER_URL = 'http://localhost:8545';

const stackStyles: IStackStyles = {
	root: {
		background: DefaultPalette.themeTertiary,
		height: '100%'
	}
};

const addTodoStyles: IStackStyles = {
	root: {
		marginTop: '50px !important',
		marginBottom: '20px'
	}
};

const itemAlignmentsStackTokens: IStackTokens = {
	padding: 16
};

const centerStackTokens: IStackTokens = {
	childrenGap: 24
};

interface ITask {
	id: string;
	content: string;
	completed: boolean;
}

function App() {
	const [account, setAccount] = useState<string | null>(null);
	const [balance, setBalance] = useState<number | string>(0);
	const [tasks, setTasks] = useState<ITask[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const loadBlockchainData = async () => {
			await getAccount();
			await getTasks();
			setLoading(false);
		};

		loadBlockchainData();
	}, []);

	const getAccount = async () => {
		const web3 = new Web3(Web3.givenProvider || LOCAL_PROVIDER_URL);

		const accounts = await web3.eth.getAccounts();
		const account = accounts[0];

		if (account) {
			const balance = web3.utils.fromWei(await web3.eth.getBalance(account), 'ether');

			setAccount(account);
			setBalance(balance);
		}
	};

	const getContract = async () => {
		const web3 = new Web3(Web3.givenProvider || LOCAL_PROVIDER_URL);
		const abi: any = TodoList.abi;
		const lastNetworkIndex: number = Object.values(TodoList.networks).length - 1;
		const address = Object.values(TodoList.networks)[lastNetworkIndex].address;

		return new web3.eth.Contract(abi, address);
	};

	const getTasks = async () => {
		const todoList = await getContract();
		const taskCount = await todoList.methods.getTasksCount().call();
		const tasks = [];

		for (let i = 1; i <= taskCount; i++) {
			const task = await todoList.methods.tasks(i).call();

			tasks.push(task);
		}

		setTasks(tasks);
	};

	const addTodo = async (task: any) => {
		const todoList = await getContract();

		await todoList.methods.createTask(task).send({from: account});
		await getTasks();
	};

	const toggleTodo = async (id: string) => {
		const todoList = await getContract();

		await todoList.methods.toggleCompleted(id).send({from: account});
		await getTasks();
	};

	if (loading) {
		return (
			<Stack styles={stackStyles} horizontalAlign="center" verticalAlign="center">
				<Spinner size={SpinnerSize.medium} />
			</Stack>
		);
	}

	return (
		<Stack styles={stackStyles} tokens={itemAlignmentsStackTokens}>
			{account ? (
				<>
					<Stack.Item align="start">
						<Account account={account} balance={balance} />
					</Stack.Item>

					<Stack.Item align="center" styles={addTodoStyles}>
						<Stack tokens={centerStackTokens}>
							<Stack.Item align="start">
								<AddTodo addTodo={addTodo} />
							</Stack.Item>

							<Stack.Item align="start">
								<List tasks={tasks} toggleTodo={toggleTodo} />
							</Stack.Item>
						</Stack>
					</Stack.Item>
				</>
			) : (
				<Stack.Item align="center">
					<Label>
						Please make sure that your metamask account is connected to this site and
						has sufficient value of ETH to make transactions, then reload page
					</Label>
				</Stack.Item>
			)}
		</Stack>
	);
}

export default App;
