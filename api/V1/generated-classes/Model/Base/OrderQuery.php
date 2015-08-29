<?php

namespace Model\Base;

use \Exception;
use \PDO;
use Model\Order as ChildOrder;
use Model\OrderQuery as ChildOrderQuery;
use Model\Map\OrderTableMap;
use Propel\Runtime\Propel;
use Propel\Runtime\ActiveQuery\Criteria;
use Propel\Runtime\ActiveQuery\ModelCriteria;
use Propel\Runtime\ActiveQuery\ModelJoin;
use Propel\Runtime\Collection\ObjectCollection;
use Propel\Runtime\Connection\ConnectionInterface;
use Propel\Runtime\Exception\PropelException;

/**
 * Base class that represents a query for the 'orders' table.
 *
 *
 *
 * @method     ChildOrderQuery orderById($order = Criteria::ASC) Order by the id column
 * @method     ChildOrderQuery orderByTruckId($order = Criteria::ASC) Order by the truck_id column
 * @method     ChildOrderQuery orderByItemName($order = Criteria::ASC) Order by the item_name column
 * @method     ChildOrderQuery orderByPrice($order = Criteria::ASC) Order by the price column
 * @method     ChildOrderQuery orderByChargeId($order = Criteria::ASC) Order by the charge_id column
 * @method     ChildOrderQuery orderByCustomerId($order = Criteria::ASC) Order by the customer_id column
 * @method     ChildOrderQuery orderByCustomerName($order = Criteria::ASC) Order by the customer_name column
 * @method     ChildOrderQuery orderByCustomerEmail($order = Criteria::ASC) Order by the customer_email column
 * @method     ChildOrderQuery orderByCustomerPhoneNumber($order = Criteria::ASC) Order by the customer_phone_number column
 * @method     ChildOrderQuery orderByOpen($order = Criteria::ASC) Order by the open column
 * @method     ChildOrderQuery orderByCreatedAt($order = Criteria::ASC) Order by the created_at column
 * @method     ChildOrderQuery orderByUpdatedAt($order = Criteria::ASC) Order by the updated_at column
 *
 * @method     ChildOrderQuery groupById() Group by the id column
 * @method     ChildOrderQuery groupByTruckId() Group by the truck_id column
 * @method     ChildOrderQuery groupByItemName() Group by the item_name column
 * @method     ChildOrderQuery groupByPrice() Group by the price column
 * @method     ChildOrderQuery groupByChargeId() Group by the charge_id column
 * @method     ChildOrderQuery groupByCustomerId() Group by the customer_id column
 * @method     ChildOrderQuery groupByCustomerName() Group by the customer_name column
 * @method     ChildOrderQuery groupByCustomerEmail() Group by the customer_email column
 * @method     ChildOrderQuery groupByCustomerPhoneNumber() Group by the customer_phone_number column
 * @method     ChildOrderQuery groupByOpen() Group by the open column
 * @method     ChildOrderQuery groupByCreatedAt() Group by the created_at column
 * @method     ChildOrderQuery groupByUpdatedAt() Group by the updated_at column
 *
 * @method     ChildOrderQuery leftJoin($relation) Adds a LEFT JOIN clause to the query
 * @method     ChildOrderQuery rightJoin($relation) Adds a RIGHT JOIN clause to the query
 * @method     ChildOrderQuery innerJoin($relation) Adds a INNER JOIN clause to the query
 *
 * @method     ChildOrderQuery leftJoinWith($relation) Adds a LEFT JOIN clause and with to the query
 * @method     ChildOrderQuery rightJoinWith($relation) Adds a RIGHT JOIN clause and with to the query
 * @method     ChildOrderQuery innerJoinWith($relation) Adds a INNER JOIN clause and with to the query
 *
 * @method     ChildOrderQuery leftJoinTruck($relationAlias = null) Adds a LEFT JOIN clause to the query using the Truck relation
 * @method     ChildOrderQuery rightJoinTruck($relationAlias = null) Adds a RIGHT JOIN clause to the query using the Truck relation
 * @method     ChildOrderQuery innerJoinTruck($relationAlias = null) Adds a INNER JOIN clause to the query using the Truck relation
 *
 * @method     ChildOrderQuery joinWithTruck($joinType = Criteria::INNER_JOIN) Adds a join clause and with to the query using the Truck relation
 *
 * @method     ChildOrderQuery leftJoinWithTruck() Adds a LEFT JOIN clause and with to the query using the Truck relation
 * @method     ChildOrderQuery rightJoinWithTruck() Adds a RIGHT JOIN clause and with to the query using the Truck relation
 * @method     ChildOrderQuery innerJoinWithTruck() Adds a INNER JOIN clause and with to the query using the Truck relation
 *
 * @method     \Model\TruckQuery endUse() Finalizes a secondary criteria and merges it with its primary Criteria
 *
 * @method     ChildOrder findOne(ConnectionInterface $con = null) Return the first ChildOrder matching the query
 * @method     ChildOrder findOneOrCreate(ConnectionInterface $con = null) Return the first ChildOrder matching the query, or a new ChildOrder object populated from the query conditions when no match is found
 *
 * @method     ChildOrder findOneById(int $id) Return the first ChildOrder filtered by the id column
 * @method     ChildOrder findOneByTruckId(int $truck_id) Return the first ChildOrder filtered by the truck_id column
 * @method     ChildOrder findOneByItemName(string $item_name) Return the first ChildOrder filtered by the item_name column
 * @method     ChildOrder findOneByPrice(double $price) Return the first ChildOrder filtered by the price column
 * @method     ChildOrder findOneByChargeId(string $charge_id) Return the first ChildOrder filtered by the charge_id column
 * @method     ChildOrder findOneByCustomerId(string $customer_id) Return the first ChildOrder filtered by the customer_id column
 * @method     ChildOrder findOneByCustomerName(string $customer_name) Return the first ChildOrder filtered by the customer_name column
 * @method     ChildOrder findOneByCustomerEmail(string $customer_email) Return the first ChildOrder filtered by the customer_email column
 * @method     ChildOrder findOneByCustomerPhoneNumber(string $customer_phone_number) Return the first ChildOrder filtered by the customer_phone_number column
 * @method     ChildOrder findOneByOpen(boolean $open) Return the first ChildOrder filtered by the open column
 * @method     ChildOrder findOneByCreatedAt(string $created_at) Return the first ChildOrder filtered by the created_at column
 * @method     ChildOrder findOneByUpdatedAt(string $updated_at) Return the first ChildOrder filtered by the updated_at column *

 * @method     ChildOrder requirePk($key, ConnectionInterface $con = null) Return the ChildOrder by primary key and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildOrder requireOne(ConnectionInterface $con = null) Return the first ChildOrder matching the query and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 *
 * @method     ChildOrder requireOneById(int $id) Return the first ChildOrder filtered by the id column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildOrder requireOneByTruckId(int $truck_id) Return the first ChildOrder filtered by the truck_id column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildOrder requireOneByItemName(string $item_name) Return the first ChildOrder filtered by the item_name column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildOrder requireOneByPrice(double $price) Return the first ChildOrder filtered by the price column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildOrder requireOneByChargeId(string $charge_id) Return the first ChildOrder filtered by the charge_id column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildOrder requireOneByCustomerId(string $customer_id) Return the first ChildOrder filtered by the customer_id column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildOrder requireOneByCustomerName(string $customer_name) Return the first ChildOrder filtered by the customer_name column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildOrder requireOneByCustomerEmail(string $customer_email) Return the first ChildOrder filtered by the customer_email column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildOrder requireOneByCustomerPhoneNumber(string $customer_phone_number) Return the first ChildOrder filtered by the customer_phone_number column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildOrder requireOneByOpen(boolean $open) Return the first ChildOrder filtered by the open column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildOrder requireOneByCreatedAt(string $created_at) Return the first ChildOrder filtered by the created_at column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 * @method     ChildOrder requireOneByUpdatedAt(string $updated_at) Return the first ChildOrder filtered by the updated_at column and throws \Propel\Runtime\Exception\EntityNotFoundException when not found
 *
 * @method     ChildOrder[]|ObjectCollection find(ConnectionInterface $con = null) Return ChildOrder objects based on current ModelCriteria
 * @method     ChildOrder[]|ObjectCollection findById(int $id) Return ChildOrder objects filtered by the id column
 * @method     ChildOrder[]|ObjectCollection findByTruckId(int $truck_id) Return ChildOrder objects filtered by the truck_id column
 * @method     ChildOrder[]|ObjectCollection findByItemName(string $item_name) Return ChildOrder objects filtered by the item_name column
 * @method     ChildOrder[]|ObjectCollection findByPrice(double $price) Return ChildOrder objects filtered by the price column
 * @method     ChildOrder[]|ObjectCollection findByChargeId(string $charge_id) Return ChildOrder objects filtered by the charge_id column
 * @method     ChildOrder[]|ObjectCollection findByCustomerId(string $customer_id) Return ChildOrder objects filtered by the customer_id column
 * @method     ChildOrder[]|ObjectCollection findByCustomerName(string $customer_name) Return ChildOrder objects filtered by the customer_name column
 * @method     ChildOrder[]|ObjectCollection findByCustomerEmail(string $customer_email) Return ChildOrder objects filtered by the customer_email column
 * @method     ChildOrder[]|ObjectCollection findByCustomerPhoneNumber(string $customer_phone_number) Return ChildOrder objects filtered by the customer_phone_number column
 * @method     ChildOrder[]|ObjectCollection findByOpen(boolean $open) Return ChildOrder objects filtered by the open column
 * @method     ChildOrder[]|ObjectCollection findByCreatedAt(string $created_at) Return ChildOrder objects filtered by the created_at column
 * @method     ChildOrder[]|ObjectCollection findByUpdatedAt(string $updated_at) Return ChildOrder objects filtered by the updated_at column
 * @method     ChildOrder[]|\Propel\Runtime\Util\PropelModelPager paginate($page = 1, $maxPerPage = 10, ConnectionInterface $con = null) Issue a SELECT query based on the current ModelCriteria and uses a page and a maximum number of results per page to compute an offset and a limit
 *
 */
