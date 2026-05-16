#!/usr/bin/env bash
set -e

# Initialize Husky
echo "Initializing Husky..."
pnpm exec husky install

# Create pre-commit hook
echo "Creating pre-commit hook..."
cat > .husky/pre-commit << 'EOF'
#!/usr/bin/env bash
. "$(dirname "$0")/_/husky.sh"

pnpm lint-staged
EOF

chmod +x .husky/pre-commit

echo "✓ Husky + lint-staged initialized successfully"
