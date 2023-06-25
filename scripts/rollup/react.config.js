import { getBaseRollupPlugins, getPackageJSON, resolvePkgPath } from './utils';
import generatePackageJson from 'rollup-plugin-generate-package-json'; //用来一起打包进package.json的

const { name } = getPackageJSON('react');
// react包的路径
const pkgPath = resolvePkgPath(name);
// react产物路径
const pkgDistPath = resolvePkgPath(name, true);

// 不希望入口是写死的 希望能用代码找到路径
export default [
	// react
	{
		input: `${pkgPath}/index.ts`,
		output: {
			file: `${pkgDistPath}/index.js`,
			name: 'index.js',
			format: 'umd'
		},
		plugins: [
			...getBaseRollupPlugins(),
			generatePackageJson({
				inputFolder: pkgPath,
				outputFolder: pkgDistPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					main: 'index.js'
				})
			})
		]
	},
	// jsx-runtime
	{
		input: `${pkgPath}/src/jsx.ts`,
		output: [
			{
				file: `${pkgDistPath}/jsx-dev-runtime.js`,
				name: 'jsx-dev-runtime.js',
				format: 'umd'
			},
			{
				file: `${pkgDistPath}/jsx-runtime.js`,
				name: 'jsx-runtime.js',
				format: 'umd'
			}
		],
		plugins: getBaseRollupPlugins()
	}
];