abstract class OrderQuery extends ModelCriteria
{
    protected $entityNotFoundExceptionClass = '\\Propel\\Runtime\\Exception\\EntityNotFoundException';

    /**
     * Initializes internal state of \Model\Base\OrderQuery object.
     *
     * @param     string $dbName The database name
     * @param     string $modelName The phpName of a model, e.g. 'Book'
     * @param     string $modelAlias The alias for the model in this query, e.g. 'b'
     */
    public function __construct($dbName = 'truckyeah', $modelName = '\\Model\\Order', $modelAlias = null)
    {
        parent::__construct($dbName, $modelName, $modelAlias);
    }

    /**
     * Returns a new ChildOrderQuery object.
     *
     * @param     string $modelAlias The alias of a model in the query
     * @param     Criteria $criteria Optional Criteria to build the query from
     *
     * @return ChildOrderQuery
     */
    public static function create($modelAlias = null, Criteria $criteria = null)
    {
        if ($criteria instanceof ChildOrderQuery) {
            return $criteria;
        }
        $query = new ChildOrderQuery();
        if (null !== $modelAlias) {
            $query->setModelAlias($modelAlias);
        }
        if ($criteria instanceof Criteria) {
            $query->mergeWith($criteria);
        }

        return $query;
    }

    /**
     * Find object by primary key.
     * Propel uses the instance pool to skip the database if the object exists.
     * Go fast if the query is untouched.
     *
     * <code>
     * $obj  = $c->findPk(12, $con);
     * </code>
     *
     * @param mixed $key Primary key to use for the query
     * @param ConnectionInterface $con an optional connection object
     *
     * @return ChildOrder|array|mixed the result, formatted by the current formatter
     */
    public function findPk($key, ConnectionInterface $con = null)
    {
        if ($key === null) {
            return null;
        }
        if ((null !== ($obj = OrderTableMap::getInstanceFromPool((string) $key))) && !$this->formatter) {
            // the object is already in the instance pool
            return $obj;
        }
        if ($con === null) {
            $con = Propel::getServiceContainer()->getReadConnection(OrderTableMap::DATABASE_NAME);
        }
        $this->basePreSelect($con);
        if ($this->formatter || $this->modelAlias || $this->with || $this->select
         || $this->selectColumns || $this->asColumns || $this->selectModifiers
         || $this->map || $this->having || $this->joins) {
            return $this->findPkComplex($key, $con);
        } else {
            return $this->findPkSimple($key, $con);
        }
    }

