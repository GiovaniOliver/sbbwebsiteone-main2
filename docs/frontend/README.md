# SBB DAO Frontend Documentation

## Overview
This documentation provides comprehensive information about the SBB DAO frontend development, including component library, page structure, and development workflow.

## Table of Contents

### 1. [Component Library](./component-library.md)
- Complete list of components
- Component organization
- Usage guidelines
- Development standards

### 2. [Page Structure](./page-structure.md)
- Route organization
- Page layouts
- Component hierarchy
- Navigation structure

### 3. [Development Workflow](./development-workflow.md)
- Setup instructions
- Coding standards
- Git workflow
- Deployment process

## Quick Start

### Prerequisites
- Node.js v18 or higher
- npm or yarn
- Git
- VS Code (recommended)

### Installation
```bash
# Clone the repository
git clone https://github.com/your-org/sbb-dao.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Start development server
npm run dev
```

### Development
1. Create a new feature branch
2. Make your changes
3. Run tests and linting
4. Create a pull request
5. Get code review
6. Merge to develop

## Project Structure
```
src/
├── app/                    # Next.js app directory
├── components/            # React components
├── lib/                   # Utility functions
├── hooks/                # Custom React hooks
├── context/              # React context providers
├── types/                # TypeScript type definitions
└── styles/               # Global styles
```

## Key Technologies
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- LiveKit
- Supabase

## Getting Help
- Check the documentation
- Review existing issues
- Contact the development team
- Join the community

## Contributing
Please read our [Contributing Guidelines](../CONTRIBUTING.md) before submitting pull requests.

## License
This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details. 