    /**
     * Find object by primary key using raw SQL to go fast.
     * Bypass doSelect() and the object formatter by using generated code.
     *
     * @param     mixed $key Primary key to use for the query
     * @param     ConnectionInterface $con A connection object
     *
     * @throws \Propel\Runtime\Exception\PropelException
     *
     * @return ChildOrder A model object, or null if the key is not found
     */
    protected function findPkSimple($key, ConnectionInterface $con)
    {
        $sql = 'SELECT id, truck_id, item_name, price, charge_id, customer_id, customer_name, customer_email, customer_phone_number, open, created_at, updated_at FROM orders WHERE id = :p0';
        try {
            $stmt = $con->prepare($sql);
            $stmt->bindValue(':p0', $key, PDO::PARAM_INT);
            $stmt->execute();
        } catch (Exception $e) {
            Propel::log($e->getMessage(), Propel::LOG_ERR);
            throw new PropelException(sprintf('Unable to execute SELECT statement [%s]', $sql), 0, $e);
        }
        $obj = null;
        if ($row = $stmt->fetch(\PDO::FETCH_NUM)) {
            /** @var ChildOrder $obj */
            $obj = new ChildOrder();
            $obj->hydrate($row);
            OrderTableMap::addInstanceToPool($obj, (string) $key);
        }
        $stmt->closeCursor();

        return $obj;
    }

    /**
     * Find object by primary key.
     *
     * @param     mixed $key Primary key to use for the query
     * @param     ConnectionInterface $con A connection object
     *
     * @return ChildOrder|array|mixed the result, formatted by the current formatter
     */
    protected function findPkComplex($key, ConnectionInterface $con)
    {
        // As the query uses a PK condition, no limit(1) is necessary.
        $criteria = $this->isKeepQuery() ? clone $this : $this;
        $dataFetcher = $criteria
            ->filterByPrimaryKey($key)
            ->doSelect($con);

        return $criteria->getFormatter()->init($criteria)->formatOne($dataFetcher);
    }

    /**
     * Find objects by primary key
     * <code>
     * $objs = $c->findPks(array(12, 56, 832), $con);
     * </code>
     * @param     array $keys Primary keys to use for the query
     * @param     ConnectionInterface $con an optional connection object
     *
     * @return ObjectCollection|array|mixed the list of results, formatted by the current formatter
     */
    public function findPks($keys, ConnectionInterface $con = null)
    {
        if (null === $con) {
            $con = Propel::getServiceContainer()->getReadConnection($this->getDbName());
        }
        $this->basePreSelect($con);
        $criteria = $this->isKeepQuery() ? clone $this : $this;
        $dataFetcher = $criteria
            ->filterByPrimaryKeys($keys)
            ->doSelect($con);

        return $criteria->getFormatter()->init($criteria)->format($dataFetcher);
    }

    /**
     * Filter the query by primary key
     *
     * @param     mixed $key Primary key to use for the query
     *
     * @return $this|ChildOrderQuery The current query, for fluid interface
     */
    public function filterByPrimaryKey($key)
    {

        return $this->addUsingAlias(OrderTableMap::COL_ID, $key, Criteria::EQUAL);
    }

    /**
     * Filter the query by a list of primary keys
     *
     * @param     array $keys The list of primary key to use for the query
     *
     * @return $this|ChildOrderQuery The current query, for fluid interface
     */
    public function filterByPrimaryKeys($keys)
    {

        return $this->addUsingAlias(OrderTableMap::COL_ID, $keys, Criteria::IN);
    }

    /**
     * Filter the query on the id column
     *
     * Example usage:
     * <code>
     * $query->filterById(1234); // WHERE id = 1234
     * $query->filterById(array(12, 34)); // WHERE id IN (12, 34)
     * $query->filterById(array('min' => 12)); // WHERE id > 12
     * </code>
     *
     * @param     mixed $id The value to use as filter.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildOrderQuery The current query, for fluid interface
     */
    public function filterById($id = null, $comparison = null)
    {
        if (is_array($id)) {
            $useMinMax = false;
            if (isset($id['min'])) {
                $this->addUsingAlias(OrderTableMap::COL_ID, $id['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($id['max'])) {
                $this->addUsingAlias(OrderTableMap::COL_ID, $id['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(OrderTableMap::COL_ID, $id, $comparison);
    }

    /**
     * Filter the query on the truck_id column
     *
     * Example usage:
     * <code>
     * $query->filterByTruckId(1234); // WHERE truck_id = 1234
     * $query->filterByTruckId(array(12, 34)); // WHERE truck_id IN (12, 34)
     * $query->filterByTruckId(array('min' => 12)); // WHERE truck_id > 12
     * </code>
     *
     * @see       filterByTruck()
     *
     * @param     mixed $truckId The value to use as filter.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildOrderQuery The current query, for fluid interface
     */
    public function filterByTruckId($truckId = null, $comparison = null)
    {
        if (is_array($truckId)) {
            $useMinMax = false;
            if (isset($truckId['min'])) {
                $this->addUsingAlias(OrderTableMap::COL_TRUCK_ID, $truckId['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($truckId['max'])) {
                $this->addUsingAlias(OrderTableMap::COL_TRUCK_ID, $truckId['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(OrderTableMap::COL_TRUCK_ID, $truckId, $comparison);
    }

    /**
     * Filter the query on the item_name column
     *
     * Example usage:
     * <code>
     * $query->filterByItemName('fooValue');   // WHERE item_name = 'fooValue'
     * $query->filterByItemName('%fooValue%'); // WHERE item_name LIKE '%fooValue%'
     * </code>
     *
     * @param     string $itemName The value to use as filter.
     *              Accepts wildcards (* and % trigger a LIKE)
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildOrderQuery The current query, for fluid interface
     */
    public function filterByItemName($itemName = null, $comparison = null)
    {
        if (null === $comparison) {
            if (is_array($itemName)) {
                $comparison = Criteria::IN;
            } elseif (preg_match('/[\%\*]/', $itemName)) {
                $itemName = str_replace('*', '%', $itemName);
                $comparison = Criteria::LIKE;
            }
        }

        return $this->addUsingAlias(OrderTableMap::COL_ITEM_NAME, $itemName, $comparison);
    }

    /**
     * Filter the query on the price column
     *
     * Example usage:
     * <code>
     * $query->filterByPrice(1234); // WHERE price = 1234
     * $query->filterByPrice(array(12, 34)); // WHERE price IN (12, 34)
     * $query->filterByPrice(array('min' => 12)); // WHERE price > 12
     * </code>
     *
     * @param     mixed $price The value to use as filter.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildOrderQuery The current query, for fluid interface
     */
    public function filterByPrice($price = null, $comparison = null)
    {
        if (is_array($price)) {
            $useMinMax = false;
            if (isset($price['min'])) {
                $this->addUsingAlias(OrderTableMap::COL_PRICE, $price['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($price['max'])) {
                $this->addUsingAlias(OrderTableMap::COL_PRICE, $price['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(OrderTableMap::COL_PRICE, $price, $comparison);
    }

    /**
     * Filter the query on the charge_id column
     *
     * Example usage:
     * <code>
     * $query->filterByChargeId('fooValue');   // WHERE charge_id = 'fooValue'
     * $query->filterByChargeId('%fooValue%'); // WHERE charge_id LIKE '%fooValue%'
     * </code>
     *
     * @param     string $chargeId The value to use as filter.
     *              Accepts wildcards (* and % trigger a LIKE)
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildOrderQuery The current query, for fluid interface
     */
    public function filterByChargeId($chargeId = null, $comparison = null)
    {
        if (null === $comparison) {
            if (is_array($chargeId)) {
                $comparison = Criteria::IN;
            } elseif (preg_match('/[\%\*]/', $chargeId)) {
                $chargeId = str_replace('*', '%', $chargeId);
                $comparison = Criteria::LIKE;
            }
        }

        return $this->addUsingAlias(OrderTableMap::COL_CHARGE_ID, $chargeId, $comparison);
    }

    /**
     * Filter the query on the customer_id column
     *
     * Example usage:
     * <code>
     * $query->filterByCustomerId('fooValue');   // WHERE customer_id = 'fooValue'
     * $query->filterByCustomerId('%fooValue%'); // WHERE customer_id LIKE '%fooValue%'
     * </code>
     *
     * @param     string $customerId The value to use as filter.
     *              Accepts wildcards (* and % trigger a LIKE)
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildOrderQuery The current query, for fluid interface
     */
    public function filterByCustomerId($customerId = null, $comparison = null)
    {
        if (null === $comparison) {
            if (is_array($customerId)) {
                $comparison = Criteria::IN;
            } elseif (preg_match('/[\%\*]/', $customerId)) {
                $customerId = str_replace('*', '%', $customerId);
                $comparison = Criteria::LIKE;
            }
        }

        return $this->addUsingAlias(OrderTableMap::COL_CUSTOMER_ID, $customerId, $comparison);
    }

    /**
     * Filter the query on the customer_name column
     *
     * Example usage:
     * <code>
     * $query->filterByCustomerName('fooValue');   // WHERE customer_name = 'fooValue'
     * $query->filterByCustomerName('%fooValue%'); // WHERE customer_name LIKE '%fooValue%'
     * </code>
     *
     * @param     string $customerName The value to use as filter.
     *              Accepts wildcards (* and % trigger a LIKE)
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildOrderQuery The current query, for fluid interface
     */
    public function filterByCustomerName($customerName = null, $comparison = null)
    {
        if (null === $comparison) {
            if (is_array($customerName)) {
                $comparison = Criteria::IN;
            } elseif (preg_match('/[\%\*]/', $customerName)) {
                $customerName = str_replace('*', '%', $customerName);
                $comparison = Criteria::LIKE;
            }
        }

        return $this->addUsingAlias(OrderTableMap::COL_CUSTOMER_NAME, $customerName, $comparison);
    }

    /**
     * Filter the query on the customer_email column
     *
     * Example usage:
     * <code>
     * $query->filterByCustomerEmail('fooValue');   // WHERE customer_email = 'fooValue'
     * $query->filterByCustomerEmail('%fooValue%'); // WHERE customer_email LIKE '%fooValue%'
     * </code>
     *
     * @param     string $customerEmail The value to use as filter.
     *              Accepts wildcards (* and % trigger a LIKE)
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildOrderQuery The current query, for fluid interface
     */
    public function filterByCustomerEmail($customerEmail = null, $comparison = null)
    {
        if (null === $comparison) {
            if (is_array($customerEmail)) {
                $comparison = Criteria::IN;
            } elseif (preg_match('/[\%\*]/', $customerEmail)) {
                $customerEmail = str_replace('*', '%', $customerEmail);
                $comparison = Criteria::LIKE;
            }
        }

        return $this->addUsingAlias(OrderTableMap::COL_CUSTOMER_EMAIL, $customerEmail, $comparison);
    }

    /**
     * Filter the query on the customer_phone_number column
     *
     * Example usage:
     * <code>
     * $query->filterByCustomerPhoneNumber('fooValue');   // WHERE customer_phone_number = 'fooValue'
     * $query->filterByCustomerPhoneNumber('%fooValue%'); // WHERE customer_phone_number LIKE '%fooValue%'
     * </code>
     *
     * @param     string $customerPhoneNumber The value to use as filter.
     *              Accepts wildcards (* and % trigger a LIKE)
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildOrderQuery The current query, for fluid interface
     */
    public function filterByCustomerPhoneNumber($customerPhoneNumber = null, $comparison = null)
    {
        if (null === $comparison) {
            if (is_array($customerPhoneNumber)) {
                $comparison = Criteria::IN;
            } elseif (preg_match('/[\%\*]/', $customerPhoneNumber)) {
                $customerPhoneNumber = str_replace('*', '%', $customerPhoneNumber);
                $comparison = Criteria::LIKE;
            }
        }

        return $this->addUsingAlias(OrderTableMap::COL_CUSTOMER_PHONE_NUMBER, $customerPhoneNumber, $comparison);
    }

    /**
     * Filter the query on the open column
     *
     * Example usage:
     * <code>
     * $query->filterByOpen(true); // WHERE open = true
     * $query->filterByOpen('yes'); // WHERE open = true
     * </code>
     *
     * @param     boolean|string $open The value to use as filter.
     *              Non-boolean arguments are converted using the following rules:
     *                * 1, '1', 'true',  'on',  and 'yes' are converted to boolean true
     *                * 0, '0', 'false', 'off', and 'no'  are converted to boolean false
     *              Check on string values is case insensitive (so 'FaLsE' is seen as 'false').
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildOrderQuery The current query, for fluid interface
     */
    public function filterByOpen($open = null, $comparison = null)
    {
        if (is_string($open)) {
            $open = in_array(strtolower($open), array('false', 'off', '-', 'no', 'n', '0', '')) ? false : true;
        }

        return $this->addUsingAlias(OrderTableMap::COL_OPEN, $open, $comparison);
    }

    /**
     * Filter the query on the created_at column
     *
     * Example usage:
     * <code>
     * $query->filterByCreatedAt('2011-03-14'); // WHERE created_at = '2011-03-14'
     * $query->filterByCreatedAt('now'); // WHERE created_at = '2011-03-14'
     * $query->filterByCreatedAt(array('max' => 'yesterday')); // WHERE created_at > '2011-03-13'
     * </code>
     *
     * @param     mixed $createdAt The value to use as filter.
     *              Values can be integers (unix timestamps), DateTime objects, or strings.
     *              Empty strings are treated as NULL.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildOrderQuery The current query, for fluid interface
     */
    public function filterByCreatedAt($createdAt = null, $comparison = null)
    {
        if (is_array($createdAt)) {
            $useMinMax = false;
            if (isset($createdAt['min'])) {
                $this->addUsingAlias(OrderTableMap::COL_CREATED_AT, $createdAt['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($createdAt['max'])) {
                $this->addUsingAlias(OrderTableMap::COL_CREATED_AT, $createdAt['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(OrderTableMap::COL_CREATED_AT, $createdAt, $comparison);
    }

    /**
     * Filter the query on the updated_at column
     *
     * Example usage:
     * <code>
     * $query->filterByUpdatedAt('2011-03-14'); // WHERE updated_at = '2011-03-14'
     * $query->filterByUpdatedAt('now'); // WHERE updated_at = '2011-03-14'
     * $query->filterByUpdatedAt(array('max' => 'yesterday')); // WHERE updated_at > '2011-03-13'
     * </code>
     *
     * @param     mixed $updatedAt The value to use as filter.
     *              Values can be integers (unix timestamps), DateTime objects, or strings.
     *              Empty strings are treated as NULL.
     *              Use scalar values for equality.
     *              Use array values for in_array() equivalent.
     *              Use associative array('min' => $minValue, 'max' => $maxValue) for intervals.
     * @param     string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @return $this|ChildOrderQuery The current query, for fluid interface
     */
    public function filterByUpdatedAt($updatedAt = null, $comparison = null)
    {
        if (is_array($updatedAt)) {
            $useMinMax = false;
            if (isset($updatedAt['min'])) {
                $this->addUsingAlias(OrderTableMap::COL_UPDATED_AT, $updatedAt['min'], Criteria::GREATER_EQUAL);
                $useMinMax = true;
            }
            if (isset($updatedAt['max'])) {
                $this->addUsingAlias(OrderTableMap::COL_UPDATED_AT, $updatedAt['max'], Criteria::LESS_EQUAL);
                $useMinMax = true;
            }
            if ($useMinMax) {
                return $this;
            }
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }
        }

        return $this->addUsingAlias(OrderTableMap::COL_UPDATED_AT, $updatedAt, $comparison);
    }

    /**
     * Filter the query by a related \Model\Truck object
     *
     * @param \Model\Truck|ObjectCollection $truck The related object(s) to use as filter
     * @param string $comparison Operator to use for the column comparison, defaults to Criteria::EQUAL
     *
     * @throws \Propel\Runtime\Exception\PropelException
     *
     * @return ChildOrderQuery The current query, for fluid interface
     */
    public function filterByTruck($truck, $comparison = null)
    {
        if ($truck instanceof \Model\Truck) {
            return $this
                ->addUsingAlias(OrderTableMap::COL_TRUCK_ID, $truck->getId(), $comparison);
        } elseif ($truck instanceof ObjectCollection) {
            if (null === $comparison) {
                $comparison = Criteria::IN;
            }

            return $this
                ->addUsingAlias(OrderTableMap::COL_TRUCK_ID, $truck->toKeyValue('PrimaryKey', 'Id'), $comparison);
        } else {
            throw new PropelException('filterByTruck() only accepts arguments of type \Model\Truck or Collection');
        }
    }

    /**
     * Adds a JOIN clause to the query using the Truck relation
     *
     * @param     string $relationAlias optional alias for the relation
     * @param     string $joinType Accepted values are null, 'left join', 'right join', 'inner join'
     *
     * @return $this|ChildOrderQuery The current query, for fluid interface
     */
    public function joinTruck($relationAlias = null, $joinType = Criteria::INNER_JOIN)
    {
        $tableMap = $this->getTableMap();
        $relationMap = $tableMap->getRelation('Truck');

        // create a ModelJoin object for this join
        $join = new ModelJoin();
        $join->setJoinType($joinType);
        $join->setRelationMap($relationMap, $this->useAliasInSQL ? $this->getModelAlias() : null, $relationAlias);
        if ($previousJoin = $this->getPreviousJoin()) {
            $join->setPreviousJoin($previousJoin);
        }

        // add the ModelJoin to the current object
        if ($relationAlias) {
            $this->addAlias($relationAlias, $relationMap->getRightTable()->getName());
            $this->addJoinObject($join, $relationAlias);
        } else {
            $this->addJoinObject($join, 'Truck');
        }

        return $this;
    }

    /**
     * Use the Truck relation Truck object
     *
     * @see useQuery()
     *
     * @param     string $relationAlias optional alias for the relation,
     *                                   to be used as main alias in the secondary query
     * @param     string $joinType Accepted values are null, 'left join', 'right join', 'inner join'
     *
     * @return \Model\TruckQuery A secondary query class using the current class as primary query
     */
    public function useTruckQuery($relationAlias = null, $joinType = Criteria::INNER_JOIN)
    {
        return $this
            ->joinTruck($relationAlias, $joinType)
            ->useQuery($relationAlias ? $relationAlias : 'Truck', '\Model\TruckQuery');
    }

    /**
     * Exclude object from result
     *
     * @param   ChildOrder $order Object to remove from the list of results
     *
     * @return $this|ChildOrderQuery The current query, for fluid interface
     */
    public function prune($order = null)
    {
        if ($order) {
            $this->addUsingAlias(OrderTableMap::COL_ID, $order->getId(), Criteria::NOT_EQUAL);
        }

        return $this;
    }

    /**
     * Deletes all rows from the orders table.
     *
     * @param ConnectionInterface $con the connection to use
     * @return int The number of affected rows (if supported by underlying database driver).
     */
    public function doDeleteAll(ConnectionInterface $con = null)
    {
        if (null === $con) {
            $con = Propel::getServiceContainer()->getWriteConnection(OrderTableMap::DATABASE_NAME);
        }

        // use transaction because $criteria could contain info
        // for more than one table or we could emulating ON DELETE CASCADE, etc.
        return $con->transaction(function () use ($con) {
            $affectedRows = 0; // initialize var to track total num of affected rows
            $affectedRows += parent::doDeleteAll($con);
            // Because this db requires some delete cascade/set null emulation, we have to
            // clear the cached instance *after* the emulation has happened (since
            // instances get re-added by the select statement contained therein).
            OrderTableMap::clearInstancePool();
            OrderTableMap::clearRelatedInstancePool();

            return $affectedRows;
        });
    }

    /**
     * Performs a DELETE on the database based on the current ModelCriteria
     *
     * @param ConnectionInterface $con the connection to use
     * @return int             The number of affected rows (if supported by underlying database driver).  This includes CASCADE-related rows
     *                         if supported by native driver or if emulated using Propel.
     * @throws PropelException Any exceptions caught during processing will be
     *                         rethrown wrapped into a PropelException.
     */
    public function delete(ConnectionInterface $con = null)
    {
        if (null === $con) {
            $con = Propel::getServiceContainer()->getWriteConnection(OrderTableMap::DATABASE_NAME);
        }

        $criteria = $this;

        // Set the correct dbName
        $criteria->setDbName(OrderTableMap::DATABASE_NAME);

        // use transaction because $criteria could contain info
        // for more than one table or we could emulating ON DELETE CASCADE, etc.
        return $con->transaction(function () use ($con, $criteria) {
            $affectedRows = 0; // initialize var to track total num of affected rows

            OrderTableMap::removeInstanceFromPool($criteria);

            $affectedRows += ModelCriteria::delete($con);
            OrderTableMap::clearRelatedInstancePool();

            return $affectedRows;
        });
    }

    // timestampable behavior

    /**
     * Filter by the latest updated
     *
     * @param      int $nbDays Maximum age of the latest update in days
     *
     * @return     $this|ChildOrderQuery The current query, for fluid interface
     */
    public function recentlyUpdated($nbDays = 7)
    {
        return $this->addUsingAlias(OrderTableMap::COL_UPDATED_AT, time() - $nbDays * 24 * 60 * 60, Criteria::GREATER_EQUAL);
    }

    /**
     * Order by update date desc
     *
     * @return     $this|ChildOrderQuery The current query, for fluid interface
     */
    public function lastUpdatedFirst()
    {
        return $this->addDescendingOrderByColumn(OrderTableMap::COL_UPDATED_AT);
    }

    /**
     * Order by update date asc
     *
     * @return     $this|ChildOrderQuery The current query, for fluid interface
     */
    public function firstUpdatedFirst()
    {
        return $this->addAscendingOrderByColumn(OrderTableMap::COL_UPDATED_AT);
    }

    /**
     * Order by create date desc
     *
     * @return     $this|ChildOrderQuery The current query, for fluid interface
     */
    public function lastCreatedFirst()
    {
        return $this->addDescendingOrderByColumn(OrderTableMap::COL_CREATED_AT);
    }

    /**
     * Filter by the latest created
     *
     * @param      int $nbDays Maximum age of in days
     *
     * @return     $this|ChildOrderQuery The current query, for fluid interface
     */
    public function recentlyCreated($nbDays = 7)
    {
        return $this->addUsingAlias(OrderTableMap::COL_CREATED_AT, time() - $nbDays * 24 * 60 * 60, Criteria::GREATER_EQUAL);
    }

    /**
     * Order by create date asc
     *
     * @return     $this|ChildOrderQuery The current query, for fluid interface
     */
    public function firstCreatedFirst()
    {
        return $this->addAscendingOrderByColumn(OrderTableMap::COL_CREATED_AT);
    }

} // OrderQuery
